import React from 'react';
import { Empty, Pagination, List, Card, Tooltip } from 'antd';
import CourseItem from './listItem';
import { filterData } from 'utils/utils';
import './index.less';
const CourseList = (props) => {
  const { curField, listData, showType } = props;

  return (
    <div className="field-wrapper">
      {showType === 'list' && <ul className="course-list">
        {listData && listData.length > 0 && filterData(listData, curField).length > 0
          ? filterData(listData, curField)?.map((item, index) => {
            return <CourseItem key={index} item={item} />;
          })
          : (
            <Empty
              style={{ padding: 150, color: '#555', height: 474 }}
              description="没有搜索到相关数据"
            />
          )}
      </ul>}

      {showType === 'card' && (
        <ul className="course-list">
          <List
            grid={{ gutter: 10, column: 5 }}
            dataSource={filterData(listData, curField)}
            pagination={{
              hideOnSinglePage: true,
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,

            }}
            locale={{
              emptyText: <Empty
                style={{ padding: 150, color: '#555', height: 450 }}
                description="没有搜索到相关数据"
              />
            }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={
                    item.title.length > 20 ? (
                      <Tooltip title={item.title} placement="top">
                        {item.title}
                      </Tooltip>
                    ) : (
                      item.title
                    )
                  }>
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="cover-img"
                    style={{ marginBottom: 6, width: '100%' }}
                  />
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
        </ul>
      )}
    </div>
  );
};

export default CourseList;
