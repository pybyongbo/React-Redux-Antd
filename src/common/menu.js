import { isUrl } from 'utils/validate';
const menuData = [
        {
            path: '/dashboard',
            name: '首页',
            icon: 'indent',
            // breadcrumbName:'首页'
        },
        {
            path: 'article',
            name: '文章管理',
            icon: 'goods',
            children: [
                {
                    key: 'add',
                    name: '新增文章',
                    path: 'add'
                },
                {
                    key: 'list',
                    name: '文章列表',
                    path: 'list'
                }
            ]

        },
        {
            path: '/article/detail:id',
            name: '文章详情',
        },
        {
            path: 'cart',
            name: '购物车',
            icon:'buy'
        },
        {
            key:'info',
            path: 'info',
            name: '个人中心',
            icon:'user',
            children: [
                {
                    key: 'userinfo',
                    name: '用户信息',
                    path: 'userinfo'
                },
                {
                    key: 'modifiy',
                    name: '修改密码',
                    path: 'modifiy'
                }
            ]
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
                    path: 'user'
                }
            ]
        },
    ];


function formatter(data, parentPath = '/', parentAuthority) {

    return data.map(item => {
        const result = {
            ...item,
            authority: item.authority || parentAuthority
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