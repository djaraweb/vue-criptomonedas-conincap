<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
      <router-link class="navbar-brand" :to="{name:'home'}">
        <px-icon class="mr-2" />
        {{ title }}
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-for="l in links" :key="l.title">
            <router-link class="nav-link" :to="l.to">{{ l.title }}</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'about'}">About</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import PxIcon from "@/components/PxIcon";

export default {
  name: "vue-header",
  components: { PxIcon },
  props: {
    title: { type: String },
    links: { type: Array, default: () => [], required: true }
  }
};
</script>

<style scoped>
nav > a {
  color: white !important;
  font-weight: bold;
}
nav > div > ul > li > a {
  color: white !important;
  font-weight: 600;
}
</style>
