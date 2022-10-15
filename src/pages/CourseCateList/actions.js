import { GET_COURSE_CATE_LIST } from './actionTypes';
import { fetchCourseCateList, updateCourseCate, findCourseListByCate, deleteCourseCate } from './service';


// 异步接口
export const getCourseCateListAction = () => {
  return async dispatch => {
    try {
      // dispatch({
      //     type: FETCH_LIST_BEGIN
      // });
      const { code, message, result } = await fetchCourseCateList();

      if (code == 0) {
        dispatch({
          type: GET_COURSE_CATE_LIST,
          payload: {
            list: result
          }
        });
      }
    } catch (error) {
      // dispatch({
      //     type: FETCH_LIST_ERROR,
      //     data: { error: error }
      // });
      throw new Error(error);
    }
  };
};
// 更新课程分类Action
export const updateCourseCateAction = (params) => {
  return async dispatch => {
    try {
      // dispatch({
      //     type: FETCH_LIST_BEGIN
      // });
      const { code, message } = await updateCourseCate(params);
      return {
        code, message
      }
    } catch (error) {
      // dispatch({
      //     type: FETCH_LIST_ERROR,
      //     data: { error: error }
      // });
      throw new Error(error);
    }
  };
};

// 删除前判断该分类是否有课程列表数据,进行提醒
export const findCourseListByCateAction = (params) => {
  return async dispatch => {
    try {
      // dispatch({
      //     type: FETCH_LIST_BEGIN
      // });
      const { code, message, result } = await findCourseListByCate(params);
      return {
        code, message, result
      }
    } catch (error) {
      // dispatch({
      //     type: FETCH_LIST_ERROR,
      //     data: { error: error }
      // });
      throw new Error(error);
    }
  };
};



// 删除课程分类Action
export const deleteCourseCateAction = (params) => {
  return async dispatch => {
    try {
      // dispatch({
      //     type: FETCH_LIST_BEGIN
      // });
      const { code, message } = await deleteCourseCate(params);
      return {
        code, message
      }
    } catch (error) {
      // dispatch({
      //     type: FETCH_LIST_ERROR,
      //     data: { error: error }
      // });
      throw new Error(error);
    }
  };
};
