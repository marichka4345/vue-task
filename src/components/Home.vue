<template>
  <div class="home">
    <div class="top-container">
      <Note :item="emptyItem" mode="NEW" @save="saveNote"/>
      <SearchForm @search="searchNote"/>
    </div>
    
    <NoteList :list="list" @delete="deleteNote" />

    <NavigateMenu />
  </div>
</template>

<script>
import axios from 'axios';
import * as uuidv1 from 'uuid/v1';
import SearchForm from './SearchForm';
import Note from './Note';
import NoteList from './NoteList';
import NavigateMenu from './NavigateMenu';

export default {
  name: 'app',
  components: {
    SearchForm,
    NoteList,
    Note,
    NavigateMenu
  },
  data: function() {
    return {
      list: [],
      emptyItem: {
        title: '',
        body: ''
      }
    }
  },
  async created() {
    try {
      if (!this.$store.state.notes.length) {
        const {data} = await axios.get('http://localhost:3000/notes');
        this.$store.commit('load', data);
        return;
      }
      this.list = this.$store.getters.activeNotes;
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    actualNotes() {
      this.list = this.$store.getters.activeNotes;
    }
  },
  methods: {
    deleteNote(id) {
      this.$store.commit('delete', id);
    },
    saveNote(item) {
      const id = uuidv1();
      this.$store.commit('add', {...item, id});
      this.emptyItem = {
        title: '',
        body: ''
      };
    },
    searchNote(searchString) {
      this.list = this.$store.state.notes.filter(note => {
        return note.body.indexOf(searchString) !== -1
        || note.title.indexOf(searchString) !== -1;
      });
    }
  },
  computed: {
    actualNotes() {
      return this.$store.state.notes;
    }
  }
}
</script>

<style>
  .home {
    height: 600px;
  }

  .top-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
