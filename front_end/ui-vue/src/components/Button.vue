<template>
  <div>
    <button
      @click="$emit('click')"
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
  props: {
    title: String,
    color: String,
  },
  emits: ["click"],
};
</script>