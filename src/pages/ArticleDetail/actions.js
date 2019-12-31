import { GET_POST_DETAIL_INFO } from './actionTypes';
import { fetchDetailInfo } from './service';

export const getDetailInfoAction = query => {
    return async dispatch => {
        try {
           
            const { code,data } = await fetchDetailInfo(query);
            if (code==0) {
                dispatch({
                    type: GET_POST_DETAIL_INFO,
                    payload: {
                        detailObj:data,
                    }
                });
            }
        } catch (error) {
           
            throw new Error(error);
        }
    };
};