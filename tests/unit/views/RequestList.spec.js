import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RequestList from '@/views/RequestList.vue';
import configuration from '@/store/configuration';
import { expect } from '../helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RequestList.vue', () => {
  let store;

  function render() {
    return mount(RequestList, {
      localVue,
      store,
    });
  }

  beforeEach(() => {
    store = new Vuex.Store(configuration());
    store.replaceState({
      requests: [
        {
          requesterName: 'Somerville High School',
        },
      ],
    });
  });
  afterEach(() => { delete global.gapi; });

  it('displays a list of all requests', async () => {
    const wrapper = render();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).to.contain('Somerville High School');
  });
});
