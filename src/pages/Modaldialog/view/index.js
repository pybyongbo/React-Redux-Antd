import React, { useState, createRef, useRef } from 'react';
import { Button, Row, Col, Form, Input, message, Divider, Card, Upload } from 'antd';

import BaseModal1 from '../component/index1.js';
import BaseModal2 from '../component/index2.js';

import BaseModal3 from '../component/index3.js';

const MyDialogWrap = () => {
    const modalRef = useRef(null);
    const [parentVisible, setParentVisible] = useState(false);

    const parentTrigger1 = (data) => {
        console.log(data);
        setParentVisible(data);
    };

    const parentTrigger2 = () => {
        // console.log('modalRef', modalRef);
        modalRef.current.triggerOpen();
    };

    const parentOk = (data) => {
        console.log('parentOk:', data);
    };

    const parentTrigger3 = () => {
        BaseModal3({
            title: '弹框测试3-dialog3',
            // open: true,
            onOk: parentOk,
            content: (
                <>
                    <p>通过方法配置进行调用Modal组件测试</p>
                    <p>通过方法配置进行调用Modal组件测试</p>
                    <p>通过方法配置进行调用Modal组件测试</p>
                    <p>通过方法配置进行调用Modal组件测试</p>
                </>
            ),
        });
    };

    return (
        <div>
            <Button onClick={() => parentTrigger1(true)}>Click Dialgo1</Button>
            <Button onClick={parentTrigger2} style={{ marginLeft: 10 }}>
                Click Dialog2
            </Button>

            <Button onClick={parentTrigger3} style={{ marginLeft: 10 }}>
                Click Dialog3
            </Button>

            {/* 方法1:index1.js */}
            <BaseModal1 visible={parentVisible} fn={parentTrigger1}></BaseModal1>

            {/* 方法2:index2.js */}
            <BaseModal2 ref={modalRef}></BaseModal2>
        </div>
    );
};
export default MyDialogWrap;
