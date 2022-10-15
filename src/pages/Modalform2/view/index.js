import React, { useState, createRef } from 'react';
import { Button, Row, Col, Form, Input, message, Divider, Card, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ListApi = () => {
  const { Item } = Form;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);

  const formlayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  const handleChange = ({ fileList: newFileList }) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }

    // if (info.file.status === 'done') {
    //   console.log(info.file)
    //   // Get this url from response in real world.
    //   // getBase64(info.file.originFileObj, (url) => {
    //   setLoading(false);
    //   setImageUrl('http://' + info?.file?.response?.data?.hostName + '/' + info?.file?.response?.data?.filePath);
    //   // });
    // }
    setFileList(newFileList)
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = () => {

  }

  return (
    <div>

      <Form
        form={form}
        {...formlayout}
        onFinish={onFinish}
        style={{ width: '90%' }}
      >
        <Item label="多图片上传" >
          <Upload
            name="thumb"
            listType="picture-card"
            className="avatar-uploader"
            action="/course/course/course_thumb_upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}

          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Item>
      </Form>

    </div>
  );
}
export default ListApi;
