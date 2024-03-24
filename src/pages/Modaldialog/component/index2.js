import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';

const BaseModal = forwardRef((props, ref) => {
    // console.log('props', props);
    const [visible, setVisible] = useState(false);
    const triggleConfirm = () => {
        // props.fn(false);
        setVisible(false);
    };

    const triggerCancel = () => {
        // props.fn(false);
        setVisible(false);
    };

    const triggerOpen = () => {
        // props.fn(true);
        setVisible(true);
    };

    useImperativeHandle(ref, () => ({
        triggleConfirm,
        triggerCancel,
        triggerOpen,
    }));

    return (
        <Modal title="弹框测试2" open={visible} onOk={triggleConfirm} onCancel={triggerCancel}>
            <p>forwardRef, useImperativeHandle 方法拿到子组件的实例方法</p>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
        </Modal>
    );
});
export default BaseModal;
