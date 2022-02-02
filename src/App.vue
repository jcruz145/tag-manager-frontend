<template>
  <v-app>
    <v-app-bar dark app dense elevate-on-scroll>
      <v-icon>mdi-pound-box</v-icon>
      <v-app-bar-title>Tag Manager</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="clearAppData">
        <v-icon> mdi-autorenew </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-stepper vertical v-model="stepperCount">
          <!-- STEPPER 1 - Welcome to TagManager -->
          <v-stepper-step
            step="1"
            @click="stepperCount = 1"
            :complete="stepperData.welcomeSeen"
          >
            Welcome to TagManager!
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12"
                >This application helps you optimize your social media posts by
                helping you choose the right hashtags to drive meaningful and
                efficient discovery of your content.</v-col
              >
              <v-col cols="12"
                ><v-btn small class="ml-1 my-1" @click="nextStep">
                  next
                </v-btn></v-col
              >
            </v-row>
          </v-stepper-content>

          <!-- STEPPER 2 - Select Categories -->
          <v-stepper-step
            step="2"
            @click="stepperCount = 2"
            :complete="atLeastOneCategorySelected"
            :rules="[() => !categoriesError]"
          >
            Select Categories
            <small v-if="categoriesError"
              >You must select atleast 1 category</small
            >
          </v-stepper-step>
          <v-stepper-content step="2">
            <category-selector></category-selector>
          </v-stepper-content>

          <!-- STEPPER 3 - Historical Tags -->
          <v-stepper-step
            step="3"
            @click="stepperCount = 3"
            :complete="completeHistories.length > 0"
          >
            Historical Tags
          </v-stepper-step>
          <v-stepper-content step="3">
            <historical-tags></historical-tags>
          </v-stepper-content>

          <!-- STEPPER 4 - Generate Tags -->
          <v-stepper-step
            step="4"
            @click="stepperCount = 4"
            :complete="completeHistories.length > 0"
          >
            Generate Tags
          </v-stepper-step>
          <v-stepper-content step="4">
            <quantity-selector></quantity-selector>
            <tag-generator></tag-generator>
          </v-stepper-content>
        </v-stepper>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CategorySelector from "./components/category-selector/CategorySelector.vue";
import HistoricalTags from "./components/historical-tags/HistoricalTags.vue";
import QuantitySelector from "./components/quantity-selector/QuantitySelector.vue";
import TagGenerator from "./components/tag-generator/TagGenerator.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters([
      "stepperData",
      "selectedCategories",
      "completeHistories",
      "atLeastOneCategorySelected",
    ]),
    stepperCount: {
      set(value) {
        this.setStepperTracker({ tracker: value });
      },
      get() {
        return this.stepperData.tracker;
      },
    },
    categoriesError() {
      return (
        (this.stepperData.tracker > 2 || this.stepperData.categoriesSeen) &&
        !this.atLeastOneCategorySelected &&
        this.stepperData.tracker != 2
      );
    },
  },

  components: {
    CategorySelector,
    HistoricalTags,
    QuantitySelector,
    TagGenerator,
  },

  methods: {
    ...mapActions(["clearAppData", "setStepperTracker", "nextStep"]),
  },
};
</script>

<style>
.theme--light.v-application {
  background-color: lemonchiffon !important;
}
</style>