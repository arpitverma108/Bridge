import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  KeyOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  HistoryOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/permissions',
      icon: <KeyOutlined />,
      label: 'Permission Matrix',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Users',
    },
    {
      key: '/groups',
      icon: <UsergroupAddOutlined />,
      label: 'Groups',
    },
    {
      key: '/audit-logs',
      icon: <HistoryOutlined />,
      label: 'Audit Logs',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={260}
      className="shadow-lg"
      style={{ background: '#1e293b' }}
    >
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <FolderOutlined className="text-white text-2xl mr-2" />
        {!collapsed && (
          <span className="text-white text-lg font-semibold">SVN Manager</span>
        )}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="mt-4"
        style={{ background: '#1e293b', borderRight: 'none' }}
        theme="dark"
      />
    </Sider>
  );
};

export default Sidebar;