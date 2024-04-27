import { GET_COURSE_DETAIL, DETAIL_PAGE_IS_LOADING } from './actionTypes';

const initialState = {
    detailPageLoading: false,
    courseDetailInfo: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    console.log('action', action);
    console.log('payload121313: ', payload);

    switch (type) {
        case DETAIL_PAGE_IS_LOADING:
            const { detailPageLoading } = payload;
            console.log('detailPageLoading', detailPageLoading);
            return {
                ...state,
                detailPageLoading: detailPageLoading,
            };
        case GET_COURSE_DETAIL:
            const { detailInfo } = payload;
            return {
                ...state,
                courseDetailInfo: detailInfo,
            };
        default:
            return state;
    }
};
