import React from 'react';
import moment from 'moment';

const ListItem = (props) => {
    const { item } = props;
    return (
        <li className="course-item item-list" onClick={() => props.gotoDetail(item.id)}>
            <div className="cover">
                <a className="course-lk">
                    <img src={item.thumb} alt={item.title} className="cover-img" />
                </a>
            </div>
            <h1 className="course-tt">
                <a className="course-lk">
                    {item.id} -- {item.title}
                </a>
            </h1>
            <div style={{ overflow: 'hidden' }}>
                <div className={['price', item.price === 0 ? 'free' : ''].join(' ')}>
                    {item.price === 0 ? '免费' : `￥${item.price}.00`}
                </div>
                <div className="studyNum">{item.studying}人在学习</div>
            </div>

            <div className="onlineTime">上架时间:{moment(item.createTime).format('YYYY-MM-DD HH:MM:SS')}</div>
        </li>
    );
};

export default ListItem;
