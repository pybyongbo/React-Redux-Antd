import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getDetailInfoAction } from '../actions';
class ArticleDetail extends PureComponent {

    state = {
        id: this.props.match.params.id,
    };

    componentDidMount() {
        this.getDetailInfo();
    }


    getDetailInfo = () => {
        const { dispatch } = this.props;
        const { id } = this.state;
        dispatch(getDetailInfoAction({ id }));
    }

    render() {
        const { detailObj } = this.props;
        return (
            <div style={{minHeight:650}}>
                <h1>详情Id:{this.props.match.params.id}</h1>
                <br/>
                <br/>
               
                <strong>详情内容:</strong>
                <br/>
                {
                    detailObj && 

                    <p dangerouslySetInnerHTML = {{ __html:detailObj.content }}></p>
                }
            </div>

        )
    }

}

const mapStateToProps = state => ({
    ...state.articleDetailinfo
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetail);

// export default ArticleDetail