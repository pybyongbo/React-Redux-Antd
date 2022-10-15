import { GET_COURSE_FIELD_LIST } from './actionTypes';

const initialState = {
    coursefieldList: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    console.log('action', action);
    switch (type) {

        case GET_COURSE_FIELD_LIST:
            const { list: coursefieldList } = payload;
            return {
                ...state,
                coursefieldList,
            };
        default:
            return state;
    }
};
