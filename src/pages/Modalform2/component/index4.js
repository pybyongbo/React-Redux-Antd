import React, { createRef} from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';



const App = (props) => {

  const formRef = createRef();

  const { visibleform4,handleCloseDialog4,handSubmitform4 } = props;

  // const handleModalOkClick = () =>{

  //   // const values = formRef.current.getFieldsValue();
  //   // console.log('values',values);

  //   handSubmitform4(values);
  // }

  const onFinish = (values) =>{
    handSubmitform4(values);
  }

  return (

    <Modal
      title="弹框测试4"
      visible={visibleform4}
      bodyStyle={{ padding: '30px 60px 10px 40px' }}
      centered
      destroyOnClose={true}
      onCancel={handleCloseDialog4}
      footer={[
        <Button type="primary" form="myForm" key="submit" htmlType="submit">
            确认
        </Button>,
        <Button key="cancel" onClick={handleCloseDialog4}>
            取消
        </Button>
        ]}
    >

      <Form

        id="myForm"
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
