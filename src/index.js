import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './styles/index.less';
import App from './App';

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>,
    document.getElementById('root')
);
