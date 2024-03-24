import React, { createRef } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Modal } from 'antd';

import Wrap from './hocModal';

const BaseModal3 = (props) => {
    const triggerConfirm = () => {
        let data = { name: 'ccc', age: 12 };
        props.onOk(data);
        props.closeDialog();
    };

    return (
        <Modal
            title={props.title}
            open={props.open}
            bodyStyle={{ padding: '30px 60px 10px 40px' }}
            centered
            // destroyOnClose={true}
            onOk={triggerConfirm}
            onCancel={props.closeDialog}
            // footer={null}
        >
            {props.content}
        </Modal>
    );
};
export default Wrap(BaseModal3);
