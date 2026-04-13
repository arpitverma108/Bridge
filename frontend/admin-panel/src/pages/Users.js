import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Typography, message, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateUserModal from '../components/Modals/CreateUserModal';

const { Title } = Typography;

const mockUsers = [
  { key: '1', username: 'john.doe', email: 'john@example.com', fullName: 'John Doe', groups: ['Admin', 'Developer'], status: 'active' },
  { key: '2', username: 'jane.smith', email: 'jane@example.com', fullName: 'Jane Smith', groups: ['Developer'], status: 'active' },
  { key: '3', username: 'bob.wilson', email: 'bob@example.com', fullName: 'Bob Wilson', groups: ['Client'], status: 'inactive' },
];

function Users() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const columns = [
    { title: 'User', dataIndex: 'username', key: 'username', render: (text, record) => (
      <div className="flex items-center gap-2">
        <Avatar size="small" className="bg-blue-500">{text.charAt(0).toUpperCase()}</Avatar>
        <div>
          <div className="font-medium">{record.fullName}</div>
          <div className="text-xs text-gray-400">{text}</div>
        </div>
      </div>
    ) },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Groups', dataIndex: 'groups', key: 'groups', render: (groups) => (
      <Space>
        {groups.map(group => (
          <Tag key={group} color={group === 'Admin' ? 'red' : group === 'Developer' ? 'blue' : 'purple'}>{group}</Tag>
        ))}
      </Space>
    ) },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'default'}>{status.toUpperCase()}</Tag>
    ) },
    { title: 'Action', key: 'action', render: () => (
      <Space>
        <Button type="link" icon={<EditOutlined />}>Edit</Button>
        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
      </Space>
    ) },
  ];

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="mb-0">Users</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          Create User
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
            size="large"
            allowClear
          />
        </div>
        <Table columns={columns} dataSource={filteredUsers} pagination={{ pageSize: 10 }} />
      </Card>

      <CreateUserModal visible={modalVisible} onClose={() => setModalVisible(false)} onSuccess={() => {
        message.success('User created successfully');
        setModalVisible(false);
      }} />
    </div>
  );
}

export default Users;