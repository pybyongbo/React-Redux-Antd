import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Tooltip, message, Divider } from 'antd';
import { getPostList } from '../actions';
import styles from './postList.less';

class ArticleList extends PureComponent {
    state = {
        current: 1,
        pageSize: 10,
        searchObj: {
            name: '',
            startOrderDate: '',
            endOrderDate: ''
        }
    };
    componentDidMount() {
        console.log('this.props',this.props)
        this.filterPostList({});
    }

    filterPostList = (obj) => {
        const { dispatch } = this.props;
        dispatch(getPostList({page:obj.page||1,pageSize:obj.pageSize||10 }));
    };

    onChangePagination = newPage => {

        console.log(newPage);
        this.setState({
            current:newPage
        })
        this.filterPostList({
               page:newPage
        })
    };

    onShowSizeChange = (current, size) => {
        // this.fetchData(current, size);
        this.filterPostList({
            page: current,
            pageSize:size
        })
        this.setState({
            current:1,
            pageSize: size
        }, () => {
            console.log(current, size);
        });
    };

    render() {
        const { postList, total, fetchListPending } = this.props;
        const {current,pageSize} = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => (current - 1) * pageSize + (index + 1)
            },
            {
                title: '文章标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '发布作者',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '发布时间',
                dataIndex: 'moment',
                key: 'moment',
                width: 250
            },

            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width:120,
                render:(text,record)=>{
                    return (
                        <Link to={`/article/detail/${record.id}`}>查看详情</Link>
                    )
                }
            },

        ]

        return (
            <div className={styles.postList}>

                <h2>koa博客接口测试</h2>

                <Divider dashed />

                <Table
                    className="mo-table"
                    rowKey="id"
                    columns={columns}
                    // dataSource={postList.data || []}
                    dataSource={postList|| []}

                    loading={fetchListPending}
                    pagination={{
                        current,
                        total,
                        // showTotal: this.showTotal,
                        // size: 'small',
                        showSizeChanger: true,
                        onChange: this.onChangePagination,
                        onShowSizeChange: this.onShowSizeChange
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state =>{
  debugger
  return {
    postList:state.postList.postList
  }
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);
