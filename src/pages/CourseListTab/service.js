import request from '@src/utils/request';
const preCoursefix = '/course';
// 获取课程分类
export async function fetchCourseFieldList() {
  const response = await request({
    url: `${preCoursefix}/course/get_course_fields`,
    method: 'GET',
  });

  return response.data;
}

// 获取课程列表数据
export async function fetchCourseList(params) {
  const response = await request({
    url: `${preCoursefix}/course/get_courses/all`,
    method: 'GET',
    params
  });

  return response.data;
}


// export async function fetchCourseListByField(params) {
//   const response = await request({
//       url: `${preCoursefix}/course/get_courses/all`,
//       method: 'GET',
//       params
//   });

//   return response.data;
// }
