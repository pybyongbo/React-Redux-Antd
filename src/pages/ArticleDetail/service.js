import request from '@src/utils/request';

export async function fetchDetailInfo(params) {
    const response = await request({
        url: '/posts/detail',
        method: 'GET',
        params
    });

    return response.data;
}