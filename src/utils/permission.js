// 存储的是角色对应的权限名称

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
    {
      name:'ProductEdit'
    }
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
      name:'ProductEdit'
    },
    {
      name: 'Category',
    },
  ],
};

export default function getMenuRoute(role, routes) {
  // 有权限的路由名称
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    //   r代表所有的路由名称
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const {
        children
      } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  })
  return resultRoutes;
}
