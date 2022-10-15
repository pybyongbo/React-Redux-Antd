import { isUrl } from 'utils/validate';
const menuData = [
  {
    path: 'home',
    name: '首页',
    icon: 'indent',
    children: [
      {
        key: 'indtroduce',
        name: '系统介绍',
        path: 'indtroduce',
      },
      // {
      //   key: 'list',
      //   name: '文章列表',
      //   path: 'list',
      // },
    ],
  },
  {
    path: 'article',
    name: '文章管理',
    icon: 'goods',
    children: [
      {
        key: 'add',
        name: '新增文章',
        path: 'add',
      },
      {
        key: 'list',
        name: '文章列表',
        path: 'list',
      },
    ],
  },
  {
    path: 'tabcourse',
    name: '课程管理',
    icon: 'sell',
    children: [
      {
        key: 'add',
        name: '新增课程',
        path: 'add',
      },
      {
        key: 'catelist',
        name: '分类列表',
        path: 'catelist',
      },
      {
        key: 'list',
        name: '课程列表',
        path: 'list',
      },
    ],
  },
  {
    path: '/article/detail:id',
    name: '文章详情',
  },
  {
    path: 'modal',
    name: '表单弹框测试',
    icon: 'buy',
    children: [
      {
        key: 'modal-form1',
        name: '表单测试1',
        path: 'modalform1',
      },
      {
        key: 'modal-form2',
        name: '表单测试2',
        path: 'modalform2',
      },
    ],
  },
  {
    key: 'info',
    path: 'info',
    name: '个人中心',
    icon: 'user',
    children: [
      {
        key: 'userinfo',
        name: '用户信息',
        path: 'userinfo',
      },
      {
        key: 'modifiy',
        name: '修改密码',
        path: 'modifiy',
      },
    ],
  },
  {
    key: 'account',
    name: '账户中心',
    icon: 'setting',
    path: 'account',
    children: [
      {
        key: 'user',
        name: '用户配置',
        path: 'user',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      authority: item.authority || parentAuthority,
    };

    let { path } = item;
    if (path && !isUrl(path)) {
      // path = parentPath + item.path;
      result.path = path;
    }

    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
