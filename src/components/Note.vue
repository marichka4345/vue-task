<template>
  <div :class="{
        'note': true,
        'note_inactive': isDone}">
    <div class="action-panel" v-if="!isNew && !isArchieved">
      <span>
        <input 
          type="checkbox"
          class="done-checkbox" 
          :id="`done-${noteItem.id}`"
          @change="markAsDone($event)">
        <label :for="`done-${noteItem.id}`"></label>
      </span>
      <font-awesome-icon :icon="iconClose" @click="$emit('delete', noteItem.id)"/>
    </div>

    <input class="title" placeholder="Title" v-model="noteItem.title" :disabled="!isNew" />
    <textarea class="body" placeholder="Take a note..." v-model="noteItem.body" :disabled="!isNew" />

    <div class="action-panel" v-if="isNew && !isArchieved">
      <div class="add-button">
        <font-awesome-icon
          :icon="iconAdd"
          @mouseover="showTitle"
          @mouseleave="hideTitle"
          @click="saveNote"/>
        <transition name="fade">
          <span class="addTitle" v-if="isAddTitleVisible">Add note</span>
        </transition>
      </div>
    </div>

    <div class="action-panel" v-if="!isNew && !isArchieved">
      <router-link :to="`/edit/${noteItem.id}`">
        <font-awesome-icon :icon="iconEdit"/>
      </router-link>

      <font-awesome-icon :icon="iconArchieve" @click="archieveNote" />
    </div>

    <div class="action-panel" v-if="isArchieved">
      <font-awesome-icon :icon="iconRearchieve" @click="rearchieveNote"/>
    </div>
  </div>
</template>

<script>
import EditNote from './EditNote';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo';

export default {
  name: 'Note',
  components: {
    EditNote,
    FontAwesomeIcon
  },
  data() {
    return {
      isDone: false,
      isAddTitleVisible: false
    };
  },
  props: ['item', 'mode'],
  methods: {
    markAsDone() {
      this.isDone = !this.isDone;
    },
    saveNote() {
      if (!this.noteItem.title.trim() || !this.noteItem.body.trim()) {
        return false;
      }
      this.$emit('save', this.noteItem);
    },
    archieveNote() {
      this.$store.commit('archieve', this.noteItem.id);
    },
    rearchieveNote() {
      this.$store.commit('rearchieve', this.noteItem.id);
    },
    showTitle() {
      this.isAddTitleVisible = true;
    },
    hideTitle() {
      this.isAddTitleVisible = false;
    }
  },
  computed: {
    noteItem() {
      return this.item;
    },
    isNew() {
      return this.mode === 'NEW';
    },
    isArchieved() {
      return this.mode === 'ARCHIEVE';
    },
    iconCheck() {
      return faCheck;
    },
    iconClose() {
      return faTimes;
    },
    iconAdd() {
      return faPlus;
    },
    iconEdit() {
      return faEdit;
    },
    iconArchieve() {
      return faFolder;
    },
    iconRearchieve() {
      return faUndo;
    }
  }
}
</script>

<style scoped>
input[disabled],
textarea[disabled] {
  background: white;
}

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

.action-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: right;
  cursor: pointer;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
}


[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 1.25em; height: 1.25em;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
}

[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: '✔';
  position: absolute;
  top: .2em; left: .275em;
  font-size: 1.4em;
  line-height: 0.8;
  color: #09ad7e;
  transition: all .2s;
  font-family: Helvetica, Arial, sans-serif;
}

[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}
[type="checkbox"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}

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
