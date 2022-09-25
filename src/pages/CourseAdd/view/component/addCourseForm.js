import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Form, Button, InputNumber, Radio, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import MyEditor from './myEditor';
const { Option } = Select;
const AddCourseForm = (props) => {
  const { form, coursefieldList, createCourse } = props;
  const { Item } = Form;
  const formlayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  const [couseType, setCouseType] = useState(1);
  const [uploadType, setUploadType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    console.log(moment(1662976829831).format("YYYY-MM-DD HH:mm:ss"));
  }, []);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      console.log(info.file)
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl('http://' + info?.file?.response?.data?.hostName + '/' + info?.file?.response?.data?.filePath);
      // });
    }
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

  const changeType = (e) => {
    const val = e.target.value;
    console.log(val);
    setCouseType(val);
  };

  const changeUploadType = (e) => {
    const val = e.target.value;
    console.log(val);
    setUploadType(val);

  }

  const onFinish = () => {
    form.validateFields().then(val => {
      const { isFree, isUpload } = val;
      let content = window.editor.getHtml();
      let postObj = isFree === 0 ? {
        ...val,
        content: content,
        price: 0,
        createtime: moment().valueOf()
      } : {
        ...val,
        content: content,
        createtime: moment().valueOf()
      }

      postObj = isUpload === 0 ? Object.assign({}, postObj, {
        thumb: imageUrl
      }) : postObj;
      delete postObj.isUpload;
      console.log('postObj', postObj);
      // return;
      createCourse(postObj);
    })

  }

  const goToCourseList = () => {
    props.goToCourseList();
  }
  return (
    <div style={{ width: '90%', margin: '50px auto' }}>
      <Form
        form={form}
        {...formlayout}
        labelAlign="right"
        onFinish={onFinish}
      >
        <Card title="新增课程信息">
          <Item name="description" label="课程描述" rules={[
            {
              required: true,
              message: '请输入课程描述',
            }
          ]}>
            <Input.TextArea placeholder="请输入课程描述" showCount maxLength={200} />
          </Item>
          <Item
            name="fieldType"
            label="课程分类"
            rules={[
              {
                required: true,
                message: '请选择课程分类',
              }
            ]}
          >
            <Select
              showSearch
              placeholder="请选择课程分类"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {coursefieldList &&
                coursefieldList.length > 0 &&
                coursefieldList.map((item) => {
                  return (
                    <Option value={item.fieldType} key={item.id}>
                      {item.fieldName}
                    </Option>
                  );
                })}
            </Select>
          </Item>
          <Item name="isUpload" label="是否自定义上传" initialValue={0}>
            <Radio.Group value={uploadType} onChange={(e) => changeUploadType(e)}>
              <Radio value={0}>是</Radio>
              <Radio value={1}>否</Radio>
            </Radio.Group>
          </Item>

          {uploadType == 0 && <Upload
            name="thumb"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/course/course/course_thumb_upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          }
          {uploadType == 1 && <Item
            name="thumb"
            // style={{ paddingLeft: 80 }}
            label="课程缩略图"
            rules={[
              {
                required: true,
                message: '请输入课程缩略图',
              }
            ]}
          >
            <Input placeholder="请输入课程缩略图" />
          </Item>}
          <Item name="isFree" label="是否免费" initialValue={1}>
            <Radio.Group value={couseType} onChange={(e) => changeType(e)}>
              <Radio value={0}>是</Radio>
              <Radio value={1}>否</Radio>
            </Radio.Group>
          </Item>
          {couseType == 1 && (
            <Item
              label="课程价格"
              name="price"
              rules={[
                {
                  required: couseType == 1 ? true : false,
                  message: '请输入课程价格',
                }
              ]}
            >
              <Input placeholder="请输入课程价格" style={{ width: 320 }} prefix="￥" suffix="RMB" />
            </Item>
          )}
          <Item
            name="studying"
            label="学习人数"
            rules={[
              {
                required: true,
                message: '请输入学习人数',
              }
            ]}
          >
            <InputNumber placeholder="请输入学习人数" style={{ width: 320 }} min={1} />
          </Item>

          <MyEditor></MyEditor>
        </Card>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 30, marginRight: 10 }}>
            提交
          </Button>
          <Button
            type="default"
            onClick={goToCourseList}
            style={{ marginTop: 30 }}>
            返回课程列表
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCourseForm;
