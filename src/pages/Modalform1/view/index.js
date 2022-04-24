import React, { useState, createRef } from 'react';
import { Button, Row, Col, Form, Input, Select, Tooltip, Icon, message, Divider, Card } from 'antd';
import Formtest1 from '../component/index1'
import Formtest2 from '../component/index2'
import Formtest3 from '../component/index3'

import Formtest4 from '../component/index4'

 const  App=() => {
  const [form] = Form.useForm();
  const parentRef = createRef();

  const [visibleform1,setVisibleform1] = useState(false);

  const [visibleform2,setVisibleform2] = useState(false);

  const [visibleform3,setVisibleform3] = useState(false);

  const [visibleform4,setVisibleform4] = useState(false);


  const handleCloseDialog1 = () =>{
    setVisibleform1(false)
  }

  const handleCloseDialog2 = () =>{
    setVisibleform2(false)
  }

  const handleCloseDialog3 = () =>{
    setVisibleform3(false)
  }

  const handleCloseDialog4 = () =>{
    setVisibleform4(false)
  }

  const handSubmitform1 = (value) => {
    console.log('parent form1',value)
  }

  const handSubmitform2 = (value) => {
    console.log('parent form2',value)
  }

  const handSubmitform3 = (value) => {
    console.log('parent form3',value)
  }

  const handSubmitform4 = (value) => {
    console.log('parent form4',value)
  }

  let modalProps1 = {
    visibleform1,
    handleCloseDialog1,
    handSubmitform1
  }

  let modalProps2 = {
    visibleform2,
    handleCloseDialog2,
    handSubmitform2
  }

  let modalProps3 = {
    visibleform3,
    handleCloseDialog3,
    handSubmitform3
  }

  let modalProps4 =  {
    visibleform4,
    handleCloseDialog4,
    handSubmitform4
  }

  const testFn = () => {
    // console.log( parentRef)
  }

  return (
    <div style={{ width: '100%', margin: '50px auto' }}>

      <Card style={{width:'45%',float:'left',marginBottom:20}}>
        <Button onClick = {()=>setVisibleform1(true)}>
          点击弹框1
        </Button>
        <br/><br/><br/>
        <p>
          Modal的button触发表单的提交测试
        </p>
      </Card>


      <Card style={{width:'45%',float:'right',marginBottom:20}}>
        <Button onClick = {()=>setVisibleform2(true)}>
          点击弹框2
        </Button>
        <br/><br/><br/>
        <p>
          Modal的button设置为null,然后用表单的button进行提交,自定义样式.
        </p>
      </Card>


      <Card style={{width:'45%',float:'left'}}>
        <Button onClick = {()=>setVisibleform3(true)}>
          点击弹框3
        </Button>
        {/* <Button onClick={testFn}>Test</Button> */}
        <br/><br/><br/>
        <p>
          Modal的button点击拿到表单实例对象,ref获取表单对象,然后用`getFieldsValue`拿到所有值,进行提交.
        </p>
      </Card>


      <Card style={{width:'45%',float:'right'}}>
        <Button onClick = {()=>setVisibleform4(true)}>
          点击弹框4
        </Button>
        {/* <Button onClick={testFn}>Test</Button> */}
        <br/><br/><br/>
        <p>
          设置Modal的button为数组对象,button的form属性与表单ID进行关联提交.
        </p>
      </Card>


      <Formtest1 {...modalProps1}></Formtest1>

      <Formtest2 {...modalProps2}></Formtest2>

      <Formtest3 {...modalProps3}></Formtest3>

      <Formtest4 {...modalProps4}></Formtest4>
    </div>
  );
}
export default App;
