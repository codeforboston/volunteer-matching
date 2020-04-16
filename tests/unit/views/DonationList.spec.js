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
    gapi.fake.spreadsheets.addValue('Donations', [
      [
        'Donation ID', 'Date Received', 'Status', 'Donation Urgency', 'Donor Name', 'Donor ID',
        'Donation Category', 'Donation Sub - category', 'Donation Details', 'Donation Location',
        'Recipient', 'Date deployed', 'Recurrance frequency', 'Assigned', 'Notes',
      ],
      [
        '1', '3/24/2020', 'Inbound', 'High', 'Baldor Boston', '1', 'Food items', 'Hot meals', 'I can make 5000 hot meal for SHS students',
      ],
    ]);
    store = new Vuex.Store(configuration);
  });
  afterEach(() => { delete global.gapi; });
  it('loads a list of donations on mount', async () => {
    const wrapper = render();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).to.contain('Baldor Boston');
  });

  describe('making a donation', () => {
    it('updates the spreadsheet', () => {
      const wrapper = render();
      wrapper.find('button').trigger('click');
      expect(gapi.client.sheets.spreadsheets.values.update).to.have.been.calledWith({
        spreadsheetId: 'FAKE_SPREADSHEET_ID',
        range: 'Requests!K2',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [['<dynamically added>']],
        },
      });
    });
  });
});
