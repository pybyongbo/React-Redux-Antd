import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// all reducers
import { reducer as global } from './global';
import { reducer as postList } from './pages/Home';
import { reducer as courseList } from './pages/CourseListTab';
import { reducer as courseCateList } from './pages/CourseCateList';
import { reducer as courseAdd } from './pages/CourseAdd';
import { reducer as courseListTab } from './pages/CourseListTab';
import { reducer as articleDetail } from './pages/ArticleDetail';

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        global,
        postList,
        courseList,
        courseCateList,
        courseAdd,
        courseListTab,
        articleDetail,
    });
