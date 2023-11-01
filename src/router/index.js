import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import CategoryAdd from "../views/CategoryAdd.vue";
import Order from "../views/Order.vue";
import Users from "../views/components/UserList.vue";
import imageUpload from "../views/components/ImageUploader.vue"
import monthlyUpload from "../views/components/MonthlyUploader.vue"
import videoUpload from "../views/components/VideoUploader.vue"

function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/category",
    name: "categoryAdd",
    component: CategoryAdd,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/imageUpload",
    name: "imageUpload",
    component: imageUpload,
  },
  {
    path: "/monthlyUpload",
    name: "monthlyUpload",
    component: monthlyUpload,
  },
  {
    path: "/videoUpload",
    name: "videoUpload",
    component: videoUpload,
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Signin" && to.name !== "Signup") {
    // Exclude Signin and Signup routes from permission check
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("USER"))) {
        next();
      } else {
        next('/signin');
      }
    } else {
      next('/signin');
    }
  } else {
    next();
  }
});

export default router;
