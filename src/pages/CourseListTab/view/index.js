import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import CourseField from './component/CourseField';
import CourseList from './component/CourseList';
import './index.less';
import {
    getCourseFieldListAction,
    getCourseListAction,
    // changeCourseFieldAction,
    changeShowTypeAction,
} from '../actions';

const { Search } = Input;

const CourseTabList = (props) => {
    // console.log('courseListTab props: ', props);
    const { curField, coursefieldList, courseList, current, total, showType, dispatch, courseListLoading } = props;
    // const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [searchObj, setSearchObj] = useState({});
    useEffect(() => {
        const pcourseFile = dispatch(getCourseFieldListAction());
        const pcouurseFieldList = dispatch(
            getCourseListAction({
                field: -1,
                ...searchObj,
                page: 1,
                pageSize: pageSize,
            })
        );

        Promise.all([pcourseFile, pcouurseFieldList]).then((res) => {
            // setLoading(false);
            console.log(res);
        });
    }, []);

    const changeCourseField = (field) => {
        // dispatch(changeCourseFieldAction(field)); // 前端过滤

        // 更新为接口调用
        dispatch(
            getCourseListAction({
                field: field,
                ...searchObj,
                page: 1,
                pageSize: pageSize,
            })
        );
    };

    const changeShowType = (type) => {
        dispatch(changeShowTypeAction(type));
    };

    const searchByKewWords = (keywords) => {
        console.log(keywords);
        setSearchObj({ keywords });
        dispatch(
            getCourseListAction({
                field: curField,
                keywords: keywords,
                page: 1,
                pageSize: pageSize,
            })
        );
    };

    // 切换分页操作
    const onPaginationChange = (pageNum, pageSize) => {
        setPageSize(pageSize);
        dispatch(
            getCourseListAction({
                field: curField,
                ...searchObj,
                page: pageNum,
                pageSize: pageSize,
            })
        );
    };

    // 切换分页操作
    // const onShowSizeChange = (current, pageSize) => {
    //   console.log('pageSize', pageSize);
    //   dispatch(
    //     getCourseListAction({
    //       field: -1,
    //       // keywords: keywords,
    //       page: current,
    //       pageSize: pageSize
    //     })
    //   );
    // }

    return (
        <div className="list-wrapper">
            <h1>
                {/* {JSON.stringify(courseListLoading)} */}
                React+Redux+Antd实现课程列表:
                <span style={{ marginLeft: 5, color: 'red', fontSize: 12 }}>需要开启本地后端服务才能看到效果</span>
            </h1>

            <Search placeholder="请输入关键词进行搜索" onSearch={searchByKewWords} allowClear style={{ width: 520 }} />

            <br />
            <br />
            <Spin spinning={courseListLoading}>
                <CourseField
                    curField={curField}
                    fieldData={coursefieldList || []}
                    changeCourseField={changeCourseField}
                    changeShowType={changeShowType}
                    showType={showType}
                />

                <CourseList
                    curField={curField}
                    fieldData={coursefieldList || []}
                    listData={courseList || []}
                    total={total || 0}
                    showType={showType}
                    currentPage={current}
                    onPaginationChange={onPaginationChange}
                    {...props}
                    // onShowSizeChange={onShowSizeChange}
                />
            </Spin>
        </div>
    );
};

const mapStateToProps = (state) => ({
    curField: state.courseList.curField,
    coursefieldList: state.courseList.coursefieldList,
    courseList: state.courseList.courseList,
    total: state.courseList.total,
    courseListLoading: state.courseList.courseListLoading,
    current: state.courseList.current,
    showType: state.courseList.showType,
    // ...state.courseList
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

// export default CourseTabList;
export default connect(mapStateToProps, mapDispatchToProps)(CourseTabList);
