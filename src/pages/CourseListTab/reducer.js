import {  GET_COURSE_FIELD_LIST, GET_COURSE_LIST,CHANGE_COURSE_FIELD} from './actionTypes';

const initialState = {
  curField: -1,
  coursefieldList: [],
  courseList: [],
  total: 0,

};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_COURSE_FIELD:
      const {field} = payload;
      return {
        ...state,
        curField:field
      }
    case GET_COURSE_FIELD_LIST:
      const { list: coursefieldList } = payload;
      return {
        ...state,
        coursefieldList
      };
    case GET_COURSE_LIST:
      const { list: courseList, total } = payload;
      console.log('payload',courseList);
      return {
        ...state,
        courseList,
        total
      };
    default:
      return state;
  }
};
