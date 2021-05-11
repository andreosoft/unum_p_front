import store from "@/store/index";

export default {
  routes: [
    {
      path: "/index",
      name: "index",
      meta: { auth: 100 },
      component: () => {
        return import("@/views/index/index.vue");
      }
    },
    {
      path: "/schedule",
      name: "schedule",
      meta: { auth: 100 },
      component: () => import("@/views/unum/schedule/index.vue")
    },
    {
      path: "/orders",
      name: "orders",
      meta: { auth: 100 },
      component: () => import("@/views/unum/orders/index.vue")
    },
    // {
    //     path: '/doctors',
    //     name: 'doctors',
    //     meta: { auth: 100 },
    //     component: () =>
    //         import('@/views/unum/doctors/index.vue')
    // },
    {
      path: "/doctors",
      name: "doctors",
      meta: { auth: 100 },
      component: () => import("@/views/unum/doctors/index.vue")
    },
    {
      path: "/patients",
      name: "patients",
      meta: { auth: 100 },
      component: () => import("@/views/unum/patients/index.vue")
    },
    {
      path: "/patients/:id",
      name: "patients_view",
      meta: { auth: 100 },
      component: () => import("@/views/unum/patients/view.vue")
    },

    {
      path: "/basic/:api/:view",
      name: "basic_index",
      meta: { auth: 1 },
      component: () => import("@/views/basic/index.vue")
    },
    {
      path: "/basic/:api/:view/:id",
      name: "basic_view",
      meta: { auth: 1 },
      component: () => import("@/views/basic/view.vue")
    }
  ]
};
