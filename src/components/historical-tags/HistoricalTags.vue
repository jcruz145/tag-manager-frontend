<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="12"> Historical Tags </v-col>
            <v-fade-transition leave-absolute>
              <v-col cols="12" v-if="!open">
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
            </v-fade-transition>
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