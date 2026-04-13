import React, { useState } from 'react';
import { Table, Tag, Button, DatePicker, Select, Space, Card, Row, Col, Typography, message } from 'antd';
import { SearchOutlined, ExportOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const mockAuditLogs = [
  { key: '1', timestamp: '2024-01-15 14:32:00', user: 'john.doe', actionType: 'Commit', ipAddress: '192.168.1.45', details: 'Committed 3 files to /trunk/src/' },
  { key: '2', timestamp: '2024-01-15 13:15:00', user: 'jane.smith', actionType: 'Login', ipAddress: '10.0.0.12', details: 'Successful login' },
  { key: '3', timestamp: '2024-01-15 12:00:00', user: 'alice.chen', actionType: 'Access Denied', ipAddress: '192.168.1.88', details: 'Attempted to access /confidential/hr/' },
  { key: '4', timestamp: '2024-01-15 10:30:00', user: 'admin', actionType: 'Access Change', ipAddress: '10.0.0.1', details: 'Modified permissions' },
  { key: '5', timestamp: '2024-01-14 16:20:00', user: 'bob.wilson', actionType: 'Commit', ipAddress: '192.168.1.23', details: 'Committed hotfix' },
];

const actionColors = {
  Commit: 'green',
  Login: 'blue',
  'Access Change': 'orange',
  'Access Denied': 'red',
};

function AuditLogs() {
  const [filteredData, setFilteredData] = useState(mockAuditLogs);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const uniqueUsers = [...new Set(mockAuditLogs.map(log => log.user))];
  const actionTypes = ['Commit', 'Login', 'Access Change', 'Access Denied'];

  const handleSearch = () => {
    let filtered = [...mockAuditLogs];
    if (selectedUser) filtered = filtered.filter(log => log.user === selectedUser);
    if (selectedAction) filtered = filtered.filter(log => log.actionType === selectedAction);
    setFilteredData(filtered);
    message.info(`Found ${filtered.length} records`);
  };

  const handleReset = () => {
    setSelectedUser('');
    setSelectedAction('');
    setFilteredData(mockAuditLogs);
  };

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Action Type', 'IP Address', 'Details'];
    const rows = filteredData.map(log => [log.timestamp, log.user, log.actionType, log.ipAddress, `"${log.details}"`]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Export started');
  };

  const columns = [
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 180, sorter: (a, b) => a.timestamp.localeCompare(b.timestamp) },
    { title: 'User', dataIndex: 'user', key: 'user', render: (text) => <Tag color="geekblue">{text}</Tag> },
    { title: 'Action Type', dataIndex: 'actionType', key: 'actionType', render: (type) => <Tag color={actionColors[type]}>{type}</Tag> },
    { title: 'IP Address', dataIndex: 'ipAddress', key: 'ipAddress', render: (ip) => <code className="text-xs">{ip}</code> },
    { title: 'Details', dataIndex: 'details', key: 'details', ellipsis: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="mb-0">System Audit Log</Title>
        <Button icon={<ExportOutlined />} onClick={handleExportCSV}>Export to CSV</Button>
      </div>

      <Card className="mb-6 shadow-sm">
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={12} md={6}>
            <Text strong className="block mb-1">User</Text>
            <Select className="w-full" placeholder="All Users" allowClear value={selectedUser || undefined} onChange={setSelectedUser} options={uniqueUsers.map(user => ({ label: user, value: user }))} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong className="block mb-1">Action Type</Text>
            <Select className="w-full" placeholder="All Actions" allowClear value={selectedAction || undefined} onChange={setSelectedAction} options={actionTypes.map(action => ({ label: action, value: action }))} />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Apply Filters</Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card className="shadow-sm">
        <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} rowKey="key" />
      </Card>
    </div>
  );
}

export default AuditLogs;