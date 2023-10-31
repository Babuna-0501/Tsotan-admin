<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Барааны жагсаалт'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/add"
          :class="getRoute() === 'add' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Бараа нэмэх'"
          @click="reloadPage"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/category"
          :class="getRoute() === 'categoryAdd' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Категори нэмэх'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/order"
          :class="getRoute() === 'order' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'تسجيل الدخول' : 'Захиалгын түүх'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Хэрэглэгч нэмэх'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/users"
          :class="getRoute() === 'users' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Хэрэглэгчид'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <aside class="menu-side" style="cursor: pointer; margin-top: 10px;">
          <ul>
          <li @click="toggleDropdown" style="list-style-type: none; font-size: 14px; margin-left: 1.5px;" >   <i class="ni ni-collection text-info text-sm opacity-10 ml-5"></i><span style="margin-left: 12px;">Категори</span></li>
          <ul v-if="isDropdownOpen">
            <li><sidenav-item url="/categor1" :class="getRoute() === 'categor1' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'categor1'"/></li>
            <li><sidenav-item url="/categor2" :class="getRoute() === 'categor2' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'categor2'"/></li>
            <li><sidenav-item url="/categor3" :class="getRoute() === 'categor3' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'categor3'"/></li>
          </ul>
        </ul>
      </aside>
      <aside class="menu-side" style="cursor: pointer; margin-top: 25px;">
          <ul>
          <li @click="toggleDropdown1" style="list-style-type: none; font-size: 14px; margin-left: 1.5px;" >   <i class="ni ni-collection text-info text-sm opacity-10 ml-5"></i><span style="margin-left: 12px;">Нүүр хуудас удирдах</span></li>
          <ul v-if="isDropdownOpen1">
            <li><sidenav-item url="/control1" :class="getRoute() === 'control1' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'Home slider солих'"/></li>
            <li><sidenav-item url="/control2" :class="getRoute() === 'control2' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'monthly deal солих'"/></li>
            <li><sidenav-item url="/control3" :class="getRoute() === 'control3' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'video солих'"/></li>
            <li><sidenav-item url="/control4" :class="getRoute() === 'control4' ? 'active' : ''" :navText="this.$store.state.isRTL ? 'اشتراك' : 'bottom banner солих'"/></li>
          </ul>
        </ul>
      </aside>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Tsotan",
      controls: "dashboardsExamples",
      isActive: "active",
      isDropdownOpen: false,
      isDropdownOpen1: false,
    };
  },
  components: {
    SidenavItem,
  },
  mounted() {
    // this.checkPermission();
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    },

    checkPermission() {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = this.decodeToken(token);
        if (
            decodedToken &&
            (decodedToken.roles.includes("ADMIN") || decodedToken.roles.includes("USER"))
        ) {
          return true;
        } else {
          this.$router.push("/signin");
          return false;
        }
      }
      this.$router.push("/signin");
      return false;
    },
    decodeToken(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = atob(base64);
        return JSON.parse(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    },
  },
};
</script>
