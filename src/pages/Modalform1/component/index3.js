import React, { createRef} from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';


const App = (props) => {

  const formRef = createRef();

  const { visibleform3,handleCloseDialog3,handSubmitform3 } = props;

  const handleModalOkClick = () =>{

    // console.log(formRef.current.validateFields)
    if(formRef.current.validateFields()) {
      const values = formRef.current.getFieldsValue();
      console.log('values',values);

      handSubmitform3(values);
    }

  }

  // const onFinish = (values) => {
  //   handSubmitform2(values)
  //   formRef.current.submit(values)
  //   console.log('formRef',formRef);
  // }

  return (

    <Modal
      title="弹框测试3"
      visible={visibleform3}
      bodyStyle={{ padding: '30px 60px 10px 40px' }}
      centered
      destroyOnClose={true}
      onOk={handleModalOkClick}
      onCancel={handleCloseDialog3}
    >

      <Form
        ref = {formRef}
        labelAlign="right"
        labelCol={{span:4}}
        // onFinish={onFinish}
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

        {/* <Form.Item
          style={{textAlign:'right'}}
          >
          <Button onClick={handleCloseDialog3} style={{marginRight:10}}>取消</Button>
          <Button  type="primary" htmlType="submit">确认</Button>

        </Form.Item> */}

      </Form>
    </Modal>
  );
}
export default App;
