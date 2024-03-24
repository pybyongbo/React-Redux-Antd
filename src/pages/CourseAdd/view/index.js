import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Drawer, message } from 'antd';
import AddForm from './component/addCourseForm';
import CourseTypeForm from './component/courseTypeForm';
import { getCourseFieldListAction, addCourseItemAction, addCourseCateAction } from '../actions';
import './index.less';
const styleObj = {
    width: '90%',
    margin: '0 auto',
};
const CourseAdd = (props) => {
    const [form] = Form.useForm();
    const [typeform] = Form.useForm();

    const { coursefieldList, dispatch } = props;
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        dispatch(getCourseFieldListAction());
    }, []);

    const createCourse = useCallback((val) => {
        dispatch(addCourseItemAction(val));
        props.history.push('/tabcourse/list');
    }, []);

    const goToCourseList = useCallback(() => {
        console.log('props', props);
        props.history.push('/tabcourse/list');
    }, []);

    const onClose = () => {
        setVisible(false);
        typeform.resetFields();
    };

    const handleAddCourseTypeSubmit = () => {
        typeform.validateFields().then((values) => {
            const postObj = {
                fieldName: values.title,
                fieldType: values.fieldType,
            };

            dispatch(addCourseCateAction(postObj)).then((res) => {
                const { code, message: msg } = res;
                if (code === 0) {
                    message.success('新增课程分类成功');
                    // 关闭右侧抽屉表单
                    onClose();
                    // 重新请求获取课程分类数据.
                    dispatch(getCourseFieldListAction());
                } else {
                    message.error(msg);
                }
            });
        });
    };
    return (
        <div>
            <h3 style={styleObj}>
                新增课程
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={() => {
                        setVisible(true);
                    }}>
                    新增课程分类
                </Button>
            </h3>
            <AddForm
                form={form}
                coursefieldList={coursefieldList}
                createCourse={createCourse}
                goToCourseList={goToCourseList}
            />

            <Drawer
                className="page-drawer"
                title="新增课程分类"
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
                    <Button key="sure" type="primary" onClick={handleAddCourseTypeSubmit}>
                        保存
                    </Button>,
                ]}>
                <CourseTypeForm form={typeform} />
            </Drawer>
        </div>
    );
};

// export default CourseAdd;
const mapStateToProps = (state) => ({
    coursefieldList: state.courseAdd.coursefieldList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdd);
