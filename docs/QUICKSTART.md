# Quick Start Guide

Get your CareerExplorer platform up and running in minutes!

## 🚀 Super Quick Start (5 minutes)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

That's it! You now have the platform running locally.

## 📋 First Time Setup

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- Text editor (VS Code recommended)

### Installation Steps

1. **Extract the project** to your desired location

2. **Open terminal** in the project directory

3. **Install dependencies**:
   ```bash
   npm install
   ```
   This downloads all required packages (~2-3 minutes)

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **View the application**:
   Open `http://localhost:5173` in your browser

## 🎨 Customizing Content

### Adding New Careers

Edit `src/data/careers.js`:

```javascript
{
  id: "your-career-id",
  title: "Career Title",
  category: "Technology", // or Design, Engineering, Business
  subcategory: "Specific Area",
  description: "Brief description...",
  detailedDescription: "Longer description...",
  interests: ["problem-solving", "technology"],
  salaryRange: { entry: 50000, median: 80000, senior: 120000 },
  education: ["Bachelor's degree..."],
  skills: ["Skill 1", "Skill 2"],
  outlook: "Faster than average (15% growth)",
  workEnvironment: "Office or remote",
  typicalDay: [
    "Task 1",
    "Task 2"
  ],
  actionSteps: [
    "Step 1",
    "Step 2"
  ],
  relatedCareers: ["career-id-1", "career-id-2"]
}
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#DARKER_SHADE',
  }
}
```

### Modifying Text

- **Home page**: `src/pages/Home.jsx`
- **Header**: `src/components/Header.jsx`
- **Quiz questions**: `src/pages/Quiz.jsx`

## 🏗️ Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist` folder ready for deployment.

## ☁️ Deploying to OCI (Oracle Cloud)

### Quick Deploy (if already set up)

```bash
npm run build
./deploy.sh
```

### First Time Deploy

1. **Set up OCI account** (free tier works!)
   - Go to https://cloud.oracle.com
   - Sign up for free account
   - Verify email

2. **Install OCI CLI**:
   ```bash
   # macOS
   brew install oci-cli
   
   # Linux
   bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"
   ```

3. **Configure OCI**:
   ```bash
   oci setup config
   ```

4. **Set up Terraform**:
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your OCI details
   ```

5. **Deploy infrastructure**:
   ```bash
   terraform init
   terraform apply
   ```

6. **Deploy application**:
   ```bash
   cd ..
   chmod +x deploy.sh
   ./deploy.sh
   ```

For detailed instructions, see `README.md` and `docs/DEPLOYMENT_CHECKLIST.md`.

## 📝 Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `./deploy.sh` | Deploy to OCI |

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
```

### npm install fails
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build errors
```bash
# Check Node.js version
node --version  # Should be 18+

# Update npm
npm install -g npm@latest
```

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `docs/DEPLOYMENT_CHECKLIST.md`
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **OCI Docs**: https://docs.oracle.com/en-us/iaas/

## 💡 Tips

1. **Hot Reload**: Changes auto-refresh in development mode
2. **React DevTools**: Install browser extension for debugging
3. **Console**: Press F12 to open browser console for errors
4. **Git**: Track changes with `git init` and commit regularly

## 🎯 Next Steps

1. [ ] Test the quiz feature
2. [ ] Explore all career pages
3. [ ] Try favoriting careers
4. [ ] Customize the content
5. [ ] Deploy to OCI

## 🆘 Need Help?

1. Check `README.md` for detailed docs
2. Review `docs/DEPLOYMENT_CHECKLIST.md`
3. Check browser console for errors (F12)
4. Verify Node.js and npm versions

---

**Ready to build? Start with `npm run dev`!** 🚀
