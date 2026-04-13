import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const CreateUserModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(`User ${values.username} created successfully`);
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New User"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit} icon={<UserAddOutlined />}>
          Create User
        </Button>,
      ]}
      width={500}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter username' }]}>
          <Input placeholder="johndoe" size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Invalid email' }]}>
          <Input placeholder="john@example.com" size="large" />
        </Form.Item>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
          <Input placeholder="John Doe" size="large" />
        </Form.Item>
        <Form.Item name="groups" label="Assign to Groups">
          <Select mode="multiple" placeholder="Select groups" size="large">
            <Select.Option value="developers">Developers</Select.Option>
            <Select.Option value="admins">Admins</Select.Option>
            <Select.Option value="clients">Clients</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;