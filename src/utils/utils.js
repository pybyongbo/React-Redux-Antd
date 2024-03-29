import { parse, stringify } from 'qs';

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export function getRoutes(path, routerData) {
    console.log('mytest',routerData)
    let routes = Object.keys(routerData).filter(routePath => routePath.indexOf(path) === 0 && routePath !== path);
    routes = routes.map(item => item.replace(path, ''));
    const renderRoutes = routes.map(item => ({
        ...routerData[`${path}${item}`],
        key: `${path}${item}`,
        path: `${path}${item}`
    }));
    console.log('renderRoutes',renderRoutes)
    return renderRoutes;
}

export function filterData(data, field) {
  if (field === -1) {
    return data;
  }
  return data.filter(item => item.fieldType === field);
}
