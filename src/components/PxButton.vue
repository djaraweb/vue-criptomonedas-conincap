<template>
  <button class="btn btn-outline-primary btn-sm" @click="buttonClick">
    <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
    <span v-show="!isLoading">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "PxButton",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit("custom-click");
    }
  }
};
</script>