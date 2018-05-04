// @flow

<template>
  <div class="edit-note">
    <h2>Edit note</h2>
    <div class="note">
      <div class="row">
        <label for="title">Title:</label><input id="title" v-model="note.title" />
      </div>
      <div class="row">
        <label for="body">Text:</label><textarea id="body" v-model="note.body" />
      </div>

      <router-link to="/">
        <button class="save-btn">Save</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { INote } from '../shared/types'
import Note from './Note/Note'

export default {
	name: 'EditNote',
	components: {
		Note
	},
	computed: {
		note (): INote {
			const id = this.$route.params.id
			return this.$store.state.notes.find(note => String(note.id) === id)
		}
	}
}
</script>

<style scoped>

input,
textarea {
  font-size: 20px;
  width: 75%;
  border-bottom: 2px solid black;
}


.note {
  font-size: 20px;
  display: flex;
  flex-direction: column;
}

.row {
  width: 50%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

.save-btn {
  background: transparent;
  font-size: 21px;
  border: 1px solid black;
  padding: 10px 30px;
  cursor: pointer;
}

</style>
