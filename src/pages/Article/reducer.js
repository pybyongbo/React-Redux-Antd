import { FETCH_LIST_BEGIN, GET_POST_LIST, GET_POST_INFO } from './actionTypes';

const initialState = {
    postList: [],
    total: 0,
    page: 1,
    pageSize: 10,
    fetchListPending: false,
    fetchListError: null,
    postInfo: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LIST_BEGIN:
            return {
                ...state,
                fetchListPending: true,
                fetchListError: null,
            };
        case GET_POST_LIST:
            const { list: postList, total } = payload;
            debugger
            return {
                ...state,
                fetchListPending: false,
                postList,
                total
            };
        case GET_POST_INFO:
            return { ...state, postInfo: payload };
        default:
            return state;
    }
};
