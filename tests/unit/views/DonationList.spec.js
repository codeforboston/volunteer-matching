import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DonationList from '@/views/DonationList.vue';
import configuration from '@/store/configuration';
import { expect, fakeGoogleApi } from '../helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DonationList.vue', () => {
  let store;

  function render() {
    return mount(DonationList, {
      localVue,
      store,
    });
  }

  beforeEach(() => {
    global.gapi = fakeGoogleApi();
    store = new Vuex.Store(configuration());
    store.replaceState({
      donations: [
        {
          donorName: 'Baldor Boston',
          details: 'I can make 5000 hot meals',
        },
      ],
    });
  });
  afterEach(() => { delete global.gapi; });

  it('displays a list of donations', async () => {
    const wrapper = render();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).to.contain('Baldor Boston');
  });

  describe('focusing on a donation', () => {
    it('loads that donation in a new panel', async () => {
      const wrapper = render();
      wrapper.find('li').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.donation-details').text()).to.contain('I can make 5000 hot meals');
    });
  });
});
