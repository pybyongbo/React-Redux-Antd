import React from 'react';
import { Empty, Pagination, List, Card, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import CourseItem from './listItem';
import { filterData } from 'utils/utils';
import './index.less';
import moment from 'moment';
const CourseList = (props) => {
    const { curField, listData, currentPage, total, showType, onPaginationChange } = props;

    const gotoDetail = (id) => {
        console.log(props);
        props.history.push({
            pathname: `/article/detail/${id}`,
        });
    };

    return (
        <div className="field-wrapper">
            {showType === 'list' && (
                <>
                    <ul className="course-list">
                        {listData && listData.length > 0 && filterData(listData, curField).length > 0 ? (
                            filterData(listData, curField)?.map((item, index) => {
                                return <CourseItem key={index} item={item} gotoDetail={() => gotoDetail(item.id)} />;
                            })
                        ) : (
                            <Empty
                                style={{ padding: 150, color: '#555', height: 474 }}
                                description="没有搜索到相关数据"
                            />
                        )}
                    </ul>
                    <div className="pagelist">
                        <Pagination
                            current={currentPage}
                            total={total}
                            showSizeChanger={true}
                            hideOnSinglePage={true}
                            onChange={onPaginationChange}
                            showTotal={(total, range) => `第${range[0]}-${range[1]}条/共${total}条数据`}
                        />
                    </div>
                </>
            )}

            {showType === 'card' && (
                <ul className="course-list">
                    <List
                        grid={{ gutter: 10, column: 5 }}
                        dataSource={filterData(listData, curField)}
                        // pagination={{
                        //   hideOnSinglePage: true,
                        //   onChange: (page) => {
                        //     console.log(page);
                        //   },
                        //   pageSize: 10,

                        // }}
                        locale={{
                            emptyText: (
                                <Empty
                                    style={{ padding: 150, color: '#555', height: 450 }}
                                    description="没有搜索到相关数据"
                                />
                            ),
                        }}
                        renderItem={(item) => (
                            <List.Item onClick={() => gotoDetail(item.id)}>
                                <Card
                                    title={
                                        item.title.length > 20 ? (
                                            <Tooltip title={item.title} placement="top">
                                                {item.id}--{item.title}
                                            </Tooltip>
                                        ) : (
                                            item.id + '--' + item.title
                                        )
                                    }
                                    actions={[
                                        <EyeOutlined key="see" />,
                                        <EditOutlined key="edit" />,
                                        <span style={{ fontSize: 12 }}>
                                            {moment(item.createtime).format('MM/DD HH:mm')}
                                        </span>,
                                    ]}>
                                    <img
                                        src={item.thumb}
                                        alt={item.title}
                                        className="cover-img"
                                        style={{ marginBottom: 6, width: '170px', height: '95px' }}
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
                    <div className="pagelist">
                        <Pagination
                            current={currentPage}
                            total={total}
                            showSizeChanger={true}
                            onChange={onPaginationChange}
                            hideOnSinglePage={true}
                            showTotal={(total, range) => `第${range[0]}-${range[1]}条/共${total}条数据`}
                        />
                    </div>
                </ul>
            )}
        </div>
    );
};

// export default CourseList;

const mapStateToProps = (state) => ({
    // coursefieldList: state.courseAdd.coursefieldList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
