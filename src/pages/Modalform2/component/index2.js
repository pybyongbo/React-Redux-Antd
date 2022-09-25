import React, { PureComponent } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';

const App = (props) => {
  const { visibleform2,handleCloseDialog2,handSubmitform2 } = props;

  const onFinish = (values) => {
    handSubmitform2(values)
  }

  return (

    <Modal
      title="弹框测试2"
      visible={visibleform2}
      bodyStyle={{ padding: '30px 60px 10px 40px' }}
      centered
      destroyOnClose={true}
      onCancel={handleCloseDialog2}
      footer={null}
    >

      <Form
        // form={form}
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

        <Form.Item
          style={{textAlign:'right'}}
          >
          <Button onClick={handleCloseDialog2} style={{marginRight:10}}>取消</Button>
          <Button  type="primary" htmlType="submit">确认</Button>

        </Form.Item>

      </Form>
    </Modal>
  );
}
export default App;
