import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const routes = [
    {
        path: '/',
        breadcrumbName: '首页'
    },
    {
        path: '/list',
        breadcrumbName: '面包屑导航'
    }
];

function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        )
}

export default class Bread extends React.Component {
    render() {
        return (
            <Breadcrumb
                style={{ lineHeight: '64px' }}
                itemRender={itemRender}
                routes={routes}>
            </Breadcrumb>
        )
    }
}
