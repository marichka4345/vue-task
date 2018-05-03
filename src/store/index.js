import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    load(state, list) {
      state.notes = [...list];
    },
    add(state, note) {
      state.notes = [...state.notes, note];
    },
    delete(state, id) {
      let elementIndex;
      state.notes.find((note, index) => {
          elementIndex = index;
          return note.id === id;
      });
      state.notes = [
        ...state.notes.slice(0, elementIndex),
        ...state.notes.slice(elementIndex + 1)
      ];
    }
  }
})