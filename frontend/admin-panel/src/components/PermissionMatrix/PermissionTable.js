import React from 'react';
import { Table, Select, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const PermissionCell = ({ permission, onChange }) => {
  const getColor = () => {
    switch (permission) {
      case 'Write': return 'green';
      case 'Read': return 'blue';
      default: return 'red';
    }
  };

  const getIcon = () => {
    switch (permission) {
      case 'Write': return '✏️';
      case 'Read': return '👁️';
      default: return '🚫';
    }
  };

  return (
    <Select
      value={permission}
      onChange={onChange}
      style={{ width: 110 }}
      size="small"
      className={`permission-select-${getColor()}`}
    >
      <Select.Option value="Write">
        <span className="text-green-600 flex items-center gap-2">
          <span>{getIcon()}</span> Write
        </span>
      </Select.Option>
      <Select.Option value="Read">
        <span className="text-blue-600 flex items-center gap-2">
          <span>{getIcon()}</span> Read
        </span>
      </Select.Option>
      <Select.Option value="Deny">
        <span className="text-red-600 flex items-center gap-2">
          <span>{getIcon()}</span> Deny
        </span>
      </Select.Option>
    </Select>
  );
};

const PermissionTable = ({ permissions, groups, selectedGroup, onPermissionChange }) => {
  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          <span>Repository Path</span>
          <Tooltip title="Folder path in SVN repository">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'path',
      key: 'path',
      fixed: 'left',
      width: 320,
      render: (path) => (
        <div className="font-mono text-sm">
          {path}
        </div>
      ),
    },
    ...groups
      .filter(group => selectedGroup === 'all' || group.name === selectedGroup)
      .map(group => ({
        title: (
          <div className="flex flex-col">
            <Tag color={group.color} className="mb-1">{group.name}</Tag>
            <span className="text-xs text-gray-400">{group.memberCount} members</span>
          </div>
        ),
        key: group.name,
        width: 150,
        render: (_, record) => (
          <PermissionCell
            permission={permissions[record.path]?.[group.name] || 'Deny'}
            onChange={(newPermission) =>
              onPermissionChange(record.path, group.name, newPermission)
            }
          />
        ),
      })),
  ];

  const dataSource = Object.entries(permissions).map(([path, groups]) => ({
    key: path,
    path,
    ...groups,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 20, showSizeChanger: true }}
      scroll={{ x: 'max-content', y: 'calc(100vh - 400px)' }}
      sticky
      size="middle"
      bordered
    />
  );
};

export default PermissionTable;