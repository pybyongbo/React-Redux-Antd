import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Drawer, Space, message, Modal } from 'antd';
import EditCateForm from './component/courseTypeForm';

import {
    getCourseCateListAction,
    updateCourseCateAction,
    findCourseListByCateAction,
    deleteCourseCateAction,
} from '../actions';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const CourseCateList = (props) => {
    const { coursecateList, dispatch } = props;
    const [listloading, setListloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState({});

    const [editform] = Form.useForm();

    useEffect(() => {
        dispatch(getCourseCateListAction()).then(() => {
            setListloading(false);
        });
    }, []);

    const handleEditCourseTypeSubmit = () => {
        editform.validateFields().then((values) => {
            const postObj = {
                fieldName: values.title,
                id: values.id,
            };

            dispatch(updateCourseCateAction(postObj)).then((res) => {
                const { code, message: msg } = res;
                if (code === 0) {
                    message.success('更新课程分类成功');
                    // 关闭右侧抽屉表单
                    onClose();
                    // 重新请求获取课程分类数据.
                    dispatch(getCourseCateListAction()).then(() => {
                        setListloading(false);
                    });
                } else {
                    message.error(msg);
                }
            });
        });
    };

    const deleteItem = async (obj) => {
        setRecord(obj);
        const { result } = await tipsCourseListByCate({
            fieldType: obj.fieldType,
        });
        console.log(result);

        const params = Object.assign({}, obj, { ids: result.ids });

        console.log('params', params);

        const cids = JSON.stringify(result.ids);

        confirm({
            title: '你确定要删除该条数据吗?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <p>
                    该分类下面有<strong style={{ color: 'red' }}>{result?.listCount}</strong>
                    条课程数据,删除后,分类列表将不再展示该条数据.
                    <br />{' '}
                    {result?.listCount > 0 && (
                        <span style={{ color: 'red' }}>并且删除该分类下面的课程列表数据,{cids}</span>
                    )}
                </p>
            ),
            okText: '删除',
            okType: 'danger',
            centered: true,
            onOk() {
                return sureDeleteCourseCate(params);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const tipsCourseListByCate = async ({ fieldType }) => {
        const res = await dispatch(findCourseListByCateAction({ fieldType }));
        const { code, message: msg } = res;
        if (code != 0) {
            message.error(msg);
        }
        return res;
    };

    const sureDeleteCourseCate = async ({ id, ids }) => {
        const res = await dispatch(deleteCourseCateAction({ id, ids }));
        const { code, message: msg } = res;
        if (code === 0) {
            message.success('删除成功');
            dispatch(getCourseCateListAction());
        } else {
            message.error(msg);
        }
    };

    const onClose = () => {
        setVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '分类名称',
            dataIndex: 'fieldName',
            key: 'fieldName',
        },
        {
            title: '课程编码',
            dataIndex: 'fieldType',
            key: 'fieldType',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a
                        onClick={() => {
                            setRecord(record);
                            setVisible(true);
                        }}>
                        编辑
                    </a>
                    <a
                        onClick={() => {
                            deleteItem(record);
                        }}>
                        删除
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>课程分类列表</h2>
            <Table rowKey="id" bordered columns={columns} dataSource={coursecateList || []} loading={listloading} />

            <Drawer
                className="page-drawer"
                title="编辑课程分类"
                width={500}
                onClose={onClose}
                visible={visible}
                footerStyle={{
                    textAlign: 'right',
                }}
                footer={[
                    <Button key="cancle" type="default" onClick={() => onClose()} style={{ marginRight: 10 }}>
                        取消
                    </Button>,
                    <Button key="sure" type="primary" onClick={handleEditCourseTypeSubmit}>
                        保存
                    </Button>,
                ]}>
                <EditCateForm itemData={record} form={editform} />
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state) => ({
    coursecateList: state.courseCateList.cateList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CourseCateList);
