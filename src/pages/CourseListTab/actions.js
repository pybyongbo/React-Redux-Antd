import {
    GET_COURSE_FIELD_LIST,
    GET_COURSE_LIST,
    CHANGE_COURSE_FIELD,
    CHANGE_SHOW_TYPE,
    COURSE_LIST_IS_LOADING,
} from './actionTypes';
import { fetchCourseFieldList, fetchCourseList } from './service';

// 同步点击切换(前端过滤)
export const changeCourseFieldAction = (field) => ({
    type: CHANGE_COURSE_FIELD,
    payload: {
        field,
    },
});

// 同步点击切换展示样式(前端过滤)
export const changeShowTypeAction = (type) => ({
    type: CHANGE_SHOW_TYPE,
    payload: {
        showType: type,
    },
});

// 异步接口
export const getCourseFieldListAction = () => {
    return async (dispatch) => {
        try {
            // dispatch({
            //     type: FETCH_LIST_BEGIN
            // });
            const { code, message, result } = await fetchCourseFieldList();
            console.log('action', result);
            if (code == 0) {
                dispatch({
                    type: GET_COURSE_FIELD_LIST,
                    payload: {
                        list: result,
                    },
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

export const getCourseListAction = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: COURSE_LIST_IS_LOADING,
                payload: {
                    courseListLoading: true,
                },
            });
            const { code, message, result, total, cpage } = await fetchCourseList(params);
            // console.log('code,message,result cpage', params, code, message, result, cpage);
            if (code == 0) {
                dispatch({
                    type: GET_COURSE_LIST,
                    payload: {
                        list: result,
                        total: total,
                        current: cpage,
                        field: params?.field || -1,
                    },
                });
            }
            dispatch({
                type: COURSE_LIST_IS_LOADING,
                payload: {
                    courseListLoading: false,
                },
            });
        } catch (error) {
            dispatch({
                type: COURSE_LIST_IS_LOADING,
                payload: {
                    courseListLoading: false,
                },
            });
            throw new Error(error);
        }
    };
};
