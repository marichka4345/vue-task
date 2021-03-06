import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import EditNote from '../components/EditNote'
import ArchievedNoteList from '../components/ArchieveNoteList'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Home
		}, {
			path: '/edit/:id',
			component: EditNote
		}, {
			path: '/notes/archieved',
			component: ArchievedNoteList
		}
	]
})
