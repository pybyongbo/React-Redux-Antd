import React, { PureComponent } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';



const App = (props) => {

  const { visibleform1,handleCloseDialog1,handSubmitform1 } = props;
  const onFinish = (values) => {
    handSubmitform1(values)
  }

  return (

    <Modal
      title="弹框测试1"
      visible={visibleform1}
      bodyStyle={{ padding: '30px 60px 10px 40px' }}
      centered
      destroyOnClose={true}
      onCancel={handleCloseDialog1}
      okButtonProps={{htmlType: 'submit', form: 'editForm'}}
    >

      <Form
        id="editForm"
        labelAlign="right"
        labelCol={{span:4}}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
           {required:true,
          message:'必填'}
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
}
export default App;
