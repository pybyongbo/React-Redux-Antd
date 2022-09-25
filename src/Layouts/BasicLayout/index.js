import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { Layout, Card, Input, Button } from 'antd';
import NotFound from '../../pages/Exception/404';
import Menu from "./Menu";
import Breadcrumb from './Breadcrumb';
import { actions as globalActions } from '../../global/index';
import { getRoutes } from '../../utils/utils';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,

} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {

  handleMenuCollapse = (collapsed) => {
    const { dispatch } = this.props;
    dispatch(
      globalActions.updateLayoutCollapsed({
        collapsed: !collapsed
      })
    )
  }

  render() {
    const { menus, routes, location, match, collapsed } = this.props;
    console.log('collapsed', collapsed)
    return (
      <Layout style={{
        height: '100vh'
      }}>
        <Sider style={{
          overflow: 'auto',
          height: '100%',
          position: 'fixed',
          left: 0
        }}
          collapsed={collapsed}
        // onCollapse={() => this.handleMenuCollapse(collapsed)}
        >
          <Menu menus={menus} location={location} />
          {/* <Button onClick={() => this.handleMenuCollapse(collapsed)}>测试</Button> */}
          <Button
            onClick={() => this.handleMenuCollapse(collapsed)}
            style={{
              position: 'absolute',
              bottom: 30,
              left: 20
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Sider>
        <Layout style={{ marginLeft: `${collapsed ? 84 : 200}px `, animationDelay: '0.2s' }}>
          <Header style={{ background: '#fff', paddingLeft: 20 }}>
            <Breadcrumb />
          </Header>
          <Content
            style={{ margin: '24px 16px 0', overflow: 'initial' }}
          >
            <Card >
              <Switch>
                {getRoutes(match.path, routes).map(route => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact
                      component={route.component}
                    />
                  );
                })}
                <Redirect exact from="/" to="/home" />
                <Redirect exact from="/home/indtroduce" to="/home" />
                <Route render={NotFound} />
              </Switch>
            </Card>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.global,
});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
