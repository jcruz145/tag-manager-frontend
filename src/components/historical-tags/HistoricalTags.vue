<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-alert colored-border type="info" class="pa-0" v-if="true">
        <small
          >Optionally, you can paste in your most recently used tags below, this
          helps make sure you aren't using the same tag too many times!</small
        >
      </v-alert>
    </v-col>
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
        label
      >
        {{ history.label }}
      </v-chip>
    </v-col>
    <v-col cols="12">
      <v-btn
        :color="noCompleteHistories ? '' : 'cyan'"
        :class="noCompleteHistories ? '' : 'white--text'"
        small
        class="ml-1 my-1"
        @click="nextStep"
      >
        <span v-if="noCompleteHistories">skip</span>
        <span v-else>next</span>
      </v-btn>
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
    noCompleteHistories() {
      return this.completeHistories.length <= 0;
    },
  },

  methods: {
    ...mapActions(["nextStep"]),
  },
};
</script>