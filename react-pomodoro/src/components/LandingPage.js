import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Bem-vindo ao Pomodoro Pro</h1>
        <p className="subtitle">Aumente sua produtividade com a técnica Pomodoro</p>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <i className="fas fa-clock"></i>
          <h3>O que é Pomodoro?</h3>
          <p>A técnica Pomodoro é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo no final dos anos 1980. O método usa um timer para dividir o trabalho em intervalos, tradicionalmente de 25 minutos, separados por pequenas pausas.</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-brain"></i>
          <h3>Benefícios</h3>
          <ul>
            <li>Aumento da produtividade</li>
            <li>Melhor gerenciamento do tempo</li>
            <li>Redução da fadiga mental</li>
            <li>Maior foco e concentração</li>
            <li>Equilíbrio entre trabalho e descanso</li>
          </ul>
        </div>

        <div className="feature-card">
          <i className="fas fa-lightbulb"></i>
          <h3>Como Funciona?</h3>
          <ol>
            <li>Escolha uma tarefa para realizar</li>
            <li>Defina o timer para 25 minutos</li>
            <li>Trabalhe na tarefa até o timer tocar</li>
            <li>Faça uma pausa curta (5 minutos)</li>
            <li>A cada 4 pomodoros, faça uma pausa mais longa (15-30 minutos)</li>
          </ol>
        </div>
      </div>

      <div className="cta-section">
        <h2>Pronto para começar?</h2>
        <p>Junte-se a milhares de pessoas que já aumentaram sua produtividade com o Pomodoro Pro</p>
        <button className="cta-button" onClick={handleContinue}>
          Começar Agora
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 