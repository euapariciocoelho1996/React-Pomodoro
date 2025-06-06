import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <i className="fas fa-clock"></i>
          <span>Pomodoro Pro</span>
        </div>
        <nav className="nav-menu">
          <button className="nav-button" onClick={() => navigate('/pomodoro')}>
            <i className="fas fa-play"></i>
            Iniciar Timer
          </button>
          <button className="nav-button" onClick={() => navigate('/estatisticas')}>
            <i className="fas fa-chart-bar"></i>
            Estatísticas
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; 