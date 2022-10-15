import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import MIcon from 'components/MIcon';
import classNames from 'classnames';

const { SubMenu } = Menu;

const getIcon = icon => {
    if (typeof icon === 'string') {
        if (icon.indexOf('http') === 0) {
            return <img src={icon} alt="icon" />;
        }
        return <MIcon type={icon} />;
    }

    return icon;
};

export default class NavMenu extends React.Component {
    //默认菜单高亮显示
    constructor(props) {
        super(props);
        this.paths = {};
        this.subMenus = {};
        this.rootSubmenuKeys = [];
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }

    // componentDidMount() {
    //     const { location } = this.props;
    //     this.setState({
    //         selectedKeys: this.computeSelectedMenuItem(location),
    //         openKeys: this.computeOpenKeys(location)
    //     });
    // }

    // componentWillReceiveProps(nextProps) {
    //     const { location: nextLocation } = nextProps;
    //     const { location } = this.props;
    //     if (nextLocation.pathname !== location.pathname) {
    //         this.setState({
    //             selectedKeys: this.computeSelectedMenuItem(nextLocation)
    //         });
    //     }
    // }

    computeSelectedMenuItem = location => {
        const { pathname } = location;
        const paths = pathname
            .split('/')
            .filter(item => item !== '')
            .map(path => `/${path}`);
        console.log('35', paths, this.paths, pathname);
        console.log('36',this.paths[pathname])
        if(pathname.indexOf('detail')>0){//是否详情页面.
            //  详情页面应用list的选中项
            return [paths[0]+'/list'];
        } else {
            return this.paths[pathname] ? [pathname]:[paths[0]];
        }
    };

    computeOpenKeys = location => {
        const { pathname } = location;
        const paths = pathname
            .split('/')
            .filter(item => item !== '')
            .map(path => `/${path}`);
        return [...paths];
    };
    onOpenChange = openKeys => {
        console.log(openKeys);
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    renderMenus = (menus = [], parentPath = '') => {
        return menus.map(route => {
            if (route.path.indexOf(':') > -1) {
                return null;
            }
            const path = `${parentPath}/${route.path}`.replace(/\/+/g, '/');
            const hasChildMenu = route.children;
            if (hasChildMenu) {
                this.subMenus[path] = true;
                return (
                    <SubMenu title={

                    route.icon ? (
                            <span>
                                {getIcon(route.icon)}
                                <span>{route.name}</span>
                            </span>
                        ) : (
                            route.name
                        )

                    }
                    key={route.path}
                    >
                        {this.renderMenus(route.children, path)}
                    </SubMenu>
                );
            }
            this.paths[path] = true;
            // console.log("path",path)
            return (
                <Menu.Item key={path}>
                    <Link to={path}>
                         {route.icon ? (
                            <span>
                                {getIcon(route.icon)}
                            </span>
                        ) : (
                        ''
                        )}
                        <span>{route.name}</span>
                    </Link>
                </Menu.Item>
            );
        });
    };
    render() {
        const { menus } = this.props;
        const { selectedKeys,openKeys } = this.state;
        console.log('selectedKeys',selectedKeys)
        return (

            <Menu
                theme="dark"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange} selectedKeys={selectedKeys}>
                {this.renderMenus(menus)}

            </Menu>
        );
    }
}
