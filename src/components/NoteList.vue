<template>
  <div class="note-list">
    <h1>My Notes</h1>
    <div class="container">
      <Note 
        v-for="item in list" 
        :key="item.id" 
        :item="item" 
        @delete="deleteNote"
        @edit="editNote" />
    </div>
  </div>
</template>

<script>
import Note from './Note';

export default {
  name: 'NoteList',
  components: {
    Note
  },
  props: [
    'list'
  ],
  methods: {
    deleteNote(id) {
      this.$emit('delete', id);
    },
    editNote(note) {
      
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
