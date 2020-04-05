export default {
  signIn(state) {
    state.isSignedIn = true;
  },
  signOut(state) {
    state.isSignedIn = false;
  },
};
