<template>
  <div id="app">
    <button @click="home">home</button>
    <button class="ben" @click="finder">go finder</button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'tool',
    methods: {
      home() {
        this.$router.push({ path: '/' });
      },
      finder() {
        this.$router.push({ path: '/finder' });
      },
    },
  };
</script>

<style>
  /* CSS */
</style>
