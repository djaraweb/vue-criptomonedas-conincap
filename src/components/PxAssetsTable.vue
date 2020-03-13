<template>
  <div class="container-fluid">
    <div class="table-responsive-sm">
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th :class="{up: this.sortOrder===1, down: this.sortOrder===-1}">
              <span class="underline" @click="changeOrder">Ranking</span>
            </th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cap. de Mercado</th>
            <th scope="col">Variación 24hs</th>
            <th>
              <input
                class="form-control mr-sm-1"
                type="search"
                placeholder="Search"
                v-model="filter"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in filteredAssets">
            <px-row-table :row="item" :key="item.id" />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PxRowTable from "@/components/PxRowTable";

export default {
  name: "PxAssetsTable",
  components: { PxRowTable },
  data() {
    return {
      filter: "",
      sortOrder: 1
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    filteredAssets() {
      /*if (!this.filter) {
        return this.assets;
      }*/
      let txt_filtro = this.filter.toLowerCase();
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          a =>
            a.symbol.toLowerCase().includes(txt_filtro) ||
            a.name.toLowerCase().includes(txt_filtro)
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    }
  },
  methods: {
    changeOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}
.underline {
  text-decoration: underline;
  cursor: pointer;
}
/*
td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}*/
/*
@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}*/
</style>
