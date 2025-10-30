# Firebase Next.js App

A Next.js application with Firebase (Firestore), React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created at [Firebase Console](https://console.firebase.google.com/)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database:
   - Go to Build > Firestore Database
   - Click "Create database"
   - Choose production mode or test mode
   - Select a location

### 3. Set Up Environment Variables

1. In Firebase Console, go to Project Settings > General
2. Under "Your apps", create a web app if you haven't already
3. Copy your Firebase configuration
4. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

5. Fill in your Firebase credentials in `.env.local`

### 4. Initialize Firebase (Optional)

If you want to deploy to Firebase Hosting:

```bash
firebase login
firebase init
```

When prompted:
- Select "Firestore" and "Hosting"
- Use existing project
- Keep default firestore.rules and firestore.indexes.json
- Set public directory to "out"
- Configure as single-page app: Yes

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── globals.css          # Global styles with Tailwind directives
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── lib/
│   └── firebase.ts          # Firebase initialization and exports
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore indexes
└── .env.local              # Environment variables (create from .env.local.example)
```

## Using Firestore

Import the Firestore instance from `lib/firebase.ts`:

```typescript
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Add a document
const docRef = await addDoc(collection(db, 'users'), {
  name: 'John Doe',
  email: 'john@example.com'
});

// Get documents
const querySnapshot = await getDocs(collection(db, 'users'));
querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

### Deploy to Vercel

The app is ready to deploy to Vercel. Just connect your repository and deploy.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
