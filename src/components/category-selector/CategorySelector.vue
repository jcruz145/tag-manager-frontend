<template>
  <v-container>
    <v-container>
      <span class="secondary--text" v-if="!selectedCategories.length > 0">
        Select atleast 1 category
      </span>
      <v-container v-else class="pl-0">
        <v-chip
          v-for="category in selectedCategories"
          :key="category"
          small
          label
          color="cyan"
          text-color="white"
          class="mr-1 my-1"
        >
          <v-icon left>mdi-check</v-icon>
          {{ category }}
        </v-chip>
      </v-container>
    </v-container>
    <v-container class="py-0">
      <v-btn
        v-if="selectedCategories.length > 0"
        color="gray"
        text-color="white"
        @click="clearCategorySelects()"
        small
      >
        <v-icon left>mdi-autorenew</v-icon>
        Reset
      </v-btn>
      <v-btn
        v-if="selectedCategories.length > 0"
        color="gray"
        text-color="white"
        @click="nextStep()"
        small
        class="ml-2"
      >
        Next
      </v-btn>
      <v-row align="center" justify="start">
        <v-col cols="12">
          <v-text-field
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="search"
            single-line
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>

        <v-col
          v-for="category in filteredCategories"
          :key="category.id"
          class="shrink"
        >
          <v-chip
            label
            @click="toggleSelectedCategory({ id: category.id })"
            :color="selectedCategories.includes(category.id) ? 'cyan' : ''"
            :text-color="
              selectedCategories.includes(category.id) ? 'white' : ''
            "
          >
            <v-icon left v-text="getCatIcon(category.id)"> </v-icon>
            {{ category.id }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
  }),

  computed: {
    ...mapGetters(["categories", "selectedCategories"]),
    filteredCategories() {
      const search = this.search.toLowerCase();

      if (!search && this.selectedCategories.length <= 0)
        return this.categories;

      return this.categories.filter((item) => {
        const text = item.id.toLowerCase();

        return this.selectedCategories.includes(item.id)
          ? false
          : text.indexOf(search) > -1;
      });
    },
  },

  methods: {
    ...mapActions([
      "selectCategory",
      "deselectCategory",
      "toggleSelectedCategory",
      "clearCategorySelects",
      "nextStep",
    ]),
    resetSearch() {
      this.search = "";
    },
    getCatIcon(id) {
      const category = this.categories.find((x) => x.id === id);
      return category.icon || "mdi-shape";
    },
  },
};
</script>