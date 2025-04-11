
# WeStudy - Peer-to-Peer Learning Platform

![WeStudy Logo](public/placeholder.svg)

WeStudy is a peer-to-peer learning platform that connects students with fellow students who can teach subjects they excel in. This platform facilitates knowledge sharing within educational communities, creating a collaborative learning environment.

## 🚀 Features

- **Find Tutors**: Browse qualified tutors by subject, price, and availability
- **Become a Tutor**: Share your knowledge and earn points by teaching subjects you excel in
- **Subject Specialization**: Wide range of academic subjects from Mathematics to Computer Science
- **Flexible Learning Options**: Choose between in-person and online tutoring sessions
- **Secure Authentication**: User account system with profile management
- **Rating System**: Find the best tutors based on student ratings and reviews

## 💻 Technology Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **State Management**: React Query + React Hooks
- **Backend**: Supabase (Authentication, Database, Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v18.x or newer)
- npm or alternative package manager (yarn, pnpm, bun)

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/westudy.git
   cd westudy
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
westudy/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party service integrations (Supabase)
│   ├── lib/            # Utility functions and shared code
│   ├── pages/          # Page components
│   │   └── offers/     # Teaching offer related pages
│   ├── App.tsx         # Main application component with routing
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

## 🤝 How It Works

1. **Students Browse**: Search for tutors based on subjects, availability, or ratings
2. **Request a Session**: Contact a tutor and schedule a learning session
3. **Learn**: Meet with your tutor either online or in-person
4. **Provide Feedback**: Rate your experience and help others find good tutors
5. **Teach Others**: Share your knowledge by becoming a tutor yourself

## 🧪 Key Components

- **Teaching Offers**: Listings created by tutors advertising their teaching services
- **Subject Categories**: Organized subject areas for easy browsing
- **User Profiles**: Detailed information about tutors and students
- **Points System**: Currency used within the platform to book sessions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Security

- Authentication powered by Supabase
- Protected routes for authorized users
- Secure data storage

## 🚀 Deployment

The project can be deployed to various hosting services:

1. **Vercel/Netlify**:
   - Connect to your GitHub repository
   - Configure build settings: `npm run build`
   - Set the publish directory to `dist`

2. **Manual Deployment**:
   ```bash
   npm run build
   # Deploy the generated 'dist' folder to your hosting provider
   ```

## 🛠️ Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Your Name](https://github.com/yourusername)

## 💡 Future Enhancements

- Real-time messaging system between students and tutors
- Calendar integration for scheduling sessions
- Payment processing with Stripe
- Mobile app versions for iOS and Android
