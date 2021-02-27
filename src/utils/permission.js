// 权限管理,存储的是角色对应的权限名称
const roleToRoute = {
  customer: [{
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
  ],
  admin: [{
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
  ],
};
/**
 * 过滤掉没有权限的路由
 * @param {String} role   角色名称
 * @param {Array} routes 所有的路由信息
 * 获取权限中的名称
 * 和所有路由中的名称进行对比，如果一样，就渲染，还要渲染二级菜单
 * 最终返回筛选过的路由信息，在router中进行渲染
 */
export default function getMenuRoute(role, routes) {
  console.log(role, routes);
  //   权限对应的路由名称
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    // 当前的路由名称
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const {
        children
      } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
