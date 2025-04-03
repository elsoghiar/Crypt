# Crypt: Secure Encryption App

A modern web-based text encryption application with password protection, multiple language support, and PDF capabilities.

## Features

- Text encryption using AES-256/192/128 algorithm
- Optional password protection
- Multiple language support (English, Spanish, French, German, Chinese, Arabic)
- Full Right-to-Left (RTL) support for Arabic language
- Text extraction from PDF files
- Export encrypted texts as files

## Technologies Used

- React
- Tailwind CSS
- Shadcn UI Components
- CryptoJS
- i18next for internationalization

## Setup

Clone the repository and install packages using your package manager:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment on Vercel

The app is configured for easy deployment on Vercel:

1. Fork or clone this repository to your GitHub account
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the configuration and deploy your app
4. Your app will be available at `your-project-name.vercel.app`

## Usage

1. Choose the "Encrypt" or "Decrypt" tab
2. Enter the text to process or upload a file
3. Optionally, enable password protection and enter a password
4. Click the "Encrypt" or "Decrypt" button
5. Copy or download the result

## License

MIT