<template>
  <v-container fluid>
    <v-textarea
      filled
      :label="history.label"
      auto-grow
      v-model="history.value"
      clearable
      clear-icon="mdi-close-circle"
    ></v-textarea>
  </v-container>
</template>

<script>
export default {
  props: ["histData"],

  computed: {
    history() {
      return this.histData;
    },
  },
};
</script>