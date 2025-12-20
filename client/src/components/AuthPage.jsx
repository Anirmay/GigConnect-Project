import React, { useState, useContext } from 'react'; // NEW: useContext
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // NEW
import { jwtDecode } from 'jwt-decode'; // NEW
import Cookies from 'js-cookie'; // NEW


const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>;
const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11v2.4h3.97c-.16 1.02-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42s1.95-4.42 4.34-4.42c1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.08 0 6.7-2.84 6.7-6.84 0-.46-.05-.91-.11-1.36h-6.59z"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-9.099c0-2.198 1.226-3.901 3.518-3.901s3.484 1.703 3.484 3.901v9.099h4.98v-10.373c0-4.529-2.585-7.627-6.281-7.627s-5.698 3.101-5.698 3.101v-2.101z"></path></svg>;

const AuthPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(AuthContext);

    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '', role: 'Client' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUpClick = () => { setIsSignUp(true); setError(null); };
    const handleSignInClick = () => { setIsSignUp(false); setError(null); };
    const handleSignUpChange = (e) => { setSignUpData({ ...signUpData, [e.target.name]: e.target.value }); };
    const handleSignInChange = (e) => { setSignInData({ ...signInData, [e.target.name]: e.target.value }); };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('https://gigconnect-project.onrender.com/api/auth/register', signUpData);
            alert('Registration successful! Please sign in.');
            setIsSignUp(false);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            setLoading(false);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('https://gigconnect-project.onrender.com/api/auth/login', signInData, { withCredentials: true });
            

            setCurrentUser(res.data);
            
            navigate('/'); 
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            setLoading(false);
        }
    };

    const containerClassName = `auth-container ${isSignUp ? 'right-panel-active show-signup' : ''}`;

    const AuthStyles = () => (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');
            body {
                overflow: hidden;
            }
            :root {
                --accent-color: #FF4B2B;
                --primary-text-color: #333;
                --overlay-gradient: linear-gradient(to right, #FF4B2B, #FF416C);
            }
            
            .auth-page-wrapper {
                font-family: 'Poppins', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: #f0f2f5;
                overflow: hidden;
            }
            .auth-page-wrapper h1 { font-weight: 700; margin-bottom: 1rem; }
            .auth-page-wrapper p { font-size: 14px; font-weight: 300; line-height: 20px; letter-spacing: 0.5px; margin: 20px 0 30px; }
            .auth-page-wrapper span { font-size: 12px; }
            .auth-page-wrapper a { color: var(--primary-text-color); font-size: 14px; text-decoration: none; margin: 15px 0; }
            .auth-page-wrapper input, .auth-page-wrapper select { background-color: #eee; border: 1px solid #eee; padding: 12px 15px; margin: 8px 0; width: 75%; border-radius: 8px; transition: all 0.3s ease; }
            .auth-page-wrapper input:focus, .auth-page-wrapper select:focus { outline: none; border-color: var(--accent-color); box-shadow: 0 0 0 3px rgba(255, 75, 43, 0.2); }
            .auth-page-wrapper button { font-family: 'Poppins', sans-serif; border-radius: 20px; border: 1px solid var(--accent-color); background-color: var(--accent-color); color: #FFFFFF; font-size: 12px; font-weight: bold; padding: 12px 45px; letter-spacing: 1px; text-transform: uppercase; transition: transform 80ms ease-in; cursor: pointer; margin-top: 10px; }
            .auth-page-wrapper button:disabled { background-color: #ccc; border-color: #ccc; cursor: not-allowed; }
            .auth-page-wrapper button:active { transform: scale(0.95); }
            .auth-page-wrapper button.ghost { background-color: transparent; border-color: #FFFFFF; }
            .social-container { margin: 20px 0; }
            .social-container a { border: 1px solid #DDDDDD; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin: 0 5px; height: 40px; width: 40px; transition: all 0.3s ease-in-out; color: #333; }
            .social-container svg { width: 20px; height: 20px; }
            .social-container a:hover { transform: scale(1.1); background-color: var(--accent-color); color: #fff; border-color: var(--accent-color); }
            .auth-container { background: transparent; width: 100%; height: 100vh; display: flex; flex-direction: column; position: relative; overflow: hidden; }
            .mobile-tabs { display: flex; width: 100%; background-color: #fff; z-index: 10; position: absolute; top: 0; }
            .mobile-tab { flex: 1; padding: 15px; text-align: center; background: none; border: none; border-bottom: 3px solid transparent; color: var(--primary-text-color); font-size: 14px; font-weight: 700; transition: all 0.3s ease; }
            .mobile-tab.active { color: var(--accent-color); border-bottom: 3px solid var(--accent-color); }
            .form-wrapper { flex-grow: 1; position: relative; width: 100%; display: flex; justify-content: center; align-items: center; padding: 20px; padding-top: 80px; }
            .form-container { background-color: #fff; position: absolute; width: calc(100% - 40px); max-width: 400px; height: auto; transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
            .form-container form { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
            .error-message { color: red; font-size: 12px; margin-top: 10px; height: 15px; }
            .sign-up-container { opacity: 0; transform: translateY(100%); z-index: 1; pointer-events: none; }
            .sign-in-container { opacity: 1; transform: translateY(0); z-index: 2; }
            .auth-container.show-signup .sign-in-container { opacity: 0; transform: translateY(-100%); z-index: 1; pointer-events: none; }
            .auth-container.show-signup .sign-up-container { opacity: 1; transform: translateY(0); z-index: 5; pointer-events: auto; }
            .overlay-container { display: none; }
            @media (min-width: 768px) {
                .auth-page-wrapper { background: #f6f5f7; }
                .mobile-tabs { display: none; }
                .form-wrapper { padding: 0; display: block; flex-grow: 0; position: static; }
                .auth-container { background-color: #fff; border-radius: 10px; box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); position: relative; overflow: hidden; width: 850px; max-width: 100%; min-height: 520px; height: auto; flex-direction: row; }
                .form-container { position: absolute; top: 0; height: 100%; width: 50%; max-width: none; box-shadow: none; border-radius: 0; opacity: 1; transform: none; transition: all 0.6s ease-in-out; }
                .form-container form { height: 100%; padding: 0; }
                .sign-in-container { right: 45%; z-index: 2; padding: 0 40px; }
                .sign-up-container { right: 55%; opacity: 0; z-index: 1; padding: 0 40px; }
                .auth-container.right-panel-active .sign-in-container { transform: translateX(100%); }
                .auth-container.right-panel-active .sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s; }
                @keyframes show { 0%, 49.99% { opacity: 0; z-index: 1; } 50%, 100% { opacity: 1; z-index: 5; } }
                .overlay-container { display: block; position: absolute; top: 0; left: 50%; width: 50%; height: 100%; overflow: hidden; transition: transform 0.6s ease-in-out; z-index: 100; }
                .auth-container.right-panel-active .overlay-container { transform: translateX(-100%); }
                .overlay { background: var(--overlay-gradient); color: #FFFFFF; position: relative; left: -100%; height: 100%; width: 200%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
                .auth-container.right-panel-active .overlay { transform: translateX(50%); }
                .overlay-panel { position: absolute; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; top: 0; height: 100%; width: 50%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
                .overlay-left { transform: translateX(-20%); }
                .overlay-right { right: 0; transform: translateX(0); }
                .auth-container.right-panel-active .overlay-left { transform: translateX(0); }
                .auth-container.right-panel-active .overlay-right { transform: translateX(20%); }
            }
        `}</style>
    );

    return (
        <div className="auth-page-wrapper">
            <AuthStyles />
            <div className={containerClassName}>

                {/* Mobile-Only Tabs */}
                <div className="mobile-tabs">
                    <button className={`mobile-tab ${!isSignUp ? 'active' : ''}`} onClick={handleSignInClick}>SIGN IN</button>
                    <button className={`mobile-tab ${isSignUp ? 'active' : ''}`} onClick={handleSignUpClick}>SIGN UP</button>
                </div>

                <div className="form-wrapper">
                    {/* Sign Up Form */}
                    <div className="form-container sign-up-container">

                        <form onSubmit={handleSignUpSubmit}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><FacebookIcon /></a>
                                <a href="#" className="social"><GoogleIcon /></a>
                                <a href="#" className="social"><LinkedinIcon /></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Username" name="username" value={signUpData.username} onChange={handleSignUpChange} required />
                            <input type="email" placeholder="Email" name="email" value={signUpData.email} onChange={handleSignUpChange} required />
                            <input type="password" placeholder="Password" name="password" value={signUpData.password} onChange={handleSignUpChange} required />
                            <select name="role" value={signUpData.role} onChange={handleSignUpChange} required>
                                <option value="Client">I am a Client</option>
                                <option value="freelancer">I am a Freelancer</option>
                            </select>

                            <div className="error-message">{isSignUp ? error : ''}</div>
                            <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
                        </form>
                    </div>

                    {/* Sign In Form */}
                    <div className="form-container sign-in-container">

                        <form onSubmit={handleSignInSubmit}>
                            <h1>Sign In</h1>
                            <div className="social-container">
                                <a href="#" className="social"><FacebookIcon /></a>
                                <a href="#" className="social"><GoogleIcon /></a>
                                <a href="#" className="social"><LinkedinIcon /></a>
                            </div>
                            <span>or use your account</span>

                            <input type="email" placeholder="Email" name="email" value={signInData.email} onChange={handleSignInChange} required />
                            <input type="password" placeholder="Password" name="password" value={signInData.password} onChange={handleSignInChange} required />
                            <a href="/forgot-password">Forgot your password?</a>

                            <div className="error-message">{!isSignUp ? error : ''}</div>
                            <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
                        </form>
                    </div>
                </div>


                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start <br /> your journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;