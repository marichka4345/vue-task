<template>
  <div>
    <div class="top-container">
      <Note :item="emptyItem" isNew="true" isEdited="true" @save="saveNote"/>
      <SearchForm @search="searchNote"/>
    </div>
    
    <NoteList :list="list" @delete="deleteNote" />
  </div>
</template>

<script>
import axios from 'axios';
import * as uuidv1 from 'uuid/v1';
import SearchForm from './SearchForm';
import Note from './Note';
import NoteList from './NoteList';

export default {
  name: 'app',
  components: {
    SearchForm,
    NoteList,
    Note
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
      this.list = this.$store.state.notes;
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    actualNotes(newVal) {
      this.list = newVal;
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
.top-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.add-new-btn {
  border: 0;
  border-radius: 28px;
  color: #736c73;
  font-size: 20px;
  background: #eff7fc;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}
</style>
