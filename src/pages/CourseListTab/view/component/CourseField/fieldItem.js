import React from 'react';

const FieldItem =(props)=> {

    const { item, totalCount, curField, changeCourseField } = props;
    return (
      <div className="nav-item">
        <a
          className={['nav-lk', item.fieldType === curField ? 'nav-current' : ''].join(' ')}
          onClick={() => changeCourseField(item.fieldType)}

        >{item.fieldName}-({totalCount})</a>
      </div>

    )

}

export default FieldItem;
