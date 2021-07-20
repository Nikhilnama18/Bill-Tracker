<template>
  <div>
    <button
      @click="Submit"
      id="submit"
      :style="{ background: color }"
      class="btn"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  methods: {
    Submit() {
      this.$emit("signin");
    },
  },
  props: {
    title: String,
    color: String,
  },
};
</script>