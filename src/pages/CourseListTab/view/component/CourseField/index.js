import React from 'react';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import FieldItem from './fieldItem';
import './index.less';

const FieldNav = (props) => {
  const { curField, fieldData, changeCourseField, showType, changeShowType } = props;
  console.log(`fieldData`, fieldData)
  const getSum = (data) => {
    return data.reduce((acc, cur) => {
      return acc + cur.totalCount
    }, 0);
  }
  return (
    <div className="field-wrapper nav-bar">
      <FieldItem
        key={-1}
        item={{ fieldType: -1, fieldName: '全部课程' }}
        totalCount={getSum(fieldData)}
        curField={curField}
        changeCourseField={() => changeCourseField(-1)}
      />

      {
        fieldData.map((item, index) => {
          return (
            <FieldItem
              key={index}
              item={item}
              totalCount={item.totalCount}
              curField={curField}
              changeCourseField={() => changeCourseField(item.fieldType)}
            />)
        })
      }
      <div className='last-icon'>
        <span onClick={() => changeShowType('card')} className={`${showType === 'card' ? 'active' : ''}`}><AppstoreOutlined style={{ color: showType === 'card' ? '#fd8f04' : '#1890ff' }} />卡片展示</span>
        <span onClick={() => changeShowType('list')} className={`${showType === 'list' ? 'active' : ''}`}><UnorderedListOutlined style={{ color: showType === 'list' ? '#fd8f04' : '#1890ff' }} />列表展示</span>
      </div>

    </div>
  )
}

export default FieldNav;
