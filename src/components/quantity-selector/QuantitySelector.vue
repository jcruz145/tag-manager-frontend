<template>
  <v-container>
    <v-toolbar elevation="2">
      <v-row>
        <v-col cols="8"
          ><v-toolbar-title>Desired Quantity</v-toolbar-title></v-col
        >
        <v-col cols="4">
          <v-select
            v-model="quantity"
            :items="availableQuantities"
            prepend-icon="mdi-pound-box-outline"
            hide-details
            single-line
            menu-props="auto"
          ></v-select>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["availableQuantities"]),
    quantity: {
      get() {
        return this.$store.getters.selectedQuantity;
      },
      set(value) {
        this.$store.dispatch("setQuantity", {
          idx: this.availableQuantities.indexOf(value),
        });
      },
    },
  },

  methods: {
    ...mapActions(["setQuantity"]),
  },
};
</script>