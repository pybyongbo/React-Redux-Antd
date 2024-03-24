import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'antd';
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
    const { dispatch, articleDetailInfo } = props;
    const { id } = props.match.params;
    useEffect(() => {
        dispatch(getCourseDetailAction({ id }));
    }, []);

    const goToCourseList = () => {
        props.history.push({
            pathname: `/tabcourse/list`,
        });
    };

    return (
        <>
            <div style={{ overflow: 'hidden', marginBottom: 30 }}>
                <h1 style={{ float: 'left' }}>页面Id:{props.match.params.id}</h1>
                <Button style={{ float: 'right' }} type="primary" onClick={goToCourseList}>
                    返回课程列表
                </Button>
            </div>

            <p>标题:{articleDetailInfo.title}</p>
            <p>作者:{articleDetailInfo.author}</p>
            <p>上架时间:{moment(articleDetailInfo.createtime).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>
                课程类型:
                {articleDetailInfo.price ? (
                    `付费-${articleDetailInfo.price}元`
                ) : (
                    <strong style={{ color: 'red' }}>免费</strong>
                )}
            </p>
            <p>学习人数:{articleDetailInfo.studying}</p>
            <p>
                课程缩略图:
                <img src={articleDetailInfo.thumb} style={{ width: 'auto', height: '200px' }} alt="" />
            </p>
            <p>课程描述:{articleDetailInfo.description || <span style={{ color: 'red' }}>暂无课程简介</span>}</p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: articleDetailInfo.content }}></div>
        </>
    );
};

// export default ArticleDetail;

const mapStateToProps = (state) => ({
    // coursefieldList: state.courseAdd.coursefieldList,
    articleDetailInfo: state.articleDetail.courseDetailInfo,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
