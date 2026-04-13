import React, { useState } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, Typography, ConfigProvider, App as AntApp } from 'antd';
import {
  DashboardOutlined,
  KeyOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import AdminDashboard from './pages/AdminDashboard';
import PermissionMatrix from './pages/PermissionMatrix';
import ClientPortal from './pages/ClientPortal';
import AuditLog from './pages/AuditLog';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'permissions', icon: <KeyOutlined />, label: 'Permission Matrix' },
  { key: 'client', icon: <FolderOpenOutlined />, label: 'Client Portal' },
  { key: 'audit', icon: <HistoryOutlined />, label: 'Audit Log' },
];

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  { type: 'divider' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'permissions':
        return <PermissionMatrix />;
      case 'client':
        return <ClientPortal />;
      case 'audit':
        return <AuditLog />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#1a1a2e',
            headerBg: '#ffffff',
          },
        },
      }}
    >
      <AntApp>
        <Layout className="min-h-screen">
          <Sider width={260} className="shadow-lg" style={{ background: '#1a1a2e' }}>
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
              <Text strong className="text-white text-lg">
                SVN Manager
              </Text>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[currentPage]}
              items={items}
              onClick={({ key }) => setCurrentPage(key)}
              className="mt-4"
              style={{ background: '#1a1a2e', borderRight: 'none' }}
              theme="dark"
            />
          </Sider>

          <Layout>
            <Header
              className="flex items-center justify-between px-6 shadow-sm"
              style={{ background: colorBgContainer }}
            >
              <div>
                <Text strong className="text-lg">
                  {items.find(i => i?.key === currentPage)?.label}
                </Text>
              </div>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <div className="flex items-center gap-2 cursor-pointer rounded-full px-3 py-1 hover:bg-gray-100 transition">
                  <Avatar size="default" icon={<UserOutlined />} className="bg-blue-500" />
                  <span className="text-gray-700">Admin User</span>
                </div>
              </Dropdown>
            </Header>
            <Content
              className="m-6 overflow-auto"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                minHeight: 280,
              }}
            >
              <div className="p-6">{renderContent()}</div>
            </Content>
          </Layout>
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;