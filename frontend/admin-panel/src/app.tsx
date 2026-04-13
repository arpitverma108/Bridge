import React, { useState } from 'react';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import PermissionMatrix from './pages/PermissionMatrix';
import Users from './pages/Users';
import Groups from './pages/Groups';
import AuditLogs from './pages/AuditLogs';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'permissions':
        return <PermissionMatrix />;
      case 'users':
        return <Users />;
      case 'groups':
        return <Groups />;
      case 'audit-logs':
        return <AuditLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
        },
        components: {
          Layout: {
            siderBg: '#1e293b',
            headerBg: '#ffffff',
          },
        },
      }}
    >
      <AntApp>
        <div className="flex h-screen bg-gray-50">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;