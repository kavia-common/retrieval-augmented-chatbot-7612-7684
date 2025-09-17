import React from 'react';

/**
 * Navbar displays branding and theme toggle.
 * It is kept minimal and sticky at top.
 */
const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-inner">
        <div className="brand" aria-label="KAVIA RAG Chatbot">
          <div className="brand-logo" aria-hidden="true" />
          <div className="brand-title">RAG Chatbot</div>
          <span className="badge">Vector DB</span>
        </div>
        <div className="nav-actions">
          <button
            className="btn btn-ghost"
            type="button"
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts"
          >
            ⌨ Shortcuts
          </button>
          <button
            className="btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <a
            className="btn btn-primary"
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
