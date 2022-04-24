import React from 'react';
import FieldItem  from './fieldItem';
import './index.less';

const FieldNav = (props)=>{
  const {curField,fieldData,changeCourseField} = props;
  console.log(`fieldData`,fieldData)
  const  getSum = (data) => {
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

    </div>
  )
}

export default FieldNav;
