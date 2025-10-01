import React, { useState } from 'react';
import Header from '../Header/Header';
import UploadForm from '../UploadForm/UploadForm';
import FileList from '../FileList/FileList';
import ProfilePage from '../ProfilePage/ProfilePage';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('main');

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return (
          <>
            <UploadForm />
            <FileList />
          </>
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <>
            <UploadForm />
            <FileList />
          </>
        );
    }
  };
  
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-nav">
        <button onClick={() => setCurrentPage('main')} className={currentPage === 'main' ? 'active' : ''}>Arquivos</button>
        <button onClick={() => setCurrentPage('profile')} className={currentPage === 'profile' ? 'active' : ''}>Perfil</button>
      </div>
      <button onClick={logout} className="logout-button">Sair</button>
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;