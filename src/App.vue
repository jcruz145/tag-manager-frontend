<template>
  <v-app>
    <v-app-bar color="white" app dense elevate-on-scroll>
      <v-icon>mdi-pound-box</v-icon>
      <v-app-bar-title>Tag Manager</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="clearAppData">
        <v-icon> mdi-autorenew </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-expansion-panels>
        <category-selector></category-selector>
        <historical-tags></historical-tags>
        <quantity-selector></quantity-selector>
        <tag-generator></tag-generator>
      </v-expansion-panels>
    </v-main>
  </v-app>
</template>

<script>
import CategorySelector from "./components/category-selector/CategorySelector.vue";
import HistoricalTags from "./components/historical-tags/HistoricalTags.vue";
import QuantitySelector from "./components/quantity-selector/QuantitySelector.vue";
import TagGenerator from "./components/tag-generator/TagGenerator.vue";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    CategorySelector,
    HistoricalTags,
    QuantitySelector,
    TagGenerator,
  },

  methods: {
    ...mapActions(["clearAppData"]),
  },
};
</script>
