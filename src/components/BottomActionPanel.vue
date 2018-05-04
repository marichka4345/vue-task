<template>
  <div class="action-panel">
    <div v-if="isNew">
      <div class="add-button">
        <font-awesome-icon
          :icon="icons.add"
          @mouseover="toggleTitle"
          @mouseleave="toggleTitle"
          @click="saveNote"/>
        <transition name="fade">
          <span class="addTitle" v-if="isAddTitleVisible">Add note</span>
        </transition>
      </div>
    </div>

    <div v-else-if="isCommon">
      <router-link :to="`/edit/${noteItem.id}`">
        <font-awesome-icon :icon="icons.edit"/>
      </router-link>

      <font-awesome-icon :icon="icons.archieve" @click="$store.commit('archieve', noteItem.id)" />
    </div>

    <div v-else>
      <font-awesome-icon :icon="icons.rearchieve" @click="$store.commit('rearchieve', noteItem.id)"/>
    </div>
      
  </div>
</template>

<script>
// @flow
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import {
  faPlus, faEdit,
  faFolder, faUndo
} from '@fortawesome/fontawesome-free-solid'

import { INote, NoteMode } from '../shared/types'

export default {
  name: 'BottomActionPanel',
  components: {
    FontAwesomeIcon
  },
  props: {
    noteItem: INote, 
    mode: NoteMode
  },
  data (): { isAddTitleVisible: boolean } {
    return {
      isAddTitleVisible: false
    }
  },
  methods: {
    saveNote () {
      if (!this.noteItem.title.trim() || !this.noteItem.body.trim()) {
        return false
      }
      this.$emit('save')
    },
    toggleTitle () {
      this.isAddTitleVisible = !this.isAddTitleVisible
    }
  },
  computed: {
    isNew (): boolean {
      return this.mode === 'NEW'
    },
    isCommon (): boolean {
      return this.mode === 'COMMON'
    },
    icons () {
      return {
        add: faPlus,
        edit: faEdit,
        archieve: faFolder,
        rearchieve: faUndo
      }
    }
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

.addTitle {
  margin-left: 10px;
}

</style>
