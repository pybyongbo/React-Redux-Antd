import { GET_POST_DETAIL_INFO } from './actionTypes';

const initialState = {
    detailObj:''
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
    
        case GET_POST_DETAIL_INFO:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};
