<template>
  <v-container>
    <v-card elevation="2">
      <v-toolbar elevation="0">
        <v-toolbar-title>Generate Tags</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="cyan"
          light
          small
          @click="generateTags()"
          :disabled="!atLeastOneCategorySelected"
        >
          <v-icon left>mdi-autorenew</v-icon>
          Generate
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-textarea
          :value="generatedTags"
          outlined
          readonly
          label="Generated Tags"
          auto-grow
        ></v-textarea>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["generatedTags", "atLeastOneCategorySelected"]),
  },

  methods: {
    ...mapActions(["generateTags"]),
  },
};
</script>