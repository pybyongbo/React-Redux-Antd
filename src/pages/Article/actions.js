import { FETCH_LIST_BEGIN,GET_POST_LIST, GET_POST_INFO } from './actionTypes';
import { fetchPostList } from './service';

export const getPostList = queryForm => {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_LIST_BEGIN
            });
            const { code,message,postList } = await fetchPostList(queryForm);
            if (code==0) {
                dispatch({
                    type: GET_POST_LIST,
                    payload: {
                        total:postList.total,
                        list:postList
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_LIST_ERROR,
                data: { error: error }
            });
            throw new Error(error);
        }
    };
};