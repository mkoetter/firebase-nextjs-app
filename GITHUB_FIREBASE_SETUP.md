# GitHub and Firebase Integration Setup

This project is now connected to GitHub and configured for automatic Firebase deployment.

## Repository

- **GitHub Repository**: https://github.com/mkoetter/firebase-nextjs-app
- **Firebase Project**: gcp-virtual-production-lab

## Automatic Deployment Setup

The project includes a GitHub Actions workflow that automatically deploys to Firebase Hosting when you push to the `main` branch.

### Required GitHub Secrets

To enable automatic deployment, you need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository: https://github.com/mkoetter/firebase-nextjs-app
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add each of the following:

#### Firebase Service Account
- **Name**: `FIREBASE_SERVICE_ACCOUNT`
- **Value**: Firebase service account JSON (see instructions below)

#### Firebase Environment Variables
Add all of these (they're already in your .env.local):

- `NEXT_PUBLIC_FIREBASE_API_KEY`: `AIzaSyCkI1UMhtaBHl6iGtUtVi8bJSBgnujDYns`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: `gcp-virtual-production-lab.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: `gcp-virtual-production-lab`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: `gcp-virtual-production-lab.firebasestorage.app`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: `341316871807`
- `NEXT_PUBLIC_FIREBASE_APP_ID`: `1:341316871807:web:78eebe01c1fd43814e414a`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: `G-PEBVDE2XPJ`

### Getting Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **gcp-virtual-production-lab**
3. Click the gear icon ⚙️ > **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. Save the JSON file securely
7. Copy the entire contents of the JSON file
8. Paste it as the value for `FIREBASE_SERVICE_ACCOUNT` secret in GitHub

### Manual Deployment

You can also deploy manually from your local machine:

```bash
# Build the project
npm run build

# Login to Firebase (if not already logged in)
firebase login

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Firestore rules and indexes
firebase deploy --only firestore
```

## Workflow Details

The GitHub Actions workflow (`.github/workflows/firebase-deploy.yml`) will:

1. Run on every push to `main` branch
2. Install dependencies
3. Build the Next.js app
4. Export static files
5. Deploy to Firebase Hosting

Pull requests will build but not deploy (preview only).

## Firebase Hosting URL

After deployment, your app will be available at:
- **Live URL**: https://gcp-virtual-production-lab.web.app
- **Alternative**: https://gcp-virtual-production-lab.firebaseapp.com

## Next Steps

1. Add the required secrets to GitHub (see above)
2. Push changes to trigger the first deployment
3. Check the **Actions** tab in GitHub to monitor deployment progress
4. Visit your Firebase Hosting URL once deployed

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

## Troubleshooting

- If deployment fails, check the **Actions** tab in your GitHub repository
- Ensure all secrets are properly set in GitHub
- Verify Firebase project permissions for the service account
- Check Firebase console for any quota or billing issues
