import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Input,
  Space,
  Tree,
  Spin,
  message,
  Drawer,
  Select,
  Slider,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  SaveOutlined,
  FilterOutlined,
  ExpandAltOutlined,
  CompressOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import PermissionTable from '../components/PermissionMatrix/PermissionTable';
import FolderTree from '../components/PermissionMatrix/FolderTree';
import { mockPermissions, mockGroups, mockFolderStructure } from '../utils/constants';
import { savePermissions } from '../services/api';

const PermissionMatrix = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [bulkPermission, setBulkPermission] = useState('Read');

  // Load initial data
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPermissions(mockPermissions);
      setExpandedKeys(['/trunk']);
      setLoading(false);
    }, 500);
  };

  const handlePermissionChange = (path, group, newPermission) => {
    setPermissions(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        [group]: newPermission,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Transform to backend format
      const payload = Object.entries(permissions).flatMap(([path, groups]) =>
        Object.entries(groups).map(([group, permission]) => ({
          path,
          group,
          permission: permission === 'Write' ? 'rw' : permission === 'Read' ? 'r' : '',
        }))
      );
      
      await savePermissions(payload);
      message.success('Permissions saved successfully!');
    } catch (error) {
      message.error('Failed to save permissions');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkEdit = () => {
    if (selectedPaths.length === 0) {
      message.warning('Please select paths to edit');
      return;
    }
    
    setPermissions(prev => {
      const newPermissions = { ...prev };
      selectedPaths.forEach(path => {
        if (newPermissions[path]) {
          Object.keys(newPermissions[path]).forEach(group => {
            if (selectedGroup === 'all' || group === selectedGroup) {
              newPermissions[path][group] = bulkPermission;
            }
          });
        }
      });
      return newPermissions;
    });
    
    message.success(`Applied ${bulkPermission} permission to ${selectedPaths.length} paths`);
    setSelectedPaths([]);
    setFilterDrawerVisible(false);
  };

  const handleExport = () => {
    const exportData = Object.entries(permissions).map(([path, groups]) => ({
      path,
      ...groups,
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `permissions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Permissions exported');
  };

  const filteredPermissions = Object.entries(permissions).filter(([path]) =>
    path.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Permission Matrix</h1>
          <p className="text-gray-500 mt-1">Manage access control for SVN repositories</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={loadPermissions}>
            Refresh
          </Button>
          <Button icon={<FilterOutlined />} onClick={() => setFilterDrawerVisible(true)}>
            Bulk Edit
          </Button>
          <Button onClick={handleExport}>Export</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
            className="bg-blue-600"
          >
            Save Changes
          </Button>
        </Space>
      </div>

      {/* Search and Filter Bar */}
      <Card className="shadow-sm">
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Search by path..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 min-w-[200px]"
            size="large"
            allowClear
          />
          <Select
            placeholder="Filter by group"
            value={selectedGroup}
            onChange={setSelectedGroup}
            className="w-48"
            size="large"
          >
            <Select.Option value="all">All Groups</Select.Option>
            {mockGroups.map(group => (
              <Select.Option key={group.name} value={group.name}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
          <Space>
            <Tooltip title="Expand All">
              <Button
                icon={<ExpandAltOutlined />}
                onClick={() => setExpandedKeys(Object.keys(mockFolderStructure))}
              />
            </Tooltip>
            <Tooltip title="Collapse All">
              <Button
                icon={<CompressOutlined />}
                onClick={() => setExpandedKeys([])}
              />
            </Tooltip>
          </Space>
        </div>
      </Card>

      {/* Main Permission Matrix */}
      <Card className="shadow-sm">
        <Spin spinning={loading}>
          <div className="flex gap-6">
            {/* Folder Tree */}
            <div className="w-80 border-r pr-4">
              <div className="mb-3 font-medium text-gray-700">Repository Structure</div>
              <FolderTree
                folderStructure={mockFolderStructure}
                expandedKeys={expandedKeys}
                onExpand={setExpandedKeys}
                selectedPaths={selectedPaths}
                onSelectPath={(path) => {
                  setSelectedPaths(prev =>
                    prev.includes(path)
                      ? prev.filter(p => p !== path)
                      : [...prev, path]
                  );
                }}
              />
            </div>

            {/* Permissions Table */}
            <div className="flex-1 overflow-x-auto">
              <PermissionTable
                permissions={Object.fromEntries(filteredPermissions)}
                groups={mockGroups}
                selectedGroup={selectedGroup}
                onPermissionChange={handlePermissionChange}
              />
            </div>
          </div>
        </Spin>
      </Card>

      {/* Bulk Edit Drawer */}
      <Drawer
        title="Bulk Permission Edit"
        placement="right"
        open={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
        width={400}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Selected Paths</label>
            <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
              {selectedPaths.length === 0 ? (
                <p className="text-gray-400 text-sm">No paths selected</p>
              ) : (
                selectedPaths.map(path => (
                  <div key={path} className="text-sm py-1 font-mono">{path}</div>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Apply to Group</label>
            <Select
              value={selectedGroup}
              onChange={setSelectedGroup}
              className="w-full"
              size="large"
            >
              <Select.Option value="all">All Groups</Select.Option>
              {mockGroups.map(group => (
                <Select.Option key={group.name} value={group.name}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Set Permission</label>
            <Select
              value={bulkPermission}
              onChange={setBulkPermission}
              className="w-full"
              size="large"
            >
              <Select.Option value="Deny">Deny</Select.Option>
              <Select.Option value="Read">Read</Select.Option>
              <Select.Option value="Write">Write</Select.Option>
            </Select>
          </div>

          <Button
            type="primary"
            onClick={handleBulkEdit}
            className="w-full"
            size="large"
          >
            Apply to {selectedPaths.length} Paths
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default PermissionMatrix;