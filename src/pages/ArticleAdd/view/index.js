import React, { PureComponent } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Card } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class ArticleAdd extends PureComponent {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    formReset = () =>{
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 16
            },
        };
        return (
            <Row >
                <Col span={16} >
                    <Card title="新增文章">
                        <Form  {...formItemLayout}>
                            <Form.Item label="发布人">
                                {getFieldDecorator('username', {
                                    // rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入发布作者"
                                        allowClear
                                        style={{ width: '100%' }}
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item label="文章类型">
                                {getFieldDecorator('type', {
                                    // rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Select placeholder="请选择文章类型">
                                        <Option value="0">原创</Option>
                                        <Option value="1">转载</Option>
                                    </Select>,
                                )}
                            </Form.Item>

                            <Form.Item label="文章内容">
                                {getFieldDecorator('content', {
                                    // rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea rows={4} />
                                )}
                            </Form.Item>
                        </Form>

                        <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                            <Button type="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>

                            <Button type="default" onClick={this.formReset} style={{ marginLeft: 20 }}>
                                Reset
                            </Button>
                        </Form.Item>

                    </Card>
                </Col>
            </Row>

        )
    }

}

export default Form.create({})(ArticleAdd)