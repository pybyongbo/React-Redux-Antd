import React, { PureComponent } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Card } from 'antd';
import { useDynamicList } from '@umijs/hooks';
const { Option } = Select;
const { TextArea } = Input;

const FormCard = ({ index, name, add, remove }) => {
  const { Item } = Form;

  return (
    <React.Fragment>
      <Item name={[index, 'input1']} label="动态Input1">
        <Input style={{width:'60%'}}/>
      </Item>
      <Item name={[index, 'input2']} label="动态Input2">
        <Input style={{width:'60%'}}/>
      </Item>

      { index===0 && <Button type="primary" onClick={() => add()}>添加</Button>}

      { index>0 &&  <Button type="default" onClick={() => remove(name)}>
          移除
        </Button>
      }


    </React.Fragment>
  );
};

// class ArticleAdd extends PureComponent {

//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     };

//     formReset = () =>{
//         this.props.form.resetFields();
//     }

//     render() {
//         // const { getFieldDecorator } = this.props.form;
//         const formItemLayout = {
//             labelCol: {
//                 span: 2,
//             },
//             wrapperCol: {
//                 span: 16
//             },
//         };
//         return (
//             <Row >
//                 <Col span={16} >
//                     <Card title="动态表单测试">
//                         <Form  {...formItemLayout}>
//                             <Form.Item label="发布人">

//                                     <Input
//                                         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                         placeholder="请输入发布作者"
//                                         allowClear
//                                         style={{ width: '100%' }}
//                                     />

//                             </Form.Item>

//                             <Form.Item label="文章类型">

//                                     <Select placeholder="请选择文章类型">
//                                         <Option value="0">原创</Option>
//                                         <Option value="1">转载</Option>
//                                     </Select>

//                             </Form.Item>

//                             <Form.Item label="文章内容">

//                                     <TextArea rows={4} />

//                             </Form.Item>

//                             <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
//                             <Button type="primary" onClick={this.handleSubmit}>
//                                 Submit
//                             </Button>

//                             <Button type="default" onClick={this.formReset} style={{ marginLeft: 20 }}>
//                                 Reset
//                             </Button>
//                         </Form.Item>
//                         </Form>



//                     </Card>
//                 </Col>
//             </Row>

//         )
//     }

// }

export default function App() {
  const [form] = Form.useForm();
  const { list, remove, getKey, push } = useDynamicList([{ input1: '', input2: '' }]);
  // const { list, remove, getKey, push } = useDynamicList(['David', 'Jack']);

  const initialValues = {
    basic: 'basic value',
    inputs: [
      {
        input1: 'Hello, World',
        input2: 'Hello, JavaScript'
      }
    ],
    dynamic: [{ input1: 'Hello, Hooks', input2: 'Hello, umi' }]
  };
  const { Item } = Form;

  const onFinish = (values)=>{

    console.log(values)
  }

  return (
    <div style={{ width: '80%', margin: '50px auto' }}>
      <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      >
        <Item name="basic" label="基础Input">
          <Input />
        </Item>
        <Card title="Form.List实现动态列表">
          <Form.List name="inputs">
            {(fields, { add, remove }) =>
              fields.map((item, index) => (
                <FormCard {...item} index={index} add={add} remove={remove} />
              ))
            }
          </Form.List>
        </Card>
        <Card title="useDynamicList实现动态列表" style={{ marginTop: 24 }}>
          <Form.List name="dynamic">
            {() =>
              list.map((ele, index) => (
                <FormCard
                  {...ele}
                  key={getKey(index)}
                  index={getKey(index)}
                  add={() => push({ input1: '', input2: '' })}
                  remove={() => remove(getKey(index))}
                />
              ))
            }
          </Form.List>


        </Card>
        <Form.Item>
            <Button type="primary" htmlType="submit" block style={{marginTop:30}}>
              submit
            </Button>
          </Form.Item>
      </Form>
    </div>
  );
}
