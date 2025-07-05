# SuperChat Tool 🎮

A modern, beautiful donation and chat overlay system for streamers. Engage with your audience like never before with real-time donations, text-to-speech, and stunning overlays.

![SuperChat Tool](https://img.shields.io/badge/SuperChat-Tool-purple?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎯 Easy Donations**: Simple and secure donation system with customizable amounts
- **🔊 Text-to-Speech**: Automatic text-to-speech for donation messages
- **🎨 Beautiful Overlays**: Customizable overlays that look great on any streaming platform
- **⚡ Real-time Updates**: Instant updates and notifications for new donations
- **🔒 Secure & Reliable**: Built with security in mind
- **🚀 Easy Setup**: Get started in minutes with our simple setup process

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/superchat-tool.git
   cd superchat-tool
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd sup-chat
   npm install
   
   # Backend
   cd ../server
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start backend server (from server directory)
   npm start
   
   # Start frontend (from sup-chat directory)
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📱 Pages & Features

### 🏠 Home Page
- Modern landing page with feature showcase
- How it works section
- Call-to-action buttons

### 💰 Donation Form
- Beautiful, responsive donation form
- Preset amount buttons
- Real-time validation
- Success animations

### 📊 Dashboard
- Real-time donation statistics
- Recent donations table
- Stream information
- Quick actions

### 🎬 Overlay
- Live donation feed
- Text-to-speech integration
- Animated notifications
- Streamer branding

### 🎉 Thank You Page
- Confetti animations
- Social sharing buttons
- Success confirmation

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### Features
- **Text-to-Speech** - Browser's Web Speech API
- **Real-time Updates** - Polling mechanism
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Glass morphism and gradients

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Amber (#f59e0b)
- **Accent**: Pink (#ec4899)
- **Background**: Slate (#0f172a)
- **Surface**: Slate (#1e293b)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Glass morphism effect
- **Inputs**: Modern form controls
- **Animations**: Fade, slide, bounce effects

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
```

### Customization
- Modify colors in `src/index.css` CSS variables
- Update branding in components
- Customize overlay positioning
- Adjust text-to-speech settings

## 📱 Usage

### For Streamers
1. Visit the dashboard at `/dashboard`
2. Copy your donation link
3. Add the overlay to your streaming software
4. Start receiving donations!

### For Viewers
1. Click on a streamer's donation link
2. Fill out the donation form
3. Submit your donation
4. Watch it appear on stream!

## 🎯 API Endpoints

### Backend Routes
- `POST /donation` - Submit a new donation
- `GET /overlay-feed` - Get recent donations for overlay

### Request Format
```json
{
  "name": "Donor Name",
  "message": "Donation message",
  "amount": "500",
  "streamerId": "streamer123"
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd sup-chat
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used
- [Vite](https://vitejs.dev/) - The build tool used
- [Heroicons](https://heroicons.com/) - The icon library used

## 📞 Support

- **Email**: support@superchat-tool.com
- **Discord**: [Join our community](https://discord.gg/superchat)
- **Twitter**: [@SuperChatTool](https://twitter.com/SuperChatTool)

---

Made with ❤️ for the streaming community
