import React, { createRef } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';


const PageDrawer = (props) => {

  // const formRef = createRef();

  const { onHandleSubmit } = props;

  // const handleModalOkClick = () =>{

  //   // const values = formRef.current.getFieldsValue();
  //   // console.log('values',values);

  //   handSubmitform4(values);
  // }

  // const onFinish = (values) => {
  //   handSubmitform4(values);
  // }

  return (

    <Form
      id="myDrawerForm"
      labelAlign="right"
      labelCol={{ span: 4 }}
      onFinish={onHandleSubmit}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '必填'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: '必填',
            type: 'email'
          }
        ]}
      >
        <Input />
      </Form.Item>

    </Form>

  );
}
export default PageDrawer;
