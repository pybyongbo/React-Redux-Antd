import request from '@src/utils/request';
const preCoursefix = '/course';
// 获取课程分类
export async function fetchCourseCateList() {
  const response = await request({
    url: `${preCoursefix}/course/get_course_fields`,
    method: 'GET',
  });
  console.log('response.data', response.data)
  return response.data;
}

// 更新课程分类信息提交
export async function updateCourseCate(data) {
  const response = await request({
    url: `${preCoursefix}/course/course_cate_update`,
    method: 'POST',
    data
  });

  return response.data;
}

// 删除课程分类信息提交
export async function deleteCourseCate(data) {
  const response = await request({
    url: `${preCoursefix}/course/course_cate_delete`,
    method: 'POST',
    data
  });

  return response.data;
}
