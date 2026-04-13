import React, { useState } from 'react';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import PermissionMatrix from './pages/PermissionMatrix';
import Users from './pages/Users';
import Groups from './pages/Groups';
import AuditLogs from './pages/AuditLogs';

function App() {
  const [collapsed, setCollapsed] = useState(false);

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
        <Router>
          <div className="flex h-screen bg-gray-50">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/permissions" element={<PermissionMatrix />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/audit-logs" element={<AuditLogs />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;