import request from '@src/utils/request';

export async function fetchPostList(data) {
    const response = await request({
        url: '/posts/page',
        method: 'post',
        data
    });
    console.log(123,response.data)
    return response.data;
}
