import React, { PureComponent, useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';

const BaseModal = (props) => {
    // const [visible, setVisible] = useState(false);
    console.log('props', props);
    const triggleConfirm = () => {
        props.fn(false);
    };

    const triggerCancel = () => {
        props.fn(false);
    };

    // useEffect(() => {
    //     setVisible(props.visible);
    // }, [props.visible]);

    return (
        <Modal title="弹框测试1" open={props.visible} onOk={triggleConfirm} onCancel={triggerCancel}>
            <p>状态放到父组件,调用父组件的方法进行控制</p>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
        </Modal>
    );
};
export default BaseModal;
