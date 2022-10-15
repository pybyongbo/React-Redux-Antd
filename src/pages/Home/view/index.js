import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Table, Tooltip, message, Divider, Card } from 'antd';
import styles from './index.less';

class IndexPage extends PureComponent {

    render() {

        return (
            <div className={styles.postList}>

                <h2>前端路由与菜单</h2>
                {/* <Divider dashed /> */}
                <Row className={styles.list} gutter={30}>
                    <Col span={12} >
                        <Card title="配置菜单生成路由">
                            <ul>
                                <li>1.一级菜单,二级菜单展示</li>
                                <li>2.页面菜单对应高亮显示</li>
                                <li>3.菜单对应的Icon图表配置</li>
                                <li>4.Redux的学习和实用</li>
                                <li>5.webpack的代理配置(接口请求)</li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="页面组件懒加载">
                            <ul>
                                <li>1.页面路由匹配</li>
                                <li>2.详情页面路由高亮列表菜单</li>
                                <li>3.菜单Icon灵活配置,路由管理</li>
                                <li>4.分页列表reducer中初始化</li>
                                <li>5.后端Koa和Ajax的json数据格式传递</li>
                            </ul>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default IndexPage;

// const mapStateToProps = state => ({
//     ...state.postList
// });

// const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(IndexPage);
