import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";
import CoinDetail from "@/views/CoinDetail";
import Error from "@/views/Error";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/appvuejs/cryptocurrencies/",
      name: "home",
      component: Home
    },
    {
      path: "/appvuejs/cryptocurrencies/about",
      name: "about",
      component: About
    },
    {
      path: "/appvuejs/cryptocurrencies/coin/:id",
      name: "coin-detail",
      component: CoinDetail
    },
    {
      path: "*",
      name: "error",
      component: Error
    }
  ]
});
