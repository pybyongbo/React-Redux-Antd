import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

// import Authorized from 'utils/Authorized';
// import BasicLayout from './layouts/BasicLayout';
import NotFound from './pages/Exception/404';
import store, { history } from './store';
import { getRouterData } from './common/router';
import { getMenuData } from './common/menu';

class App extends Component {
    render() {
        const routerData = getRouterData();
        const menuData = getMenuData();

        const Home = routerData['/home'].component;
        const BasicLayout = routerData['/'].component;

        // console.log('BasicLayout',BasicLayout,routerData,menuData);

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            render={(props) => {
                                // console.log('p', props);
                                return (
                                    <BasicLayout {...props} menus={menuData} routes={routerData} notFound={NotFound} />
                                );
                            }}
                        />
                        <Route path="/" exact={true} component={Home} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
