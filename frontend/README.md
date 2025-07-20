# 🚀 AI Engineer Challenge Frontend

Welcome to the **AI Engineer Challenge Frontend**! This is a sleek, modern chat interface that connects to your FastAPI backend. Built with Next.js, TypeScript, and Tailwind CSS, it features the beautiful UNC Tar Heels color scheme and provides an intuitive user experience.

## ✨ Features

- **Real-time Streaming**: Watch AI responses stream in real-time as they're generated
- **Modern UI**: Clean, responsive design that works on all devices
- **UNC Tar Heels Theme**: Beautiful blue and navy color scheme
- **Settings Panel**: Easy configuration for API keys and model selection
- **Message History**: Keep track of your conversation with timestamps
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **UNC Tar Heels Colors**: Authentic Carolina blue and navy

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js installed (version 18 or higher). You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) and you'll see the chat interface!

### Backend Setup

Make sure your FastAPI backend is running on `http://localhost:8000`. If you haven't started it yet:

1. **Navigate to the API directory:**
   ```bash
   cd ../api
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server:**
   ```bash
   python app.py
   ```

## 🎯 How to Use

1. **Configure Settings**: Click the settings gear icon in the top-right corner
2. **Enter API Key**: Add your OpenAI API key (it's stored securely in your browser)
3. **Choose Model**: Select from GPT-4.1 Mini, GPT-4, or GPT-3.5 Turbo
4. **Add System Message**: Optionally add a developer/system message
5. **Start Chatting**: Type your message and hit send!

## 🎨 Design Features

- **UNC Tar Heels Colors**: Authentic Carolina blue (#4B9CD3) and navy (#13294B)
- **Responsive Layout**: Adapts beautifully to any screen size
- **Smooth Animations**: Subtle transitions and loading indicators
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Modern Typography**: Clean Inter font for excellent readability

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
frontend/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main chat interface
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.js      # Next.js configuration
```

## 🌟 What Makes This Special

- **Streaming Responses**: See AI responses appear in real-time
- **Secure API Key Handling**: Password field for sensitive data
- **Error Recovery**: Graceful handling of network issues
- **Mobile-First**: Optimized for all device sizes
- **UNC Pride**: Authentic Tar Heels branding throughout

## 🐛 Troubleshooting

**Frontend won't start?**
- Make sure you're in the `frontend` directory
- Check that Node.js is installed (`node --version`)
- Try deleting `node_modules` and running `npm install` again

**Can't connect to backend?**
- Ensure the FastAPI server is running on port 8000
- Check that the backend is accessible at `http://localhost:8000`
- Verify the API endpoints are working

**API key issues?**
- Make sure your OpenAI API key is valid
- Check that you have sufficient credits in your OpenAI account
- Verify the model you're trying to use is available

## 🎉 Ready to Chat!

Once everything is set up, you'll have a beautiful, functional chat interface that connects seamlessly to your AI backend. The interface is designed to be intuitive and pleasant to use, with all the modern features you'd expect from a professional chat application.

**Go Heels! 🐏💙**