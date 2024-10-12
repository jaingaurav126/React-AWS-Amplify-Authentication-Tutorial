import React, { useEffect, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import './App.css'; // Custom styles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const session = await fetchAuthSession();
        setIsAuthenticated(session.isValid());
      } catch (error) {
        console.log('No authenticated session:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      window.location.reload();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Authentication App</h1>
      </header>
      <main className="app-content">
        {isAuthenticated ? (
          <div className="auth-section">
            <h2>Welcome, you're logged in!</h2>
            <button className="signout-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="loading-section">
            <h2>Checking session...</h2>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>© 2024 Authentication App | Powered by AWS Amplify</p>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
