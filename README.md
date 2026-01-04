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

## 📋 Quick Start

### Option 1: View Locally (No Setup Required)

1. Download all files from this repository
2. Open `index.html` in your web browser
3. That's it! The dashboard will start loading data

### Option 2: Deploy to GitHub Pages (Recommended)

**Step 1: Create a GitHub Account**
- Go to [github.com](https://github.com) and sign up (it's free!)

**Step 2: Create a New Repository**
1. Click the `+` icon in the top right
2. Select "New repository"
3. Name it: `polymarket-analytics` (or any name you like)
4. Make it **Public**
5. Click "Create repository"

**Step 3: Upload Your Files**
1. On your repository page, click "uploading an existing file"
2. Drag and drop all files:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `README.md`
3. Click "Commit changes"

**Step 4: Enable GitHub Pages**
1. Go to your repository Settings
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select `main` branch
4. Click "Save"
5. Wait 1-2 minutes

**Step 5: Access Your Dashboard**
Your dashboard will be live at:
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

## 🎨 Customization Ideas

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

### Add Your Name/Branding
Edit `index.html`, line 12:
```html
<h1 class="text-3xl font-bold text-gray-900 mb-2">Your Name's Polymarket Analytics</h1>
```

## 🚀 Future Roadmap (Evolution Path)

### Phase 1: Current (Static Dashboard) ✅
- Real-time market data
- Basic filtering and sorting
- Volume charts

### Phase 2: Enhanced Features (Coming Soon)
- Price change alerts
- Historical data tracking
- Market comparison tools
- Export data to CSV

### Phase 3: Backend Integration
- User accounts
- Save favorite markets
- Custom alerts via email/SMS
- Historical backtesting

### Phase 4: Full Web Application
- Custom domain
- Premium features
- Payment integration
- Mobile app

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

## 🤝 Contributing

Want to improve the dashboard? Here's how:

1. Fork this repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📝 Ideas for Improvements

**Easy:**
- Add dark mode toggle
- More chart types (pie, line)
- Better mobile layout

**Medium:**
- Search markets by keyword
- Compare multiple markets
- Download data as CSV

**Advanced:**
- User authentication
- Save favorite markets
- Price alerts
- Trading signals

## 📄 License

MIT License - feel free to use this however you want!

## 🙋‍♂️ Support

Having issues or questions?
- Open an issue on GitHub
- Check the browser console for errors
- Review Polymarket's API documentation

## 🎯 Next Steps

1. **Get it running**: Follow the Quick Start guide above
2. **Share with friends**: Send them your GitHub Pages URL
3. **Customize it**: Make it your own with different colors/features
4. **Add features**: Check the roadmap for ideas
5. **Scale up**: When ready, move to a full web app framework

---

Built with ❤️ for the Polymarket community

**Remember**: This is just the beginning. Your dashboard can evolve into a full trading tool as you learn and grow!
