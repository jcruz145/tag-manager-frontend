<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template>
          <v-row no-gutters>
            <v-col cols="12"> Categories </v-col>
            <v-col cols="12">
              <v-container>
                <span
                  class="secondary--text"
                  v-if="!selectedCategories.length > 0"
                >
                  Select atleast 1 category
                </span>
                <v-row v-else>
                  <v-col
                    v-for="category in selectedCategories"
                    :key="category"
                    class="shrink"
                  >
                    <v-chip label color="cyan" text-color="white">
                      <v-icon left>mdi-check</v-icon>
                      {{ category }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-toolbar flat color="transparent">
          <v-btn
            v-if="selectedCategories.length > 0"
            color="gray"
            text-color="white"
            @click="clearCategorySelects()"
          >
            <v-icon left>mdi-autorenew</v-icon>
            Reset
          </v-btn>
          <v-toolbar-title v-else>Select Tag Categories</v-toolbar-title>
          <v-spacer> </v-spacer>
          <v-btn v-if="!search" icon @click="$refs.search.focus()"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
          <v-btn v-else icon @click="resetSearch()"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-container class="py-0">
          <v-row align="center" justify="start">
            <v-col cols="12">
              <v-text-field
                ref="search"
                v-model="search"
                full-width
                hide-details
                label="search"
                single-line
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
      </v-expansion-panel-content>
    </v-expansion-panel>
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