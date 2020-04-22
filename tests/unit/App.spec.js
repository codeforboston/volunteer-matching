import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App.vue';
import configuration from '@/store/configuration';
import { expect, fakeGoogleApi } from './helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
  let store;

  function render() {
    return mount(App, {
      localVue,
      store,
      stubs: ['donation-list'],
    });
  }

  beforeEach(() => {
    global.gapi = fakeGoogleApi();
    store = new Vuex.Store(configuration());
  });
  afterEach(() => { delete global.gapi; });

  it('initializes google client on mount', () => {
    render();
    expect(gapi.load).to.have.been.calledWith('client:auth2');
    expect(gapi.client.init).to.have.been.calledWith({
      apiKey: 'FAKE_API_KEY',
      clientId: 'FAKE_CLIENT_ID',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    });
  });

  describe('when the user is not already signed in', () => {
    it('prompts for the user to sign in', () => {
      const wrapper = render();
      expect(wrapper.text()).to.contain('Please log in first');
      expect(wrapper.find({ name: 'request-list' }).exists()).to.be.false();
    });
    describe('when the user signs in', () => {
      it('shows that they are signed in', async () => {
        const wrapper = render();
        expect(wrapper.find('button').text()).to.contain('sign in');
        wrapper.find('form').trigger('submit');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('button').text()).to.contain('sign out');
      });
    });
  });
  describe('when the user is already signed in', () => {
    beforeEach(() => {
      gapi.fake.updateIsSignedIn(true);
    });
    it('displays a sign out button', async () => {
      const wrapper = render();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('button').text()).to.contain('sign out');
    });
    it('shows a list of donations', async () => {
      const wrapper = render();
      await wrapper.vm.$nextTick();
      expect(wrapper.find({ name: 'donation-list' }).exists()).to.be.true();
    });
  });
});
