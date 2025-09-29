import React from 'react';
import Header from '../Header/Header';
import UploadForm from '../UploadForm/UploadForm';
import FileList from '../FileList/FileList';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  
  return (
    <div className="dashboard-container">
      <Header />
      <button onClick={logout} className="logout-button">Sair</button>
      <main>
        <UploadForm />
        <FileList />
      </main>
    </div>
  );
};

export default Dashboard;