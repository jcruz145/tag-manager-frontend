import Vue from 'vue';
import Vuex from 'vuex';
import CategoryData from '../dummy-data/CategoryData.json';
import helpers from '../helpers/helpers';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    categories: CategoryData.categories,
    selectedCategories: [],
    availableQuantities: [5,10,15,20,25,30],
    selectedQuantity: 10,
    histories: [
      {
        id: 'history1',
        label: 'History 1',
        value: ''
      },
      {
        id: 'history2',
        label: 'History 2',
        value: ''
      },
    ],
    generatedTags: '',
    stepper: {
      tracker: 1,
      welcomeSeen: true,
      categoriesSeen: false,
      historicalSeen: false,
    }
  },

  getters: {
    categories: state => {
      return state.categories;
    },
    selectedCategories: state => {
      return state.selectedCategories;
    },
    atLeastOneCategorySelected: state => {
      return state.selectedCategories.length > 0;
    },
    histories: state => {
      return state.histories;
    },
    completeHistories: state => {
      return state.histories.filter(history => {
        return history.value.length > 0;
      })
    },
    availableQuantities: state => {
      return state.availableQuantities;
    },
    selectedQuantity: state => {
      return state.selectedQuantity;
    },
    generatedTags: state => {
      return state.generatedTags;
    },
    stepperData: state => {
      return state.stepper;
    }
  },

  mutations: {
    selectCategory: (state, id) => {
      state.selectedCategories.includes(id) && state.selectedCategories.push(id);
    },
    deselectCategory: (state, id) => {
      state.selectedCategories.splice(state.selectedCategories.indexOf(id), 1);
    },
    toggleSelectedCategory: (state, id) => {
      state.selectedCategories.includes(id)
        ? state.selectedCategories.splice(state.selectedCategories.indexOf(id), 1)
        : state.selectedCategories.push(id);
    },
    clearCategorySelects: state => {
      state.selectedCategories = [];
    },
    clearAppData: state => {
      state.selectedCategories = [];
      state.generatedTags = '';
      state.histories.forEach(history => {
        history.value = '';
      });
    },
    clearHistory: (state, id) => {
      const histIndex = helpers.getIndexFromObjectArray(state.histories, id);
      state.histories[histIndex].value = '';
    },
    setQuantity: (state, idx) => {
      state.selectedQuantity = state.availableQuantities[idx];
    },
    setStepperTracker: (state, tracker) => {
      state.stepper.tracker = tracker;
    },
    setCategoriesSeen: (state, seen) => {
      state.stepper.categoriesSeen = seen;
    },
    setHistoricalSeen: (state, seen) => {
      state.stepper.historicalSeen = seen;
    },
    nextStep: (state) => {
      state.stepper.tracker++;
    },
    generateTags: (state) => {
      let tags = [], selectedTagsString = '', historical = '', overused = [], limited = [];

      state.histories.forEach(history => {
        historical += history.value + ' ';
      });

      overused = helpers.getDuplicateTags(helpers.getTagArrayFromString(historical));

      limited = helpers.stringArrayToString(overused);

      state.selectedCategories.forEach(category => {
        selectedTagsString += helpers.getObjectFromObjectArray(state.categories, category).tags + ' ';
      });

      tags = helpers.getTagArrayFromString(selectedTagsString);

      tags = helpers.excludeTags(tags, overused);

      tags = helpers.shuffleAndPrune(tags, state.selectedQuantity);

      state.generatedTags = helpers.stringArrayToString(tags);
    }
  },

  actions: {
    selectCategory: ({ commit }, payload) => {
      commit('selectCategory', payload.id);
    },
    deselectCategory: ({ commit }, payload) => {
      commit('deselectCategory', payload.id);
    },
    toggleSelectedCategory: ({ commit }, payload) => {
      commit('toggleSelectedCategory', payload.id);
    },
    clearCategorySelects: ({ commit }) => {
      commit('clearCategorySelects');
    },
    clearAppData: ({ commit }) => {
      commit('clearAppData');
    },
    clearHistory: ({ commit }, payload) => {
      commit('clearHistory', payload.id);
    },
    setQuantity: ({ commit }, payload) => {
      commit('setQuantity', payload.idx);
    },
    setStepperTracker: ({ commit }, payload) => {
      commit('setStepperTracker', payload.tracker);
      switch (payload.tracker) {
        case 2:
          commit('setCategoriesSeen', true);
          break;
      
        default:
          break;
      }
    },
    setCategoriesSeen: ({ commit }, payload) => {
      commit('setCategoriesSeen', payload.seen);
    },
    setHistoricalSeen: ({ commit }, payload) => {
      commit('setHistoricalSeen', payload.seen);
    },
    nextStep: ({ commit }) => { commit('nextStep')},
    generateTags: ({ commit }) => {
      commit('generateTags');
    }
  },


});