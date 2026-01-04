# Polymarket Analytics Dashboard

A real-time analytics dashboard for Polymarket prediction markets. Track volume, liquidity, and market trends with live data.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **Real-time Market Data**: Live updates from Polymarket's public API
- **Volume Analytics**: Track 24-hour trading volume across markets
- **Market Filtering**: Filter by open/closed markets
- **Visual Charts**: Interactive volume distribution charts
- **Auto-refresh**: Data updates every 30 seconds
- **Responsive Design**: Works on desktop, tablet, and mobile

dashboard will be live at:
```
https://YOUR-USERNAME.github.io/polymarket-analytics
```

**Share this URL with friends!** They can use it immediately on any device.

## 🔧 How to Make Changes

### Editing Files

**On GitHub (Easy):**
1. Click on any file (e.g., `app.js`)
2. Click the pencil icon (✏️) to edit
3. Make your changes
4. Click "Commit changes"
5. Your site updates automatically!

**Locally (Advanced):**
1. Install a code editor (I recommend [VS Code](https://code.visualstudio.com/))
2. Clone your repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/polymarket-analytics.git
   ```
3. Make changes to the files
4. Test by opening `index.html` in your browser
5. Push changes back to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

## 📁 File Structure

```
polymarket-analytics/
├── index.html          # Main HTML file (structure)
├── app.js              # JavaScript logic (functionality)
├── styles.css          # Custom styles (appearance)
└── README.md           # This file (documentation)
```

### What Each File Does:

- **index.html**: The structure and layout of your dashboard
- **app.js**: All the logic - fetching data, updating charts, handling clicks
- **styles.css**: Custom styling and animations
- **README.md**: Documentation and instructions

### Change Colors
Edit `index.html` and replace Tailwind color classes:
- `bg-blue-600` → `bg-purple-600` (change button color)
- `text-blue-600` → `text-green-600` (change text color)

### Adjust Refresh Rate
Edit `app.js`, line 7:
```javascript
REFRESH_INTERVAL: 30000, // Change to 60000 for 1 minute
```

### Display More Markets
Edit `app.js`, line 8:
```javascript
MAX_MARKETS_DISPLAY: 20, // Change to 50 to show more markets
```

## 🛠 Technical Details

### APIs Used
- **Polymarket Gamma API**: `https://gamma-api.polymarket.com`
  - Endpoint: `/markets`
  - Rate limit: Generous (no auth required for basic usage)

### Technologies
- **HTML5**: Structure
- **Tailwind CSS**: Styling framework
- **Vanilla JavaScript**: No frameworks needed!
- **Chart.js**: Data visualization

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 📊 Data Sources

All data comes from Polymarket's public API. No API key required for read-only access.

**What you can access:**
- Market questions and descriptions
- Current prices (Yes/No outcomes)
- 24-hour trading volume
- Liquidity data
- Market status (open/closed)

**Rate Limits:**
- Free tier is generous
- For high-frequency requests, consider implementing caching

## 🐛 Troubleshooting

### Dashboard won't load data
- Check your internet connection
- Open browser console (F12) to see error messages
- Polymarket API might be temporarily down

### GitHub Pages not updating
- Wait 5 minutes after pushing changes
- Clear your browser cache (Ctrl+Shift+R)
- Check GitHub Actions for build errors

### Markets showing old data
- Click "Refresh Markets" button
- Check if auto-refresh is working (should update every 30s)


Built with ❤️ for the Polymarket community

**Remember**: This is just the beginning. Your dashboard can evolve into a full trading tool as you learn and grow!
