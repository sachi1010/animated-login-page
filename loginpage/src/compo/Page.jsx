import React, { useState } from 'react';
import './Login.css';

const Page = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    mail: '',
    password: '',
    cpass: '',
    loginEmail: '',
    loginPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fname, sname, mail, password, cpass } = formData;

    if (password !== cpass) {
      alert('Passwords do not match');
      return;
    }

    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: fname,
        secondName: sname,
        email: mail,
        password,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = formData;

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="register" id="register">
      <div className={`form-container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="sign-up">
          <form className="form-container signup-container" onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <input type="text" placeholder="First name" required id="fname" onChange={handleChange} />
            <input type="text" placeholder="Second name" required id="sname" onChange={handleChange} />
            <input type="email" placeholder="Email" required id="mail" onChange={handleChange} />
            <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
            <input type="password" placeholder="Confirm password" required id="cpass" onChange={handleChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="login">
          <form className="form-container login-container" onSubmit={handleLogin}>
            <h1>Log In</h1>
            <input type="email" placeholder="Email" required id="loginEmail" onChange={handleChange} />
            <input type="password" placeholder="Password" required id="loginPassword" onChange={handleChange} />
            <a href="#">Forgot your password?</a>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>

      <div className="overlay-container">
        {/* Bubbles */}
        <div className="bubbles">
          {[...Array(20)].map((_, i) => (
            <span key={i} style={{ '--i': i + 1 }}></span>
          ))}
        </div>

        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <button onClick={() => setIsSignUp(false)}>Log In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          </div>
        </div>

        <footer className="animated-footer">© 2025 Sachithananthan B.</footer>
      </div>
    </div>
  );
};

export default Page;
