import { GET_COURSE_DETAIL, DETAIL_PAGE_IS_LOADING } from './actionTypes';
import { fetchCourseDetail } from './service';

// 异步接口
export const getCourseDetailAction = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DETAIL_PAGE_IS_LOADING,
                payload: {
                    detailPageLoading: true,
                },
            });
            const { code, result } = await fetchCourseDetail(params);

            if (code == 0) {
                dispatch({
                    type: GET_COURSE_DETAIL,
                    payload: {
                        detailInfo: result,
                    },
                });
                dispatch({
                    type: DETAIL_PAGE_IS_LOADING,
                    payload: {
                        detailPageLoading: false,
                    },
                });
            }
        } catch (error) {
            dispatch({
                type: DETAIL_PAGE_IS_LOADING,
                payload: {
                    detailPageLoading: false,
                },
            });
            throw new Error(error);
        }
    };
};
