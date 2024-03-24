import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Card, Input, Select, Form, InputNumber, Radio } from 'antd';
import moment from 'moment';

import styles from './index.less';

const IndexPage = (props) => {
    const [form] = Form.useForm();
    const { Item } = Form;
    const formlayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };

    const helpTypeList = [
        {
            id: 1,
            text: '固定金额',
            value: 1,
        },
        { id: 2, text: '固定比例', value: 2 },
        {
            id: 3,
            text: '随机立减',
            value: 3,
        },
    ];
    const [isMyself, setIsMyself] = useState(1);
    const [buyType, setBuyType] = useState(1);
    const changeType = (e) => {
        const val = e.target.value;
        setIsMyself(val);
    };

    const changeBuyType = (e) => {
        const val = e.target.value;
        setBuyType(val);
    };
    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    };

    const onFinish = (values) => {
        let startime = moment(values.startime).format('YYYY-MM-DD');
        let endtime = moment(values.endtime).format('YYYY-MM-DD');

        console.log('Success', {
            ...values,
            startime,
            endtime,
        });
    };
    return (
        <div className={styles.postList}>
            <h2>活动表单</h2>
            <div>
                <Form form={form} {...formlayout} labelAlign="right" onFinish={onFinish}>
                    <Card title="新增活动信息">
                        <Item
                            name="description"
                            label="活动名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入活动名称',
                                },
                            ]}>
                            <Input placeholder="请输入活动名称" showCount maxLength={40} />
                        </Item>
                        <Item
                            // name="expirencetime"
                            label="助力有效期"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入助力有效期',
                                },
                            ]}>
                            <Input.Group compact>
                                <Item name={['expirencetime', 'days']} noStyle>
                                    <Input
                                        type="number"
                                        // value={value.number || number}
                                        // onChange={onNumberChange}
                                        style={{
                                            width: 100,
                                        }}
                                    />
                                </Item>
                                <span style={{ display: 'inline-block', margin: '5px 6px' }}>天</span>
                                <Item name={['expirencetime', 'hours']} noStyle>
                                    <Input
                                        type="number"
                                        // value={value.number || number}
                                        // onChange={onNumberChange}

                                        style={{
                                            width: 100,
                                        }}
                                    />
                                </Item>
                                <span style={{ display: 'inline-block', margin: '5px 6px' }}>时</span>
                                <Item name={['expirencetime', 'mins']} noStyle>
                                    <Input
                                        type="number"
                                        // value={value.number || number}
                                        // onChange={onNumberChange}

                                        style={{
                                            width: 100,
                                        }}
                                    />
                                </Item>
                                <span style={{ display: 'inline-block', margin: '5px 6px' }}>分钟</span>
                            </Input.Group>
                        </Item>
                        <Item
                            name="startime"
                            label="活动开始时间"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择活动开始时间',
                                },
                            ]}>
                            <DatePicker format="YYYY-MM-DD " disabledDate={disabledDate} />
                        </Item>

                        <Item
                            name="endtime"
                            label="活动结束时间"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择活动结束时间',
                                },
                            ]}>
                            <DatePicker format="YYYY-MM-DD " disabledDate={disabledDate} />
                        </Item>

                        <Item name="buytype" label="购买方式" initialValue={1}>
                            <Radio.Group value={buyType} onChange={(e) => changeBuyType(e)}>
                                <Radio value={0}>是</Radio>
                                <Radio value={1}>否</Radio>
                            </Radio.Group>
                        </Item>

                        <Item name="isMyself" label="是否允许自己助力" initialValue={1}>
                            <Radio.Group value={isMyself} onChange={(e) => changeType(e)}>
                                <Radio value={0}>是</Radio>
                                <Radio value={1}>否</Radio>
                            </Radio.Group>
                        </Item>
                        <Item
                            name="studying"
                            label="助力人数"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入助力人数',
                                },
                            ]}>
                            <InputNumber placeholder="请输入助力人数" style={{ width: 320 }} min={1} />
                        </Item>

                        <Item
                            name="fieldType"
                            label="助力分类"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择助力类型',
                                },
                            ]}>
                            <Select
                                showSearch
                                placeholder="请选择助力类型"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {helpTypeList.map((item) => {
                                    return (
                                        <Option value={item.value} key={item.id}>
                                            {item.text}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Item>
                    </Card>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" style={{ marginTop: 30, marginRight: 10 }}>
                            提交
                        </Button>
                        <Button type="default" style={{ marginTop: 30 }}>
                            取消
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default IndexPage;
