// @flow

<template>
  <div class="note-list">
    <h1>My Notes</h1>
    <div class="container">
      <Note 
        v-for="item in list" 
        :key="item.id" 
        :item="item"
        :mode="noteMode" />
    </div>
  </div>
</template>

<script>
import { NoteMode } from '../shared/types'
import Note from './Note/Note'

export default {
	name: 'NoteList',
	components: {
		Note
	},
	props: [
		'list'
	],
	data (): { noteMode: NoteMode } {
		return {
			noteMode: 'COMMON'
		}
	}
}
</script>
