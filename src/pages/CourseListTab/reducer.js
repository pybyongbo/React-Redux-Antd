import {
  GET_COURSE_FIELD_LIST,
  GET_COURSE_LIST,
  // CHANGE_COURSE_FIELD,
  CHANGE_SHOW_TYPE,
  COURSE_LIST_IS_LOADING
} from './actionTypes';

const initialState = {
  curField: -1,
  coursefieldList: [],
  courseList: [],
  total: 0,
  current: 1,
  showType: 'card',
  courseListLoading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case CHANGE_COURSE_FIELD:
    // const { field } = payload;
    // return {
    //   ...state,
    //   curField: field,
    // };
    case COURSE_LIST_IS_LOADING:
      // const {courseListLoading} = payload;
      return {
        ...state,
        ...payload,
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
      const { list: courseList, total, current, field } = payload;
      // console.log('payload 1111', payload);
      return {
        ...state,
        courseList,
        total,
        curField: field,
        current: current
      };
    default:
      return state;
  }
};
