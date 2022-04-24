import { GET_COURSE_FIELD_LIST } from './actionTypes';
import { fetchCourseFieldList,addCourseInfo,addCourseCate } from './service';


// 异步接口
export const getCourseFieldListAction = () => {
    return async dispatch => {
        try {
            // dispatch({
            //     type: FETCH_LIST_BEGIN
            // });

            const { code,message,result } = await fetchCourseFieldList();

            if (code==0) {
                dispatch({
                    type: GET_COURSE_FIELD_LIST,
                    payload: {
                        list:result
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

// 新增课程信息Action
export const addCourseItemAction = (params) => {
  return async dispatch => {
      try {
          // dispatch({
          //     type: FETCH_LIST_BEGIN
          // });
          const { code,message,result } = await addCourseInfo(params);
          return {
            code,message,result
          }
          // }
      } catch (error) {
          // dispatch({
          //     type: FETCH_LIST_ERROR,
          //     data: { error: error }
          // });
          throw new Error(error);
      }
  };
};

// 新增课程分类Action
export const addCourseCateAction = (params) => {
  return async dispatch => {
      try {
          // dispatch({
          //     type: FETCH_LIST_BEGIN
          // });
          const { code,message } = await addCourseCate(params);
          return {
            code,message
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
