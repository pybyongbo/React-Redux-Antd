import { GET_COURSE_DETAIL } from './actionTypes';
import { fetchCourseDetail } from './service';

// 异步接口
export const getCourseDetailAction = (params) => {
    return async (dispatch) => {
        try {
            const { code, message, result } = await fetchCourseDetail(params);

            if (code == 0) {
                dispatch({
                    type: GET_COURSE_DETAIL,
                    payload: {
                        detailInfo: result,
                    },
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};
