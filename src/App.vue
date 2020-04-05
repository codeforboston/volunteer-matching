<template>
  <div id="app">
    <sign-in />
    <div v-if="isSignedIn">Cool stuff!</div>
    <div v-else>Please log in first</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SignIn from './components/SignIn.vue';

export default {
  name: 'App',
  mounted() {
    this.initializeGoogleClient();
  },
  components: { SignIn },
  computed: mapState(['isSignedIn']),
  methods: {
    ...mapActions(['initializeGoogleClient']),
  },
};
</script>

<style lang="scss">
</style>
