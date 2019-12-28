import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

// import { getRouterData } from '../../common/router';
import { getMenuData } from '../../common/menu';
const MenuData = getMenuData();

console.log('MenuData', MenuData)

MenuData.map((item) => {
    console.log(item.path)
})

const routes = [
    {
        path: '/',
        name: '首页'
    },
    {
        path: '/list',
        name: '面包屑导航'
    },
    // {
    //     path: '/home',
    //     breadcrumbName: '面包屑导航123'
    // }
];

function itemRender(route, params, routes, paths) {
    // console.log(111,routes)
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.name}</span>
    ) : (
            <Link to={paths.join('/')}>{route.name}</Link>
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