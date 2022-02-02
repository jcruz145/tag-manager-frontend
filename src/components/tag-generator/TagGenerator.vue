<template>
  <v-container class="pl-0">
    <v-toolbar elevation="0">
      <v-toolbar-title><small>Tags</small></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        class="white--text"
        color="cyan"
        small
        :disabled="noTagsGenerated"
        @click="copyValue"
      >
        <v-icon left>mdi-content-copy</v-icon>
        Copy
      </v-btn>
      <v-btn
        class="ml-4 white--text"
        color="cyan"
        small
        @click="generateTags()"
        :disabled="!atLeastOneCategorySelected"
      >
        <v-icon left>mdi-autorenew</v-icon>
        Generate
      </v-btn>
    </v-toolbar>

    <v-textarea :value="generatedTags" filled readonly auto-grow></v-textarea>
    <v-btn
      block
      class="white--text"
      color="red"
      small
      v-if="!noTagsGenerated"
      @click="clearAppData"
    >
      Reset
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["generatedTags", "atLeastOneCategorySelected"]),
    noTagsGenerated() {
      return this.generatedTags.length <= 0;
    },
  },

  methods: {
    ...mapActions(["generateTags", "clearAppData"]),
    async copyValue() {
      await navigator.clipboard.writeText(this.generatedTags);
    },
  },
};
</script>