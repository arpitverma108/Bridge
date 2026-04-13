import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Typography, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import CreateGroupModal from '../components/Modals/CreateGroupModal';

const { Title } = Typography;

const mockGroups = [
  { key: '1', name: 'Admin', description: 'Full system access', memberCount: 3, color: 'red' },
  { key: '2', name: 'Developer', description: 'Read/Write access to code', memberCount: 12, color: 'blue' },
  { key: '3', name: 'Client', description: 'Read-only access', memberCount: 8, color: 'purple' },
];

function Groups() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [groups, setGroups] = useState(mockGroups);

  const columns = [
    { title: 'Group Name', dataIndex: 'name', key: 'name', render: (text, record) => (
      <Tag color={record.color} className="text-base px-3 py-1">{text}</Tag>
    ) },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Members', dataIndex: 'memberCount', key: 'memberCount', render: (count) => (
      <Space><UserOutlined /> {count} members</Space>
    ) },
    { title: 'Action', key: 'action', render: () => (
      <Space>
        <Button type="link" icon={<EditOutlined />}>Edit</Button>
        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
      </Space>
    ) },
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="mb-0">Groups</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          Create Group
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search groups..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
            size="large"
            allowClear
          />
        </div>
        <Table columns={columns} dataSource={filteredGroups} pagination={{ pageSize: 10 }} />
      </Card>

      <CreateGroupModal visible={modalVisible} onClose={() => setModalVisible(false)} onSuccess={() => {
        message.success('Group created successfully');
        setModalVisible(false);
      }} />
    </div>
  );
}

export default Groups;