<template>
  <form @submit.prevent="onSubmit">
    <button type="submit">{{buttonText}}</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'sign-in',
  computed: {
    ...mapState(['isSignedIn']),
    buttonText() {
      return `sign ${this.isSignedIn ? 'out' : 'in'}`;
    },
  },
  methods: {
    ...mapActions(['signIn', 'signOut']),
    onSubmit() {
      if (this.isSignedIn) {
        this.signOut();
      } else {
        this.signIn();
      }
    },
  },
};
</script>
