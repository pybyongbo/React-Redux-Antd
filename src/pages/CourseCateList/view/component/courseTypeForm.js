import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Form, Button, InputNumber } from 'antd';

const EditCourseTypeForm = (props) => {
  const { form, itemData } = props;
  const { Item } = Form;
  const formlayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    form.setFieldsValue({
      title: itemData.fieldName,
      ...itemData
    })
  })

  return (
    <div style={{ width: '100%', margin: '20px auto' }}>
      <Form
        form={form}
        {...formlayout}
      >
        <Item name="id" label="课程ID" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Item>
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
          <InputNumber style={{ width: '100%' }} disabled />
        </Item>

      </Form>
    </div>
  );
};

export default EditCourseTypeForm;
