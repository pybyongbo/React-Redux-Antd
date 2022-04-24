import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import CourseField from './component/CourseField';
import CourseList from './component/CourseList';

import { getCourseFieldListAction, getCourseListAction, changeCourseFieldAction } from '../actions';

const { Search } = Input;

const CourseTabList = (props) => {
  const { curField, coursefieldList, courseList, dispatch } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const pcourseFile = dispatch(getCourseFieldListAction());
    const pcouurseFieldList = dispatch(getCourseListAction());

    Promise.all([pcourseFile, pcouurseFieldList]).then((res) => {
      setLoading(false);
      // console.log('props',props);
    })
  }, []);

  const changeCourseField = (field) => {
    dispatch(changeCourseFieldAction(field));
  }

  const searchByKewWords = (keywords) => {

    console.log(keywords);
    dispatch(getCourseListAction({
      field: -1,
      keywords: keywords
    }));
  }

  return (
    <div className='list-wrapper'>
      <h1>React+Redux+Antd实现课程列表:<span style={{ marginLeft: 5, color: 'red', fontSize: 12 }}>需要开启本地后端服务才能看到效果</span></h1>

      <Search
        placeholder="请输入关键词进行搜索"
        onSearch={searchByKewWords}
        allowClear style={{ width: 520 }} />

      <br /><br />
      <Spin spinning={loading}>
        <CourseField
          curField={curField}
          fieldData={coursefieldList || []}
          changeCourseField={changeCourseField}
        />

        <CourseList
          curField={curField}
          fieldData={coursefieldList || []}
          listData={courseList || []}
        />
      </Spin>
    </div>
  );
};

const mapStateToProps = state => ({
  curField: state.courseList.curField,
  coursefieldList: state.courseList.coursefieldList,
  courseList: state.courseList.courseList
  // ...state.courseList
});

const mapDispatchToProps = dispatch => ({ dispatch })

// export default CourseTabList;
export default connect(mapStateToProps, mapDispatchToProps)(CourseTabList);
