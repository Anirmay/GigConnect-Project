# GigConnect 💼

A modern freelance marketplace platform connecting clients with talented freelancers. Built for real-time collaboration, secure payments, and seamless communication.

**Live Demo:**
- 🌐 **Frontend & Backend**: [GigConnect on Render](https://gigconnect-project.onrender.com)
- 🌐 **Alternative Frontend**: [anirmay-gigconnect.netlify.app](https://anirmay-gigconnect.netlify.app)

---

## Features

### 🔐 Authentication & User Management
- User registration (Clients & Freelancers)
- Secure JWT authentication
- OAuth/Social login support
- User profile management
- Email verification

### 💰 Payment & Transactions
- Razorpay integration for secure payments
- Payment history and invoicing
- Escrow-like payment protection
- Multiple payment methods support
- Transaction tracking

### 💬 Real-Time Messaging
- Socket.IO powered live messaging
- Real-time notifications
- User presence status
- Message history
- Direct client-freelancer communication

### 🎯 Gig Management
- Create and manage gigs/services
- Gig portfolio with images
- Pricing and package options
- Service categories and tags
- Gig search and filtering

### ⭐ Reviews & Ratings
- Client reviews for freelancers
- Freelancer reviews for clients
- Rating system (1-5 stars)
- Review history and feedback
- Reputation management

### 👥 User Profiles
- Detailed freelancer profiles
- Portfolio showcase
- Skills and certifications
- Availability status
- Profile customization

### 🔍 Discovery & Search
- Advanced gig search
- Filter by category, price, rating
- Trending gigs
- Recommended freelancers
- Smart matching algorithm

### 📊 Dashboard & Analytics
- Client dashboard with active projects
- Freelancer earnings dashboard
- Project statistics
- Performance metrics
- Revenue tracking

---

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **js-cookie** - Cookie management
- **jwt-decode** - JWT token handling
- **Lucide React** - Icon library
- **EmailJS** - Email notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time WebSocket communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing
- **Cookie-parser** - Cookie handling

---

## Project Structure

```
GigConnect-Project/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Route pages/screens
│   │   ├── context/          # React context for state
│   │   ├── assets/           # Images, icons, etc.
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   ├── index.css         # Global styles
│   │   └── App.css           # App styles
│   ├── public/               # Static files
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── postcss.config.js     # PostCSS config
│   ├── package.json
│   └── index.html            # HTML entry point
│
├── server/                    # Node.js backend (Express)
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── utils/                # Utility functions
│   ├── controllers/          # (if applicable) Route handlers
│   ├── index.js              # Express server entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── netlify.toml              # Netlify deployment config
└── .git/                     # Git repository
```

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Razorpay account (for payments)
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Anirmay/GigConnect-Project.git
cd GigConnect-Project
```

#### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gigconnect

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend URL
CLIENT_URL=http://localhost:5173

# Razorpay Payment
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Email (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:3000
```

#### 4. Run Locally

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

---

## Deployment

### Option 1: Deploy Everything on Render (Recommended)

**Create a Static Site for Frontend:**
1. Go to Render.com
2. Click **"New"** → **"Static Site"**
3. Connect your GitHub repository
4. Configure:
   - **Build command:** `npm run build --prefix client`
   - **Publish directory:** `client/dist`
5. Add environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Your Render backend URL
6. Deploy

**Create a Web Service for Backend:**
1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Build command:** `npm install --prefix server`
   - **Start command:** `npm start --prefix server`
   - **Root directory:** Leave empty
4. Add environment variables (MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, etc.)
5. Deploy

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Gigs
- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create new gig
- `GET /api/gigs/:id` - Get gig details
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig
- `GET /api/gigs/search?query=...` - Search gigs

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get conversation
- `DELETE /api/messages/:id` - Delete message

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/:id` - Get review details
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history

### Profiles
- `GET /api/profiles/:userId` - Get user profile
- `PUT /api/profiles/:userId` - Update profile
- `GET /api/profiles/:userId/gigs` - Get user's gigs

---

## Real-Time Features (Socket.IO Events)

### Messaging Events
- `message:send` - New message sent
- `message:receive` - Message received
- `message:typing` - User typing indicator
- `user:online` - User came online
- `user:offline` - User went offline

### Notification Events
- `notification:new` - New notification
- `notification:read` - Notification marked as read

---

## Environment Variables

### Server (.env)
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gigconnect

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Server Config
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxxx

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3000
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Security Features

- JWT authentication for protected routes
- Password hashing with bcryptjs
- CORS configuration for secure API access
- Secure cookie handling
- Environment variables for sensitive data
- Input validation and sanitization
- Razorpay secure payment processing

---

## Performance Optimizations

- Lazy loading with React.lazy()
- Code splitting with Vite
- Image optimization
- Efficient state management with Context API
- WebSocket for real-time communication
- Database indexing

---

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Troubleshooting

### Backend Connection Issues
- Ensure MongoDB URI is correct in `.env`
- Check if backend is running on correct port
- Verify CORS is configured properly

### Payment Issues
- Verify Razorpay keys in `.env`
- Check Razorpay test mode vs live mode
- Ensure payment callback URL is set correctly

### Real-Time Features Not Working
- Check Socket.IO connection
- Verify both client and server are running
- Check browser console for errors

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all environment variables are set

---

## License

This project is licensed under the ISC License.

---

## Author

Created with ❤️ by **Anirmay Khan**

---

## Support

For support, email me or open an issue on GitHub.

---

## Roadmap

- [ ] Advanced search filters
- [ ] Skill verification badges
- [ ] Portfolio gallery with multiple media types
- [ ] Video interview integration
- [ ] AI-powered gig recommendations
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard enhancements
- [ ] Two-factor authentication
- [ ] Withdrawal methods (bank transfer, PayPal)
- [ ] Dispute resolution system

---

## Changelog

### v1.0.0
- Initial release
- User authentication (Client & Freelancer)
- Gig management system
- Real-time messaging
- Razorpay payment integration
- Review and rating system
- User profiles and portfolios
