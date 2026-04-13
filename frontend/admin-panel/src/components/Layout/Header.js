import React from 'react';
import { Layout, Avatar, Dropdown, Space, Badge, Button } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
  ];

  return (
    <AntHeader className="bg-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <Input
          placeholder="Search repositories, users, or paths..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded-lg"
          size="large"
        />
      </div>

      <Space size="large">
        <Badge count={5} size="small">
          <Button type="text" icon={<BellOutlined className="text-xl" />} />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar icon={<UserOutlined />} className="bg-blue-500" />
            <div className="hidden md:block">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;