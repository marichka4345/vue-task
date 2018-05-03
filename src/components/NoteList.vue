<template>
  <div class="note-list">
    <h1>My Notes</h1>
    <div class="container">
      <Note 
        v-for="item in list" 
        :key="item.id" 
        :item="item"
        mode="COMMON" />
    </div>
  </div>
</template>

<script>
import Note from './Note'

export default {
  name: 'NoteList',
  components: {
    Note
  },
  props: [
    'list'
  ]
}
</script>
