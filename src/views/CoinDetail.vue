<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="asset.id && icon_image">
      <div class="row">
        <div class="col-md-4 col-sm-12">
          <img
            :src="`https://static.coincap.io/assets/icons/${icon_image}@2x.png`"
            :alt="asset.name"
            class="img-fluid img-center"
          />
          <h1>
            {{ asset.name }}
            <small class="text-muted">{{ asset.symbol }}</small>
          </h1>
        </div>
        <div class="col-md-4 col-sm-12">
          <ul class>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <b class="text-secondary uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="container">
            <div class="row mb-2 mt-2">
              <div class="col-12">
                <button @click="toggleConverter" class="btn btn-primary btn-block">
                  {{
                  fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD`
                  }}
                </button>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-12">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="convertValue"
                  :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <span class="text-secondary">
                  {{ convertResult }}
                  {{ fromUsd ? asset.symbol : 'USD' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <line-chart
          width="100%"
          height="500px"
          :colors="['orange']"
          :min="min"
          :max="max"
          :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
        />
      </div>
      <h3 class="m-2">Mejores Ofertas de Cambio</h3>
      <table class="table">
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :isLoading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)"
            >
              <slot>Obtener Link</slot>
            </px-button>

            <a v-else class="btn btn-outline-secondary btn-sm" target="_blanck">{{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import PxButton from "@/components/PxButton";
export default {
  name: "CoinDetail",
  components: {
    PxButton
  },
  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      icon_image: "",
      fromUsd: true,
      convertValue: null
    };
  },
  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      let result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    }
  },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getWebSite(exchange) {
      this.$set(exchange, "isLoading", true);

      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => {
          this.$set(exchange, "isLoading", false);
        });
    },
    getCoin() {
      this.isLoading = true;
      let id = this.$route.params.id;

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.icon_image = asset.symbol.toLowerCase();
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
      /*
      api.getAsset(id).then(asset => {
        this.asset = asset;
        this.icon_image = asset.symbol.toLowerCase();
      });*/
    }
  },
  created() {
    this.getCoin();
  },
  watch: {
    $route() {
      this.getCoin();
    }
  }
};
</script>

<style scoped>
.img-center {
  display: block;
  margin: auto;
}
.uppercase {
  text-transform: uppercase;
}
span {
  font-weight: bold;
}
</style>
