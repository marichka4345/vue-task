import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: []
	},
	getters: {
		archievedNotes: state => {
			return state.notes.filter(note => note.archieved)
		},
		activeNotes: state => {
			return state.notes.filter(note => !note.archieved)
		}
	},
	mutations: {
		load (state, list) {
			state.notes = [...list]
		},
		add (state, note) {
			state.notes = [...state.notes, note]
		},
		delete (state, id) {
			let elementIndex
			state.notes.find((note, index) => {
				elementIndex = index
				return note.id === id
			})
			state.notes = [
				...state.notes.slice(0, elementIndex),
				...state.notes.slice(elementIndex + 1)
			]
		},
		archieve (state, id) {
			let elementIndex
			const oldNote = state.notes.find((note, index) => {
				elementIndex = index
				return note.id === id
			})
			const newNote = { ...oldNote, archieved: true }
			state.notes = [
				...state.notes.slice(0, elementIndex),
				newNote,
				...state.notes.slice(elementIndex + 1)
			]
		},
		rearchieve (state, id) {
			let elementIndex
			const oldNote = state.notes.find((note, index) => {
				elementIndex = index
				return note.id === id
			})
			const newNote = { ...oldNote, archieved: false }
			state.notes = [
				...state.notes.slice(0, elementIndex),
				newNote,
				...state.notes.slice(elementIndex + 1)
			]
		}
	}
})
