import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Typography,
  message,
  Avatar
} from 'antd';

import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import CreateUserModal from '../components/Modals/CreateUserModal';
import { getUsers, createUser } from '../services/api';

const { Title } = Typography;

function Users() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  // ✅ LOAD USERS
  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      message.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ✅ TABLE COLUMNS
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar size="small" className="bg-blue-500">
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-medium">{record.fullName}</div>
            <div className="text-xs text-gray-400">{text}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
      render: (groups = []) => (
        <Space>
          {groups.map(group => (
            <Tag
              key={group}
              color={
                group === 'Admin'
                  ? 'red'
                  : group === 'Developer'
                  ? 'blue'
                  : 'purple'
              }
            >
              {group}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status?.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  // ✅ SEARCH FILTER (fixed)
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.fullName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Users</Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Create User
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <CreateUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={async (newUser) => {
          try {
            await createUser(newUser);
            message.success("User created successfully");
            setModalVisible(false);
            loadUsers(); // 🔥 refresh
          } catch {
            message.error("Failed to create user");
          }
        }}
      />
    </div>
  );
}

export default Users;