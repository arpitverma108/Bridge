import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Spin,
  message,
  Select,
  Typography,
  Table,
  Tag,
} from 'antd';

import {
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import { getPermissions, savePermissions, getGroups } from '../services/api';

const { Title } = Typography;

function PermissionMatrix() {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [groups, setGroups] = useState([]); // ✅ dynamic
  const [selectedGroup, setSelectedGroup] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  // ✅ LOAD DATA FROM API
  const loadData = async () => {
    setLoading(true);
    try {
      const permData = await getPermissions();
      const groupData = await getGroups();

      setPermissions(permData);
      setGroups(groupData);
    } catch (err) {
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE UI
  const handlePermissionChange = (path, group, value) => {
    setPermissions(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        [group]: value,
      },
    }));
  };

  // ✅ SAVE TO BACKEND
  const handleSave = async () => {
    const payload = Object.entries(permissions).flatMap(([path, groups]) =>
      Object.entries(groups).map(([group, permission]) => ({
        path,
        group,
        permission:
          permission === 'Write' ? 'rw' :
          permission === 'Read' ? 'r' : '',
      }))
    );

    try {
      await savePermissions(payload);
      message.success("Saved successfully");
    } catch {
      message.error("Save failed");
    }
  };

  // ✅ TABLE
  const columns = [
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    ...(selectedGroup === 'all'
      ? groups
      : groups.filter(g => g === selectedGroup)
    ).map(group => ({
      title: <Tag color="blue">{group}</Tag>,
      key: group,
      render: (_, record) => {
        const value = permissions[record.path]?.[group] || 'Deny';
        return (
          <select
            value={value}
            onChange={(e) =>
              handlePermissionChange(record.path, group, e.target.value)
            }
          >
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Deny">Deny</option>
          </select>
        );
      },
    })),
  ];

  const dataSource = Object.entries(permissions).map(([path, groups]) => ({
    key: path,
    path,
    ...groups,
  }));

  return (
    <div>
      <Title level={3}>Permission Matrix</Title>

      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ReloadOutlined />} onClick={loadData}>
          Refresh
        </Button>

        <Select
          value={selectedGroup}
          onChange={setSelectedGroup}
          style={{ width: 150 }}
        >
          <Select.Option value="all">All</Select.Option>
          {groups.map(g => (
            <Select.Option key={g} value={g}>
              {g}
            </Select.Option>
          ))}
        </Select>

        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Save
        </Button>
      </Space>

      <Card>
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={dataSource} />
        </Spin>
      </Card>
    </div>
  );
}

export default PermissionMatrix;