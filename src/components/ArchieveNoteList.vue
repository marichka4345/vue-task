<template>
	<div class="archieved-note-list">
		<h2>Archieved Notes</h2>
		<div class="container">
			<p class="empty-list-message" v-if="!list.length">The is no archieved notes</p>
			<Note v-else
						v-for="item in list"
						:key="item.id"
						:item="item"
						:mode="noteMode" />
		</div>
	</div>
</template>

<script>
// @flow
import { INote, NoteMode } from '../shared/types'
import Note from './Note'

export default {
  name: 'ArchievedNoteList',
	  components: {
    	Note
	  },
		data(): { noteMode: NoteMode } {
			return {
				noteMode: 'ARCHIEVE'
			}
		},
	  computed: {
			list (): INote[] {
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
