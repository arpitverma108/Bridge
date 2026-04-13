import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';

const CreateGroupModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(`Group ${values.name} created successfully`);
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Group"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit} icon={<UsergroupAddOutlined />}>
          Create Group
        </Button>,
      ]}
      width={500}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Group Name" rules={[{ required: true, message: 'Please enter group name' }]}>
          <Input placeholder="e.g., Developers" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Describe the purpose of this group" />
        </Form.Item>
        <Form.Item name="color" label="Color Theme">
          <Select placeholder="Select color" size="large">
            <Select.Option value="red">🔴 Red</Select.Option>
            <Select.Option value="blue">🔵 Blue</Select.Option>
            <Select.Option value="green">🟢 Green</Select.Option>
            <Select.Option value="purple">🟣 Purple</Select.Option>
            <Select.Option value="orange">🟠 Orange</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;