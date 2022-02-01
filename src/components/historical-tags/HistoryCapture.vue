<template>
  <v-container fluid>
    <v-toolbar elevation="0">
      <v-toolbar-title>{{ history.label }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab x-small dark elevation="0" color="cyan" @click="pasteValue">
        <v-icon>mdi-content-paste</v-icon>
      </v-btn>
      <v-btn
        class="ml-2"
        fab
        x-small
        dark
        elevation="0"
        color="pink"
        @click="clearValue"
        v-if="!noHistValue"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-toolbar>
    <v-textarea solo auto-grow v-model="history.value"></v-textarea>
  </v-container>
</template>

<script>
export default {
  props: ["histData"],

  computed: {
    history() {
      return this.histData;
    },
    noHistValue() {
      return this.history.value.length <= 0;
    },
  },

  methods: {
    async pasteValue() {
      const value = await navigator.clipboard.readText();
      this.history.value = value;
    },
    clearValue() {
      this.history.value = "";
    },
  },
};
</script>