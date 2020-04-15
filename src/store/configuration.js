import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    isSignedIn: false,
    requests: [],
    donations: [],
  },
  actions,
  mutations,
};
