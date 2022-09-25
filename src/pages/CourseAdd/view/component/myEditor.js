/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
// import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { Form, Input } from 'antd';


function MyEditor(props) {

  const [html, setHtml] = useState('');

  useEffect(() => {
    // const { detail } = props;
    const E = window.wangEditor

    const editorConfig = {
      placeholder: '在这里直接输入或粘帖内容...',
      fontStyle: 'normal',
      scroll: false, // 禁止编辑器滚动,
      value: html,
      MENU_CONF: {
        // uploadImage: {
        //   server: '/wx/wxcp/manage/localMaterials/upload',
        //   fieldName: 'file',
        //   headers: {
        //     "Authorization": 'Bearer ' + cookie.get('access_token'),
        //     "language": 'zh-CN',
        //     "X-Origin-App": "CRM-ADMIN",
        //   },
        //   customInsert(res, insertFn) {
        //     if (res.code === '0' && res.result?.length) {
        //       insertFn(getOssUrl() + res.result[0]?.filePath)
        //     }
        //   },
        // },
        // uploadVideo: {
        //   server: '/wx/wxcp/manage/localMaterials/upload',
        //   fieldName: 'file',
        //   headers: {
        //     "Authorization": 'Bearer ' + cookie.get('access_token'),
        //     "language": 'zh-CN',
        //     "X-Origin-App": "CRM-ADMIN",
        //   },
        //   customInsert(res, insertFn) {
        //     if (res.code === '0' && res.result?.length) {
        //       insertFn(getOssUrl() + res.result[0]?.filePath)
        //     }
        //   },
        // }
      },
      onChange(editor) {
        setHtml(editor.getHtml());
        // props.showCon(editor.getHtml())
      }
    }

    // 先创建 editor
    let editor = E && E.createEditor({
      selector: '#editor-text-area',
      content: [],
      html: '',
      config: editorConfig,

    })

    // 创建 toolbar
    // eslint-disable-next-line no-unused-vars
    const toolbar = E && E.createToolbar({
      editor,
      selector: '#editor-toolbar',
      config: {
        excludeKeys: 'fullScreen',
      }
    })
    window.editor = editor;

    // editor && editor.setHtml(detail.imageText ? detail.imageText : '');

  }, [])


  return (
    <>

      <div style={{ zIndex: 100, marginTop: '50px', padding: '15px' }}>
        {/* <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => { setHtml(editor.getHtml()); props.showCon(editor.getHtml()) }}
          mode="default"
          style={{ height: '500px' }}
        /> */}
        <div style={{ borderBottom: '1px solid #e8e8e8' }}>
          <div id="editor-toolbar"></div>
        </div>
        <div id="content">
          <div id="editor-container">
            <Form.Item
              name="title"
              className='title-container'
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder='请输入标题' showCount maxLength={64} bordered={false} />
            </Form.Item>
            <Form.Item
              name="author"
              className='author-container'
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder='请输入作者' showCount maxLength={8} bordered={false} />

            </Form.Item>
            <div id="editor-text-area"></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MyEditor
