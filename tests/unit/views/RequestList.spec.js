import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import RequestList from '@/views/RequestList.vue';
import configuration from '@/store/configuration';
import { expect, fakeGoogleApi } from '../helpers';

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
    global.gapi = fakeGoogleApi();
    gapi.fake.spreadsheets.addValue('Requests', [
      [
        'Request ID',
        'Date requested',
        'Status',
        'Request Urgency',
        'Requester Name',
        'Requester ID',
        'Request Category',
        'Request Sub-category',
        'Request Details',
        'Request Location',
        'Fulfilled by',
        'Date Fulfilled',
        'Recurrance frequency',
        'Assigned',
        'Notes',
      ],
      [
        '1',
        '3/25/20',
        'Requested',
        'Low',
        'Somerville High School',
        '1',
        'Food items',
        'Hot meals',
        'We need hot meals',
      ],
    ]);
    store = new Vuex.Store(configuration);
  });
  afterEach(() => { delete global.gapi; });

  it('loads a list of all requests on mount', async () => {
    const wrapper = render();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).to.contain('Somerville High School');
  });
});
