# Llama Runner Game

A fun side-scrolling game built with React where you control a jumping llama to avoid obstacles.

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/MrAdi-67/windsurfproj.git
cd windsurfproj
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to a new file named `.env`
   - Fill in your Firebase configuration values in the `.env` file
   - Never commit the `.env` file to version control

4. Start the development server:
```bash
npm start
```

## Environment Variables

The following environment variables are required:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

## Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

Make sure to set up your environment variables in your Firebase project settings before deploying.

## Features

- Jumping llama character
- Randomly generated obstacles
- Score tracking
- High score persistence
- Collision detection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security

- Never commit the `.env` file
- Always use environment variables for sensitive data
- Rotate API keys if they are ever exposed