<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template>
          <v-row no-gutters>
            <v-col cols="12"> Historical Tags </v-col>
            <v-col cols="12">
              <v-container
                ><v-row>
                  <v-col
                    class="shrink"
                    v-for="history in histories"
                    :key="history.id"
                  >
                    <v-chip
                      :color="history.value ? 'green' : ''"
                      :text-color="history.value ? 'white' : ''"
                      :input-value="history.value"
                      filter
                    >
                      {{ history.label }}
                    </v-chip>
                  </v-col>
                </v-row></v-container
              >
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <history-capture
          v-for="history in histories"
          :key="history.id"
          :histData="history"
        ></history-capture>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
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