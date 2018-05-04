<template>
  <div class="home">
    <div class="top-container">
      <Note :item="noteItem" :mode="noteMode" @save="saveNote"/>
      <SearchForm @search="searchNote"/>
    </div>
    
    <NoteList :list="list" />
    <NavigateMenu />
  </div>
</template>

<script>
// @flow
import * as uuidv1 from 'uuid/v1'
import axios from 'axios'

import { INote, NoteMode } from '../shared/types'

import SearchForm from './SearchForm'
import Note from './Note'
import NoteList from './NoteList'
import NavigateMenu from './NavigateMenu'

const emptyItem = {
  title: '',
  body: ''
}

export default {
  name: 'Home',
  components: {
    SearchForm,
    NoteList,
    Note,
    NavigateMenu
  },
  data: function (): { list: INote[], noteItem: INote, noteMode: NoteMode } {
    return {
      list: [],
      noteItem: { ...emptyItem },
      noteMode: 'NEW'
    }
  },
  async created () {
    try {
      if (!this.$store.state.notes.length) {
        const { data } = await axios.get('http://localhost:3000/notes')
        this.$store.commit('load', data)
        return
      }
      this.list = this.$store.getters.activeNotes
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    actualNotes () {
      this.list = this.$store.getters.activeNotes
    }
  },
  methods: {
    saveNote (item) {
      const id = uuidv1()
      this.$store.commit('add', { ...item, id })
      this.noteItem = { ...emptyItem }
    },
    searchNote (searchString) {
      this.list = this.$store.state.notes.filter(note => {
        return note.body.indexOf(searchString) !== -1 ||
        note.title.indexOf(searchString) !== -1
      })
    }
  },
  computed: {
    actualNotes () {
      return this.$store.state.notes
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
