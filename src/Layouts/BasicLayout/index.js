import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { Layout, Card, Input } from 'antd';
import NotFound from '../../pages/Exception/404';
import Menu from "./Menu";
import Breadcrumb from './Breadcrumb';

import { getRoutes } from '../../utils/utils';



const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {

  render() {
    const { menus, routes, location, match } = this.props;
    return (
      <Layout style={{
        height: '100vh'
      }}>
        <Sider style={{
          overflow: 'auto',
          height: '100%',
          position: 'fixed',
          left: 0
        }}>
          <Menu menus={menus} location={location} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', paddingLeft: 20 }}>
            <Breadcrumb />
          </Header>
          <Content
            style={{ margin: '24px 16px 0', overflow: 'initial' }}
          >
            <Card>
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

});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
