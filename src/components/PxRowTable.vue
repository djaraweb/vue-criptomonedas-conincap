<template>
  <tr>
    <td>
      <img
        :src="`https://static.coincap.io/assets/icons/${row.symbol.toLowerCase()}@2x.png`"
        :alt="row.name"
      />
    </td>
    <td>
      <b>#{{ row.rank }}</b>
    </td>
    <td>
      <router-link
        :to="{name: 'coin-detail', params: {id:row.id }}"
        class="text-success"
      >{{ row.name }}</router-link>
      <small class="m-1 text-muted" v-text="row.symbol"></small>
    </td>
    <td>{{ row.priceUsd | dollar }}</td>
    <td>{{ row.marketCapUsd | dollar }}</td>
    <td
      :class="row.changePercent24Hr.includes('-') ? 'text-danger' : 'text-success'"
    >{{ row.changePercent24Hr | percent }}</td>
    <td>
      <px-button @custom-click="goToCoin(row.id)">
        <span>Detalles</span>
      </px-button>
    </td>
  </tr>
</template>

<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxRowTable",
  components: { PxButton },
  props: {
    row: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    goToCoin(id) {
      //console.log(id);
      this.$router.push({ name: "coin-detail", params: { id } });
    }
  }
};
</script>
<style scoped>
img {
  height: 20px;
}
</style>
