# CareerExplorer - High School Career Discovery Platform

A modern, interactive web application designed to help high school students explore career paths, discover salary potential, and plan their educational journey. Built with React, Tailwind CSS, and Framer Motion, deployed on Oracle Cloud Infrastructure (OCI).

![CareerExplorer](https://img.shields.io/badge/React-18.3.1-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC)
![ESLint](https://img.shields.io/badge/ESLint-9.15.0-4B32C3)
![OCI](https://img.shields.io/badge/OCI-Free%20Tier-F80000)

## 🎯 Features

- **40+ Career Profiles**: Comprehensive information on tech, design, engineering, and business careers
- **Interactive Quiz**: Personalized career recommendations based on interests and goals
- **Salary Information**: Real salary ranges from entry to senior level positions
- **Action Steps**: Concrete next steps for pursuing each career
- **Favorites System**: Save and compare careers side-by-side
- **Responsive Design**: Beautiful UI that works on all devices
- **Fast Performance**: Optimized build with code splitting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Oracle Cloud Infrastructure (OCI) account (free tier available)
- OCI CLI installed and configured

### Local Development

1. **Clone or extract the project**
   ```bash
   cd career-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Project Structure

```
career-explorer/
├── src/
│   ├── components/          # React components
│   │   └── Header.jsx       # Navigation header
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── ExploreCareers.jsx   # Career browsing
│   │   ├── CareerDetail.jsx     # Individual career pages
│   │   ├── Quiz.jsx         # Interactive quiz
│   │   └── Favorites.jsx    # Saved careers
│   ├── data/
│   │   └── careers.js       # Career database
│   ├── styles/
│   │   └── index.css        # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── terraform/               # Infrastructure as Code
│   ├── main.tf              # Main Terraform config
│   ├── variables.tf         # Variable definitions
│   ├── outputs.tf           # Output values
│   ├── provider.tf          # OCI provider config
│   └── terraform.tfvars.example  # Example variables
├── deploy.sh                # Deployment script
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── index.html               # HTML template
```

## 🏗️ Building for Production

Build the optimized production bundle:

```bash
npm run build
```

This creates a `dist` folder with:
- Minified JavaScript and CSS
- Optimized images
- Code splitting for better performance
- Source maps for debugging

Preview the production build locally:

```bash
npm run preview
```

## ☁️ Deployment to OCI

### Step 1: Set Up OCI CLI

1. **Install OCI CLI**
   ```bash
   # macOS
   brew install oci-cli

   # Linux
   bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"

   # Windows
   # Download from: https://github.com/oracle/oci-cli/releases
   ```

2. **Configure OCI CLI**
   ```bash
   oci setup config
   ```

   You'll need:
   - Your tenancy OCID
   - Your user OCID
   - Your region (e.g., us-ashburn-1)
   - An API key pair (CLI can generate this for you)

3. **Verify configuration**
   ```bash
   oci iam region list
   ```

### Step 2: Set Up Terraform

1. **Install Terraform**
   ```bash
   # macOS
   brew install terraform

   # Linux
   wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
   unzip terraform_1.6.0_linux_amd64.zip
   sudo mv terraform /usr/local/bin/

   # Windows
   # Download from: https://www.terraform.io/downloads
   ```

2. **Configure Terraform variables**
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   ```

3. **Edit `terraform.tfvars`** with your OCI details:
   ```hcl
   tenancy_ocid     = "ocid1.tenancy.oc1..aaaaa..."
   user_ocid        = "ocid1.user.oc1..aaaaa..."
   fingerprint      = "aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99"
   private_key_path = "~/.oci/oci_api_key.pem"
   region           = "us-ashburn-1"
   compartment_ocid = "ocid1.compartment.oc1..aaaaa..."
   ```

   **Finding Your OCIDs:**
   - Tenancy OCID: OCI Console → Profile → Tenancy
   - User OCID: OCI Console → Profile → User Settings
   - Compartment OCID: OCI Console → Identity → Compartments
   - Fingerprint: Generated during `oci setup config`

### Step 3: Deploy Infrastructure

1. **Initialize Terraform**
   ```bash
   cd terraform
   terraform init
   ```

2. **Review the deployment plan**
   ```bash
   terraform plan
   ```

3. **Deploy the infrastructure**
   ```bash
   terraform apply
   ```

   Type `yes` when prompted to confirm.

4. **Note the outputs**
   ```bash
   terraform output
   ```

   Save these values - you'll need them for deployment!

### Step 4: Deploy the Application

1. **Make the deploy script executable**
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment**
   ```bash
   ./deploy.sh
   ```

   This script will:
   - Build your React application
   - Upload all files to OCI Object Storage
   - Display your website URL

3. **Access your website**
   The script will display your website URL, something like:
   ```
   https://objectstorage.us-ashburn-1.oraclecloud.com/n/YOUR_NAMESPACE/b/career-explorer-prod/o/index.html
   ```

## 🔄 Manual Deployment (Alternative)

If the script doesn't work, deploy manually:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Get your namespace and bucket name**
   ```bash
   cd terraform
   terraform output namespace
   terraform output bucket_name
   ```

3. **Upload files to OCI**
   ```bash
   oci os object bulk-upload \
     --namespace YOUR_NAMESPACE \
     --bucket-name YOUR_BUCKET_NAME \
     --src-dir ./dist \
     --overwrite
   ```

## 🌐 Custom Domain (Optional)

For a professional URL like `careers.yourdomain.com`:

1. **Set up OCI DNS** or use your existing DNS provider
2. **Create a CNAME record** pointing to your Object Storage URL
3. **Configure SSL/TLS** (optional but recommended)

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Customizing Career Data

Edit `src/data/careers.js` to:
- Add new careers
- Update salary information
- Modify career descriptions
- Add new categories or interests

### Styling

Customize the design in:
- `tailwind.config.js` - Colors, fonts, animations
- `src/styles/index.css` - Global styles and custom CSS

## 📊 Analytics (Optional)

To add analytics tracking:

1. Install analytics package:
   ```bash
   npm install @vercel/analytics
   ```

2. Add to your app in `src/App.jsx`:
   ```javascript
   import { Analytics } from '@vercel/analytics/react';
   
   // In your App component
   <Analytics />
   ```

## 🔒 Security Best Practices

1. **Never commit sensitive files**:
   - `terraform.tfvars`
   - `.env`
   - `*.pem` files

2. **Use .gitignore**:
   ```
   node_modules/
   dist/
   .env
   terraform.tfvars
   terraform.tfstate*
   *.pem
   ```

3. **Rotate API keys regularly**

4. **Use least privilege access** in OCI

## 🐛 Troubleshooting

### Build Issues

**Problem**: `npm install` fails
- **Solution**: Ensure Node.js 18+ is installed: `node --version`

**Problem**: Build errors
- **Solution**: Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Terraform Issues

**Problem**: Authentication errors
- **Solution**: Verify your `~/.oci/config` file and API key

**Problem**: "Compartment not found"
- **Solution**: Verify your compartment OCID in terraform.tfvars

**Problem**: "Namespace not found"
- **Solution**: Wait a few minutes after account creation for namespace provisioning

### Deployment Issues

**Problem**: 404 errors on routes
- **Solution**: Object Storage doesn't support SPA routing. Options:
  1. Use hash router in React
  2. Set up CloudFront/CDN with proper routing rules
  3. Deploy to OCI Compute instance with nginx

**Problem**: CSS/JS not loading
- **Solution**: Check that files uploaded correctly:
  ```bash
  oci os object list --namespace YOUR_NAMESPACE --bucket-name YOUR_BUCKET
  ```

**Problem**: CORS errors
- **Solution**: Configure CORS on your Object Storage bucket in OCI Console

## 🎓 Learning Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **OCI Documentation**: https://docs.oracle.com/en-us/iaas/
- **Terraform OCI Provider**: https://registry.terraform.io/providers/oracle/oci/

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more careers to the database
- Improve the UI/UX
- Fix bugs
- Add new features

## 📧 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review OCI documentation
3. Check React/Vite documentation

## 🎉 What's Next?

Ideas for enhancement:
- [ ] Add user accounts and progress tracking
- [ ] Integrate with real-time job market data APIs
- [ ] Add video content for each career
- [ ] Build a mentor matching system
- [ ] Add college recommendation engine
- [ ] Create mobile app version
- [ ] Add social sharing features

---

**Happy Career Exploring! 🚀**

Made with ❤️ for high school students exploring their future.
