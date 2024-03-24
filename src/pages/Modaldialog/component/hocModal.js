import React from 'react';
import ReactDOM from 'react-dom';

const Wrap = (Component) => {
    const distoryDialog = (ele) => {
        let res = ReactDOM.unmountComponentAtNode(ele);
        if (res && ele.parentNode) {
            setTimeout(() => {
                ele.parentNode.removeChild(ele);
            }, 1000);
        }
    };

    return function (config) {
        let elem = document.createElement('div');
        // 1.生成一个组件,该组件基于baseModal

        let jsxCompent = React.createElement(Component, {
            ...config,
            open: true,
            // visible: true,
            closeDialog: () => {
                distoryDialog(elem);
            },
        });
        // 2.渲染该组件

        ReactDOM.render(jsxCompent, elem);
    };
};

export default Wrap;
