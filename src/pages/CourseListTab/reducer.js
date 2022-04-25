import { GET_COURSE_FIELD_LIST, GET_COURSE_LIST, CHANGE_COURSE_FIELD, CHANGE_SHOW_TYPE } from './actionTypes';

const initialState = {
  curField: -1,
  coursefieldList: [],
  courseList: [],
  total: 0,
  showType: 'card',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_COURSE_FIELD:
      const { field } = payload;
      return {
        ...state,
        curField: field,
      };

    case CHANGE_SHOW_TYPE:
      const { showType } = payload;
      return {
        ...state,
        showType: showType,
      };
    case GET_COURSE_FIELD_LIST:
      const { list: coursefieldList } = payload;
      return {
        ...state,
        coursefieldList,
      };
    case GET_COURSE_LIST:
      const { list: courseList, total } = payload;
      console.log('payload', courseList);
      return {
        ...state,
        courseList,
        total,
      };
    default:
      return state;
  }
};
