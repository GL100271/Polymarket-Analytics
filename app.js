// Polymarket Analytics Dashboard
// Main application logic

// Configuration
const CONFIG = {
    API_BASE: 'https://gamma-api.polymarket.com',
    REFRESH_INTERVAL: 30000, // 30 seconds
    MAX_MARKETS_DISPLAY: 20,
    CHART_TOP_MARKETS: 10
};

// State
let marketsData = [];
let chart = null;

// Initialize the application
function init() {
    console.log('Initializing Polymarket Analytics Dashboard...');
    initChart();
    setupEventListeners();
    fetchMarkets();
    
    // Auto-refresh
    setInterval(fetchMarkets, CONFIG.REFRESH_INTERVAL);
}

// Initialize Chart.js chart
function initChart() {
    const ctx = document.getElementById('volumeChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Volume (USD)',
                data: [],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + formatNumber(value);
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Volume: $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('refreshBtn').addEventListener('click', () => {
        fetchMarkets();
        showNotification('Refreshing data...');
    });
    
    document.getElementById('marketFilter').addEventListener('change', updateDashboard);
    document.getElementById('sortBy').addEventListener('change', updateDashboard);
}

// Fetch markets from Polymarket API
async function fetchMarkets() {
    try {
        const response = await fetch(`${CONFIG.API_BASE}/markets?limit=50&closed=false`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // The API returns an array directly
        if (Array.isArray(data)) {
            marketsData = data;
        } else if (data.markets && Array.isArray(data.markets)) {
            marketsData = data.markets;
        } else {
            marketsData = [];
        }
        
        updateDashboard();
        console.log(`Loaded ${marketsData.length} markets`);
    } catch (error) {
        console.error('Error fetching markets:', error);
        showError(`Failed to load markets: ${error.message}`);
    }
}

// Update all dashboard components
function updateDashboard() {
    const filter = document.getElementById('marketFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // Filter markets
    let filtered = filterMarkets(marketsData, filter);
    
    // Sort markets
    filtered = sortMarkets(filtered, sortBy);

    // Update components
    updateStats(filtered);
    updateChart(filtered);
    updateTable(filtered);
}

// Filter markets based on selection
function filterMarkets(markets, filter) {
    if (filter === 'open') {
        return markets.filter(m => !m.closed);
    } else if (filter === 'closed') {
        return markets.filter(m => m.closed);
    }
    return [...markets];
}

// Sort markets based on selection
function sortMarkets(markets, sortBy) {
    const sorted = [...markets];
    
    switch(sortBy) {
        case 'volume':
            sorted.sort((a, b) => (b.volume24hr || 0) - (a.volume24hr || 0));
            break;
        case 'liquidity':
            sorted.sort((a, b) => (b.liquidity || 0) - (a.liquidity || 0));
            break;
        case 'volume_change':
            sorted.sort((a, b) => (b.volumeChange24hr || 0) - (a.volumeChange24hr || 0));
            break;
    }
    
    return sorted;
}

// Update statistics cards
function updateStats(markets) {
    const totalVolume = markets.reduce((sum, m) => sum + (m.volume24hr || 0), 0);
    const activeCount = markets.filter(m => !m.closed).length;
    const avgLiquidity = markets.length > 0 
        ? markets.reduce((sum, m) => sum + (m.liquidity || 0), 0) / markets.length 
        : 0;

    document.getElementById('totalMarkets').textContent = markets.length.toLocaleString();
    document.getElementById('totalVolume').textContent = '$' + formatNumber(totalVolume);
    document.getElementById('activeMarkets').textContent = activeCount.toLocaleString();
    document.getElementById('avgLiquidity').textContent = '$' + formatNumber(avgLiquidity);
}

// Update volume chart
function updateChart(markets) {
    const topMarkets = markets.slice(0, CONFIG.CHART_TOP_MARKETS);
    
    chart.data.labels = topMarkets.map(m => {
        const title = m.question || m.title || 'Unknown';
        return title.length > 30 ? title.substring(0, 30) + '...' : title;
    });
    
    chart.data.datasets[0].data = topMarkets.map(m => m.volume24hr || 0);
    chart.update();
}

// Update markets table
function updateTable(markets) {
    const tableBody = document.getElementById('marketsTable');
    
    if (markets.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-8 text-gray-500">
                    No markets found
                </td>
            </tr>
        `;
        return;
    }

    const displayMarkets = markets.slice(0, CONFIG.MAX_MARKETS_DISPLAY);
    
    tableBody.innerHTML = displayMarkets.map(market => {
        // Handle different possible field names from API
        const question = market.question || market.title || market.description || 'Unknown Market';
        const volume = market.volume24hr || market.volume || 0;
        const liquidity = market.liquidity || 0;
        
        // Handle outcome prices - can be array or string
        let yesPrice = 0.5;
        if (market.outcomePrices) {
            if (typeof market.outcomePrices === 'string') {
                try {
                    const prices = JSON.parse(market.outcomePrices);
                    yesPrice = parseFloat(prices[0]) || 0.5;
                } catch(e) {
                    yesPrice = 0.5;
                }
            } else if (Array.isArray(market.outcomePrices)) {
                yesPrice = parseFloat(market.outcomePrices[0]) || 0.5;
            }
        } else if (market.outcome_prices) {
            if (typeof market.outcome_prices === 'string') {
                try {
                    const prices = JSON.parse(market.outcome_prices);
                    yesPrice = parseFloat(prices[0]) || 0.5;
                } catch(e) {
                    yesPrice = 0.5;
                }
            } else if (Array.isArray(market.outcome_prices)) {
                yesPrice = parseFloat(market.outcome_prices[0]) || 0.5;
            }
        }
        
        const status = market.closed ? 'Closed' : 'Open';
        const statusColor = market.closed ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700';

        return `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="py-3 px-4">
                    <div class="font-medium text-gray-900 max-w-md">${escapeHtml(question)}</div>
                </td>
                <td class="py-3 px-4 text-right text-gray-900">
                    $${formatNumber(volume)}
                </td>
                <td class="py-3 px-4 text-right text-gray-900">
                    $${formatNumber(liquidity)}
                </td>
                <td class="py-3 px-4 text-right">
                    <span class="font-semibold ${yesPrice > 0.5 ? 'text-green-600' : 'text-red-600'}">
                        ${(yesPrice * 100).toFixed(1)}%
                    </span>
                </td>
                <td class="py-3 px-4 text-center">
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColor}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// Utility: Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Utility: Show notification (simple version)
function showNotification(message) {
    console.log('Notification:', message);
}

// Utility: Show error
function showError(message) {
    const tableBody = document.getElementById('marketsTable');
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-8 text-red-500">
                ${escapeHtml(message)}
            </td>
        </tr>
    `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
