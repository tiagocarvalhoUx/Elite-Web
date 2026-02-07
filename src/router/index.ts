import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores";

// Layouts
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

// Views - Public
import HomeView from "../views/HomeView.vue";

// Views - Admin
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminProjects from "../views/admin/AdminProjects.vue";
import AdminProjectForm from "../views/admin/AdminProjectForm.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "projects",
        name: "AdminProjects",
        component: AdminProjects,
      },
      {
        path: "projects/new",
        name: "AdminProjectNew",
        component: AdminProjectForm,
      },
      {
        path: "projects/edit/:id",
        name: "AdminProjectEdit",
        component: AdminProjectForm,
        props: true,
      },
    ],
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { guestOnly: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Navigation Guards
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticação para rotas protegidas
  if (to.meta.requiresAuth) {
    const isAuth = await authStore.checkAuth();
    if (!isAuth) {
      return next("/admin/login");
    }
  }

  // Redirecionar usuários logados da página de login
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next("/admin");
  }

  next();
});

export default router;
