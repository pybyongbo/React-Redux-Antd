import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Spin } from 'antd';
import { getCourseDetailAction } from '../actions';

// class ArticleDetail extends PureComponent {

//     render() {
//         console.log(this.props)
//         return (
//             <h1>页面Id:{this.props.match.params.id}</h1>
//         )
//     }

// }

// export default ArticleDetail

const ArticleDetail = (props) => {
    const { dispatch, articleDetailInfo, detailPageLoading } = props;
    // console.log('props detailPageLoading', detailPageLoading);
    const { id } = props.match.params;
    useEffect(() => {
        dispatch(getCourseDetailAction({ id }));
    }, []);

    const goToCourseList = () => {
        props.history.push({
            pathname: `/tabcourse/list`,
        });
    };

    const renderCourseType = (price) => {
        return price ? (
            <div>
                付费-¥<strong style={{ color: 'red' }}>{articleDetailInfo.price}</strong>元
            </div>
        ) : (
            <strong style={{ color: 'red' }}>免费</strong>
        );
    };

    return (
        <>
            <Spin spinning={detailPageLoading}>
                <div style={{ overflow: 'hidden', marginBottom: 30 }}>
                    <h1 style={{ float: 'left' }}>
                        {/* {JSON.stringify(detailPageLoading)} */}
                        页面Id:{props.match.params.id}
                    </h1>
                    <Button style={{ float: 'right' }} type="primary" onClick={goToCourseList}>
                        返回课程列表
                    </Button>
                </div>

                <p>标题:{articleDetailInfo.title}</p>
                <p>作者:{articleDetailInfo.author || '暂无'}</p>
                <p>上架时间:{moment(articleDetailInfo.createtime).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>
                    课程类型:
                    {/* {articleDetailInfo.price ? (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: `付费-¥<span style={color:'red'}>${articleDetailInfo.price}</span>元`,
                            }}></span>
                    ) : (
                        // '付费-¥ ' + <i style={{ color: 'red' }}>{${articleDetailInfo.price}}</i> + '元'
                        <strong style={{ color: 'red' }}>免费</strong>
                    )} */}
                    {renderCourseType(articleDetailInfo.price)}
                </p>
                <p>学习人数:{articleDetailInfo.studying}人</p>
                <p>
                    课程缩略图:
                    <img src={articleDetailInfo.thumb} style={{ width: 'auto', height: '200px' }} alt="" />
                </p>
                <p>课程描述:{articleDetailInfo.description || <span style={{ color: 'red' }}>暂无课程简介</span>}</p>
                <br />
                <div dangerouslySetInnerHTML={{ __html: articleDetailInfo.content }}></div>
            </Spin>
        </>
    );
};

// export default ArticleDetail;

const mapStateToProps = (state) => ({
    articleDetailInfo: state.articleDetail.courseDetailInfo,
    detailPageLoading: state.articleDetail.detailPageLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
