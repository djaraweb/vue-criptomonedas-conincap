<template>
  <main>
    <px-header title="CryptoExchange" :links="links" />
    <hr />
    <router-view />
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader.vue";

export default {
  name: "app",
  components: {
    PxHeader
  },
  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } }
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } }
        },
        {
          title: "XRP",
          to: { name: "coin-detail", params: { id: "ripple" } }
        }
      ]
    };
  }
};
</script>

<style></style>
