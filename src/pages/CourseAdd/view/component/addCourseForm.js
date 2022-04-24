import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Form, Button, InputNumber, Radio } from 'antd';

const { Option } = Select;
const AddCourseForm = (props) => {
    const { form, coursefieldList,createCourse } = props;
    const { Item } = Form;
    const formlayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 },
    };
    const [couseType, setCouseType] = useState(1);
    useEffect(() => {}, []);

    const changeType = (e) => {
        const val = e.target.value;
        console.log(val);
        setCouseType(val);
    };
    const onFinish = () =>{
      form.validateFields().then(val=>{
        const {isFree} = val;
        const postObj = isFree===0?{
          ...val,
          price:0
        }:{
          ...val
        }
        createCourse(postObj);
      })

    }

    const goToCourseList = () =>{
      props.goToCourseList();
    }
    return (
        <div style={{ width: '80%', margin: '50px auto' }}>
            <Form
                form={form}
                {...formlayout}
                onFinish={onFinish}
            >
                <Card title="新增课程信息">
                    <Item name="title" label="课程标题" rules={[
                      {
                        required: true,
                        message: '请输入课程标题',
                      }
                    ]}>
                        <Input placeholder="请输入课程标题" showCount maxLength={200} />
                    </Item>
                    <Item
                    name="fieldType"
                    label="课程分类"
                    rules={[
                      {
                        required: true,
                        message: '请选择课程分类',
                      }
                    ]}
                    >
                        <Select
                            showSearch
                            placeholder="请选择课程分类"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {coursefieldList &&
                                coursefieldList.length > 0 &&
                                coursefieldList.map((item) => {
                                    return (
                                        <Option value={item.fieldType} key={item.id}>
                                            {item.fieldName}
                                        </Option>
                                    );
                                })}
                        </Select>
                    </Item>
                    <Item
                    name="thumb"
                    label="课程缩略图"
                    rules={[
                      {
                        required: true,
                        message: '请输入课程缩略图',
                      }
                    ]}
                    >
                        <Input placeholder="请输入课程缩略图" />
                    </Item>
                    <Item name="isFree" label="是否免费" initialValue={1}>
                        <Radio.Group value={couseType} onChange={(e) => changeType(e)}>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                        </Radio.Group>
                    </Item>
                    {couseType == 1 && (
                        <Item
                            shouldUpdate={(prevValues, curValues) => prevValues.isFree !== curValues.isFree}>
                            {({ getFieldValue }) => {
                                const type = getFieldValue('isFree');
                                console.log('type', type);
                                switch (type) {
                                    case 0:
                                        return null;
                                    case 1:
                                        return (
                                            <div style={{ marginLeft:22 }}>
                                                <Item
                                                label="课程价格"
                                                name="price"
                                                rules={[
                                                  {
                                                    required: couseType == 1?true:false,
                                                    message: '请输入课程价格',
                                                  }
                                                ]}
                                                >
                                                    <Input placeholder="请输入课程价格" style={{width:320}} prefix="￥" suffix="RMB" />
                                                </Item>
                                            </div>
                                        );
                                }
                            }}
                        </Item>
                    )}
                    <Item
                    name="studying"
                    label="学习人数"
                    rules={[
                      {
                        required: true,
                        message: '请输入学习人数',
                      }
                    ]}
                    >
                        <InputNumber placeholder="请输入学习人数" style={{width:320}} min={1} />
                    </Item>
                </Card>
                <Form.Item style={{textAlign:'right'}}>
                    <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: 30,marginRight:10 }}>
                        提交
                    </Button>
                    <Button
                    type="default"
                    onClick={goToCourseList}
                    style={{ marginTop: 30 }}>
                        返回课程列表
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCourseForm;
