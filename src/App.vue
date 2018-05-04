<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
	name: 'app',
	components: {
		Home
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input,
textarea {
  border: 0;
}

textarea {
  resize: none;
}

input:focus,
textarea:focus {
  outline: none;
  border: 0;
}

input[disabled],
textarea[disabled] {
  background: white;
}

.action-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: right;
  cursor: pointer;
}
</style>