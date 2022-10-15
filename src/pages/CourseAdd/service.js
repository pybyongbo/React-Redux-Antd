import request from '@src/utils/request';
const preCoursefix = '/course';
// 获取课程分类
export async function fetchCourseFieldList() {

  const response = await request({
      url: `${preCoursefix}/course/get_course_fields`,
      method: 'GET',
  });
  console.log('response.data',response.data)
  return response.data;
}

// 新增课程提交
export async function addCourseInfo(data) {
    const response = await request({
        url: `${preCoursefix}/course/course_create`,
        method: 'POST',
        data
    });

    return response.data;
}


// 新增课程分类提交
export async function addCourseCate(data) {
  const response = await request({
      url: `${preCoursefix}/course/course_cate_create`,
      method: 'POST',
      data
  });

  return response.data;
}
