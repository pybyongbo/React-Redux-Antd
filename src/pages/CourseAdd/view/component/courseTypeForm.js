import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Form, Button, InputNumber } from 'antd';

const { Option } = Select;
const AddCourseForm = (props) => {
  const { form, createCourse } = props;

  const { Item } = Form;
  const formlayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  useEffect(() => { }, []);


  // const onFinish = () => {
  //   form.validateFields().then(val => {
  //     const { isFree } = val;
  //     const postObj = isFree === 0 ? {
  //       ...val,
  //       price: 0
  //     } : {
  //       ...val
  //     }
  //     createCourse(postObj);
  //   })
  // }


  return (
    <div style={{ width: '100%', margin: '20px auto' }}>
      <Form
        form={form}
        {...formlayout}
        // onFinish={onFinish}
      >

        <Item name="title" label="课程分类" rules={[
          {
            required: true,
            message: '请输入课程分类',
          }
        ]}>
          <Input placeholder="请输入课程分类" showCount maxLength={20} />
        </Item>
        <Item
          name="fieldType"
          label="课程分类CODE"
          rules={[
            {
              required: true,
              message: '请输入课程分类CODE',
            }
          ]}
        >
          <InputNumber style={{width:'100%'}} placeholder="请输入正整数即可"/>
        </Item>

      </Form>
    </div>
  );
};

export default AddCourseForm;
