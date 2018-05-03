<template>
  <div class="action-panel">
		<span>
			<input 
				type="checkbox"
				class="done-checkbox" 
				:id="`done-${noteItem.id}`"
				@change="$emit('markDone')">
			<label :for="`done-${noteItem.id}`"></label>
		</span>
		<font-awesome-icon :icon="closeIcon" @click="$store.commit('delete', noteItem.id)"/>
	</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import {
  faTimes
} from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'TopActionPanel',
  components: {
    FontAwesomeIcon
  },
  props: ['noteItem'],
  computed: {
    closeIcon () {
      return faTimes
    }
  }
}
</script>

<style scoped>

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

</style>
