import React from 'react';
import { Card, Statistic, Table, Typography, Tag, Row, Col, Calendar } from 'antd';
import {
  UserOutlined,
  DatabaseOutlined,
  CloudUploadOutlined,
  CodeOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const recentCommits = [
  { key: '1', author: 'john.doe', repo: 'frontend-app', message: 'Fix header responsiveness', timestamp: '2024-01-15 14:32:00' },
  { key: '2', author: 'jane.smith', repo: 'backend-api', message: 'Add authentication middleware', timestamp: '2024-01-15 13:15:00' },
  { key: '3', author: 'bob.wilson', repo: 'mobile-app', message: 'Update dependencies', timestamp: '2024-01-15 11:45:00' },
  { key: '4', author: 'alice.chen', repo: 'docs-repo', message: 'Update API documentation', timestamp: '2024-01-15 10:20:00' },
  { key: '5', author: 'mike.brown', repo: 'frontend-app', message: 'Add dark mode support', timestamp: '2024-01-15 09:05:00' },
];

const columns = [
  { title: 'Author', dataIndex: 'author', key: 'author', render: (text) => <Tag color="blue">{text}</Tag> },
  { title: 'Repository', dataIndex: 'repo', key: 'repo' },
  { title: 'Message', dataIndex: 'message', key: 'message', ellipsis: true },
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 180 },
];

const getHeatmapData = () => {
  const data = {};
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    data[dateStr] = Math.floor(Math.random() * 15);
  }
  return data;
};

const heatmapData = getHeatmapData();

function Dashboard() {
  const dateCellRender = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const count = heatmapData[dateStr] || 0;
    let color = '';
    if (count === 0) color = '#ebedf0';
    else if (count < 3) color = '#c6e48b';
    else if (count < 7) color = '#7bc96f';
    else if (count < 12) color = '#239a3b';
    else color = '#196127';
    
    return (
      <div className="text-center">
        <div className="w-full h-8 rounded" style={{ backgroundColor: color }} />
        <div className="text-xs mt-1">{count}</div>
      </div>
    );
  };

  return (
    <div>
      <Title level={3} className="mb-6">Live Stats Overview</Title>
      
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic title="Active Users" value={47} prefix={<UserOutlined />} valueStyle={{ color: '#3f8600' }} />
            <Text type="secondary" className="text-sm">+12% this week</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic title="Total Repositories" value={23} prefix={<DatabaseOutlined />} />
            <Text type="secondary" className="text-sm">3 public, 20 private</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic title="Storage Used (GB)" value={187.5} precision={1} prefix={<CloudUploadOutlined />} valueStyle={{ color: '#cf1322' }} />
            <Text type="secondary" className="text-sm">42.3% of quota</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic title="Total Commits Today" value={142} prefix={<CodeOutlined />} valueStyle={{ color: '#1890ff' }} />
            <Text type="secondary" className="text-sm">+8 vs yesterday</Text>
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" className="mb-8 shadow-sm">
        <Table columns={columns} dataSource={recentCommits} pagination={false} size="middle" />
      </Card>

      <Card title="Activity Heatmap (Commit Frequency)" className="shadow-sm">
        <div className="overflow-x-auto">
          <Calendar fullscreen={false} headerRender={() => null} dateCellRender={dateCellRender} />
        </div>
        <div className="flex justify-end gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#ebedf0]"></div> 0</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#c6e48b]"></div> 1-2</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#7bc96f]"></div> 3-6</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#239a3b]"></div> 7-11</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#196127]"></div> 12+</div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;