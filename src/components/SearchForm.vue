<template>
  <div class="search-form">
    <input ref="searchString" class="search-input">
    <font-awesome-icon class="search-icon" :icon="iconSearch" @click="searchNote" />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

export default {
	name: 'SearchForm',
	components: {
		FontAwesomeIcon
	},
	methods: {
		searchNote () {
			this.$emit('search', this.$refs.searchString.value)
		}
	},
	computed: {
		iconSearch () {
			return faSearch
		}
	}
}
</script>

<style scoped>

.search-form {
  width: 30%;
}

.search-input {
  font-size: 18px;
  border: none;
  border-bottom: 2px solid black;
}

.search-input:focus {
  outline: none;
}

.search-icon {
  cursor: pointer;
}

</style>
