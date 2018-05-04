<template>
  <div :class="{
        'note': true,
        'note_inactive': isDone}">

    <TopActionPanel v-if="isCommon" :noteItem="noteItem" @markDone="markAsDone"/>

    <input class="title" placeholder="Title" v-model="noteItem.title" :disabled="!isNew" />
    <textarea class="body" placeholder="Take a note..." v-model="noteItem.body" :disabled="!isNew" />

    <BottomActionPanel :noteItem="noteItem" @save="$emit('save', noteItem)" :mode="mode" />
  </div>
</template>

<script>
// @flow
import { INote, NoteMode } from '../shared/types'
import EditNote from './EditNote'
import TopActionPanel from './TopActionPanel'
import BottomActionPanel from './BottomActionPanel'

export default {
  name: 'Note',
  components: {
    EditNote,
    TopActionPanel,
    BottomActionPanel
  },
  data () {
    return {
      isDone: false
    }
  },
  props: {
    item: INote,
    mode: NoteMode
  },
  methods: {
    markAsDone () {
      this.isDone = !this.isDone
    }
  },
  computed: {
    noteItem (): INote {
      return this.item
    },
    isCommon (): boolean {
      return this.mode === 'COMMON'
    },
    isNew (): boolean {
      return this.mode === 'NEW'
    }
  }
}
</script>

<style scoped>

.note {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin-top: 25px;
  padding: 10px;
  margin-left: 25px;
  box-shadow: 2px 4px 28px 0px rgba(158,149,158,0.43);
}

.note_inactive {
  opacity: .4;
}

.title {
  text-align: center;
  border: 0;
  font-size: 1.2em;
  font-weight: bold;
  padding: 15px 0;
}

.body {
  width: 100%;
  min-height: 50px;
  overflow-wrap: break-word;
  resize: none;
}

</style>
