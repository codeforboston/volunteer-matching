import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SignIn from '@/components/SignIn.vue';
import configuration from '@/store/configuration';
import { expect, fakeGoogleApi } from '../helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SignIn.vue', () => {
  let store;

  beforeEach(() => {
    global.gapi = fakeGoogleApi();
    store = new Vuex.Store(configuration());
  });
  afterEach(() => { delete global.gapi; });

  describe('when the user is signed out', () => {
    let wrapper;
    beforeEach(() => {
      store.state.isSignedIn = false;
      wrapper = mount(SignIn, { localVue, store });
    });

    it('allows the user to sign in', () => {
      expect(wrapper.find('button').text()).to.equal('sign in');
      wrapper.find('form').trigger('submit');
      expect(gapi.auth2.getAuthInstance().signIn).to.have.been.called();
    });
  });

  describe('when the user is signed in', () => {
    let wrapper;
    beforeEach(() => {
      store.state.isSignedIn = true;
      wrapper = mount(SignIn, { localVue, store });
    });

    it('allows the user to sign out', () => {
      expect(wrapper.find('button').text()).to.equal('sign out');
      wrapper.find('form').trigger('submit');
      expect(gapi.auth2.getAuthInstance().signOut).to.have.been.called();
    });
  });
});
