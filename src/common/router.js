import React, { createElement } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Spin } from 'antd';
import Loadable from 'react-loadable';


import { getMenuData } from './menu';

let routerDataCache;

const getRouterDataCache = () => {
  if (!routerDataCache) {
    routerDataCache = getRouterData();
  }
  return routerDataCache;
};

const dynamicWrapper = component => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      return createElement(component().default, {
        ...props,
        routerData: getRouterDataCache()
      });
    };
  }

  // () => import('module')
  return Loadable({
    loader: () => {
      return component().then(raw => {
        const Component = raw.view || raw.default;

        return props => {
          return createElement(Component, {
            ...props,
            routerData: getRouterDataCache()
          });
        };
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    }
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}


function findMenuKey(menuData, path) {
  const menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(key));
  if (menuKey == null) {
    if (path === '/') {
      return null;
    }
    const lastIdx = path.lastIndexOf('/');
    if (lastIdx < 0) {
      return null;
    }
    if (lastIdx === 0) {
      return findMenuKey(menuData, '/');
    }
    // 如果没有，使用上一层的配置
    return findMenuKey(menuData, path.substr(0, lastIdx));
  }
  return menuKey;
}

export const getRouterData = () => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(() => import('../Layouts/BasicLayout'))
    },
    '/home': {
      name: 'Home',
      path: '/home',
      component: dynamicWrapper(() => import('../pages/Home'))
    },
    '/article/list': {
      name: 'Articlelist',
      path: '/articlelist',
      component: dynamicWrapper(() => import('../pages/Article'))
    },

    '/article/add': {
      name: 'Articleadd',
      path: '/articleadd',
      component: dynamicWrapper(() => import('../pages/ArticleAdd'))
    },

    '/article/detail/:id': {
      name: 'Articledetail',
      path: '/article/detail/id',
      component: dynamicWrapper(() => import('../pages/ArticleDetail'))
    },
    // 注意不要匹配代理地址接口路径(改成不一样)
    '/tabcourse/add': {
      name: 'Tabcorseadd',
      path: '/tabcourseadd',
      component: dynamicWrapper(() => import('../pages/CourseAdd'))
    },
    '/tabcourse/catelist': {
      name: 'Tabcoursecatelist',
      path: '/tabcourse/catelist',
      component: dynamicWrapper(() => import('../pages/CourseCateList'))
    },
    '/tabcourse/list': {
      name: 'Tabcourselist',
      path: '/tabcourse/list',
      component: dynamicWrapper(() => import('../pages/CourseListTab'))
    },

    '/modal/modalform1': {
      name: 'modalform1',
      path: '/modalform1',
      component: dynamicWrapper(() => import('../pages/Modalform1'))
    },

    '/modal/modalform2': {
      name: 'modalform2',
      path: '/modalform2',
      component: dynamicWrapper(() => import('../pages/Modalform2'))
    },

    '/exception/403': {
      name: 'exception403',
      path: '/exception/403',
      component: dynamicWrapper(() => import('../pages/Exception/403'))
    },
    '/exception/404': {
      name: 'exception404',
      path: '/exception/404',
      component: dynamicWrapper(() => import('../pages/Exception/404'))
    },
    '/exception/500': {
      name: 'exception500',
      path: '/exception/500',
      component: dynamicWrapper(() => import('../pages/Exception/500'))
    }
  };

  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  Object.keys(routerConfig).forEach(path => {
    let menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(`${key}`));

    if (!menuKey) {
      menuKey = findMenuKey(menuData, path);
    }

    let menuItem = {};

    if (menuKey) {
      menuItem = menuData[menuKey];
    }

    let router = routerConfig[path];

    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb
    };
    routerData[path] = router;
  });

  // console.log('router.js',routerData)

  return routerData;

};
