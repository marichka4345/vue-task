<template>
	<div class="archieved-note-list">
		<h2>Archieved Notes</h2>
		<div class="container">
			<p class="empty-list-message" v-if="!list.length">The is no archieved notes</p>
			<Note v-else
						v-for="item in list"
						:key="item.id"
						:item="item"
						mode="ARCHIEVE" />
		</div>
	</div>
</template>

<script>
	import Note from './Note'

export default {
  name: 'ArchievedNoteList',
	  components: {
    Note
	  },
	  computed: {
    list () {
      return this.$store.getters.archievedNotes
	    }
	  }
}
</script>

<style scoped>
	.empty-list-message {
		width: 100%;
	}
</style>
