<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-chip
        v-for="history in histories"
        :key="history.id"
        :color="history.value ? 'green' : ''"
        :text-color="history.value ? 'white' : ''"
        :input-value="history.value"
        filter
        class="ml-1 my-1"
        small
      >
        {{ history.label }}
      </v-chip>
    </v-col>
    <v-col>
      <history-capture
        v-for="history in histories"
        :key="history.id"
        :histData="history"
      ></history-capture>
    </v-col>
  </v-row>
</template>

<script>
import HistoryCapture from "./HistoryCapture.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    HistoryCapture,
  },

  computed: {
    ...mapGetters(["histories", "completeHistories"]),
  },

  data: () => ({}),
};
</script>