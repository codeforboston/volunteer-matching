export default {
  signIn(state) {
    state.isSignedIn = true;
  },
  signOut(state) {
    state.isSignedIn = false;
  },
  loadRequests(state, requests) {
    state.requests = requests;
  },
  loadDonations(state, donations) {
    state.donations = donations;
  },
};
