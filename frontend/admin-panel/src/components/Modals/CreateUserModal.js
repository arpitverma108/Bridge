const handleSubmit = async () => {
  try {
    const values = await form.validateFields();
    setLoading(true);

    // 🔥 SEND ONLY REQUIRED DATA
    onSuccess({
      username: values.username,
      password: values.password
    });

    form.resetFields();

  } catch (error) {
    message.error('Failed to create user');
  } finally {
    setLoading(false);
  }
};