import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import HomePage from './pages/HomePage';
// import Layout from './components/Layout';
import CreateGigPage from './pages/CreateGigPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // NEW
import ResetPasswordPage from './pages/ResetPasswordPage'; // NEW
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import GigDetailPage from './pages/GigDetailPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const AppLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet /> {/* Child routes will render here */}
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes WITH the Header and Footer */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/post-gig" element={<CreateGigPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/gig/:id" element={<GigDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        
        {/* Route WITHOUT the Header and Footer */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

