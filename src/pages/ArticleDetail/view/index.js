import React, { PureComponent } from 'react';

class ArticleDetail extends PureComponent {


    render() {
        console.log(this.props)
        return (
            <h1>页面Id:{this.props.match.params.id}</h1>
        )
    }

}

export default ArticleDetail