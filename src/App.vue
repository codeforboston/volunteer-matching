<template>
  <div id="app">
    <sign-in />
    <request-list v-if="isSignedIn" />
    <div v-else>Please log in first</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SignIn from './components/SignIn.vue';
import RequestList from './views/RequestList.vue';

export default {
  name: 'App',
  mounted() {
    this.initializeGoogleClient();
  },
  components: { SignIn, RequestList },
  computed: mapState(['isSignedIn']),
  methods: {
    ...mapActions(['initializeGoogleClient']),
  },
};
</script>

<style lang="scss">
</style>
