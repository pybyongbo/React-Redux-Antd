import React from 'react';
import { Empty, Pagination, List, Card, Tooltip } from 'antd';
import CourseItem from './listItem';
import { filterData } from 'utils/utils';
import './index.less';
const CourseList = (props) => {
  const { curField, listData, fieldData } = props;

  return (
    <div className="field-wrapper">
      <ul className="course-list">
        {/* {JSON.stringify(filterData(listData, curField).length>0)} */}
        {/* {
          listData && listData.length > 0 && filterData(listData, curField).length > 0 ? filterData(listData, curField)?.map((item, index) => {
            return (
              <CourseItem
                key={index}
                item={item}
              />
            )
          })
            :
            <Empty style={{ marginTop: 30, padding: 150, color: '#555' }} description="没有搜索到相关数据" />
        } */}
      </ul>

      <List
        grid={{ gutter: 10, column: 5 }}
        dataSource={filterData(listData, curField)}
        pagination={{
          hideOnSinglePage: true,
          onChange: page => {
            console.log(page)
          },
          pageSize: 10,
          // showSizeChanger: true,
          // pageSizeOptions: ['5', '10']
        }}
        renderItem={(item) => (
          <List.Item>
            <Card
              bodyStyle={{ paddingBottom: 50 }}
              title={item.title.length > 20 ? <Tooltip
                title={item.title}
                placement="top"
              >{item.title}</Tooltip> : item.title}>
              <img src={item.thumb} alt={item.title} className="cover-img" style={{ marginBottom: 6, width: '100%' }} />
              {/* <h1 className="course-tt">
                <a className="course-lk">
                  {item.title}
                </a>
              </h1> */}
              <div
                className={['price', item.price === 0 ? 'free' : ''].join(' ')}
                style={{ float: 'left' }}>
                {item.price === 0 ? '免费' : `￥${item.price}.00`}
              </div>
              <div className="studyNum" style={{ float: 'right' }}>
                {item.studying}人在学习
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* <Pagination
        defaultCurrent={1}
        pageSizeOptions={['5', '10']}
        pageSize={'5'}
        total={filterData(listData, curField).length}
      /> */}
    </div>
  );
};

export default CourseList;
