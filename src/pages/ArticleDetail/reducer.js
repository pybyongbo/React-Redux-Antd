import { GET_COURSE_DETAIL } from './actionTypes';

const initialState = {
    courseDetailInfo: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    console.log('action', action);
    console.log('payload: ', payload);

    switch (type) {
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
