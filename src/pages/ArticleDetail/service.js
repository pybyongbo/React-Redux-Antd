// getCourseDetail

import request from '@src/utils/request';
const preCoursefix = '/course';
// 获取课程分类
export async function fetchCourseDetail(params) {
    const response = await request({
        url: `${preCoursefix}/course/getCourseDetail`,
        method: 'GET',
        params,
    });
    console.log('response.data', response.data);
    return response.data;
}
