<template>
  <div>
    <div class="d-flex justify-content-center">
      <bounce-loader :loading="isloading" :color="'#68d391'" :size="100" />
    </div>
    <px-assets-table v-if="!isloading" :assets="assets" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable.vue";

export default {
  name: "Home",
  components: {
    PxAssetsTable
  },
  data() {
    return {
      isloading: false,
      assets: []
    };
  },

  created() {
    this.isloading = true;
    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isloading = false));
  }
};
</script>
