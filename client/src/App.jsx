import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './components/AuthPage';
import CreateGigPage from './pages/CreateGigPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import GigDetailPage from './pages/GigDetailPage';
import DashboardPage from './pages/DashboardPage';
import FindTalentPage from './pages/FindTalentPage';
import PublicProfilePage from './pages/PublicProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import FindWorkPage from './pages/FindWorkPage'; // Import the new page
import WhyGigConnectPage from './pages/WhyGigConnectPage'; // Import the new page
import EditGigPage from "./pages/EditGigPage";
import './App.css';

const AppLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="find-talent" element={<FindTalentPage />} />
          <Route path="post-gig" element={<CreateGigPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="user/:userId" element={<PublicProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="messages" element={<ChatPage />} />
          <Route path="gig/:id" element={<GigDetailPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* --- THIS IS THE NEW ROUTE --- */}
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="find-work" element={<FindWorkPage />} />
          <Route path="why-gigconnect" element={<WhyGigConnectPage />} />
          <Route path="/edit-gig/:id" element={<EditGigPage />} />
        </Route>
        
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}