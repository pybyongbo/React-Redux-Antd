import request from '@src/utils/request';

export async function fetchPostList(data) {
    const response = await request({
        url: '/posts/page',
        method: 'post',
        data
    });

    return response.data;
}