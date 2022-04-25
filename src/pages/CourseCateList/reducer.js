import { GET_COURSE_CATE_LIST } from './actionTypes';

const initialState = {
  cateList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('action', action, payload);
  switch (type) {

    case GET_COURSE_CATE_LIST:
      const { list: cateList } = payload;
      return {
        ...state,
        cateList,
      };
    default:
      return state;
  }
};
