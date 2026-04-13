import React from 'react';
import { Tree } from 'antd';
import { FolderOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';

const FolderTree = ({ folderStructure, expandedKeys, onExpand, selectedPaths, onSelectPath }) => {
  const convertToTreeData = (structure, parentPath = '') => {
    return Object.entries(structure).map(([name, children]) => {
      const currentPath = parentPath ? `${parentPath}/${name}` : `/${name}`;
      
      if (children === null) {
        return {
          title: name,
          key: currentPath,
          icon: <FileOutlined />,
          isLeaf: true,
        };
      }
      
      return {
        title: name,
        key: currentPath,
        icon: ({ expanded }) => expanded ? <FolderOpenOutlined /> : <FolderOutlined />,
        children: convertToTreeData(children, currentPath),
      };
    });
  };

  const treeData = convertToTreeData(folderStructure);

  return (
    <Tree
      checkable
      showIcon
      treeData={treeData}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      checkedKeys={selectedPaths}
      onCheck={(checkedKeys) => onSelectPath(checkedKeys)}
      className="folder-tree"
    />
  );
};

export default FolderTree;