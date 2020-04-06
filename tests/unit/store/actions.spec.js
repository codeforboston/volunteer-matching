import sinon from 'sinon';
import { fetchRequests } from '@/store/actions';
import { expect, fakeGoogleApi } from '../helpers';

describe('actions', () => {
  describe('fetchRequests', () => {
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
    });
    afterEach(() => { delete global.gapi; });

    it('commits the requests', async () => {
      const commit = sinon.spy();
      await fetchRequests({ commit });

      expect(gapi.client.sheets.spreadsheets.values.get).to.have.been.calledWith({ spreadsheetId: 'FAKE_SPREADSHEET_ID', range: 'Requests' });
      expect(commit).to.have.been.calledWith('loadRequests', [
        {
          id: '1',
          dateRequested: '3/25/20',
          status: 'Requested',
          requestUrgency: 'Low',
          requesterName: 'Somerville High School',
          requesterId: '1',
          requestCategory: 'Food items',
          requestSubCategory: 'Hot meals',
          requestDetails: 'We need hot meals',
        },
      ]);
    });
  });
});
