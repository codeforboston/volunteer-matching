import sinon from 'sinon';
import { initializeGoogleClient, fetchRequests } from '@/store/actions';
import { expect, fakeGoogleApi } from '../helpers';

describe('actions', () => {
  beforeEach(() => {
    global.gapi = fakeGoogleApi();
    gapi.fake.spreadsheets.addValue('Donations', [
      [
        'Donation ID', 'Date Received', 'Status', 'Donation Urgency', 'Donor Name', 'Donor ID',
        'Donation Category', 'Donation Sub - category', 'Donation Details', 'Donation Location',
        'Recipient', 'Date deployed', 'Recurrance frequency', 'Assigned', 'Notes',
      ],
      [
        '1', '3/24/2020', 'Inbound', 'High', 'Baldor Boston', '1', 'Food items', 'Hot meals', 'I can make 5000 hot meals for SHS students',
      ],
    ]);
    gapi.fake.spreadsheets.addValue('Requests', [
      [
        'Request ID', 'Date requested', 'Status', 'Request Urgency', 'Requester Name',
        'Requester ID', 'Request Category', 'Request Sub-category', 'Request Details',
        'Request Location', 'Fulfilled by', 'Date Fulfilled', 'Recurrance frequency', 'Assigned',
        'Notes',
      ],
      [
        '1', '3/25/20', 'Requested', 'Low', 'Somerville High School', '1', 'Food items', 'Hot meals', 'We need hot meals',
      ],
    ]);
  });
  afterEach(() => { delete global.gapi; });

  describe('initializeGoogleClient', () => {
    describe('upon signing in', () => {
      beforeEach(() => {
        gapi.fake.updateIsSignedIn(true);
      });

      it('fetches requests and donations', async () => {
        await initializeGoogleClient({ commit: sinon.spy() });
        expect(gapi.client.sheets.spreadsheets.values.get).to.have.been.calledWith({ spreadsheetId: 'FAKE_SPREADSHEET_ID', range: 'Requests' });
        expect(gapi.client.sheets.spreadsheets.values.get).to.have.been.calledWith({ spreadsheetId: 'FAKE_SPREADSHEET_ID', range: 'Donations' });
      });
    });

    describe('upon signing out', () => {
      beforeEach(() => {
        gapi.fake.updateIsSignedIn(false);
      });
      it('clears requests and donations', async () => {
        const commit = sinon.spy();
        await initializeGoogleClient({ commit });
        expect(commit).to.have.been.calledWith('clearSheetsData');
        expect(gapi.client.sheets.spreadsheets.values.get).not.to.have.been.called();
      });
    });
  });

  describe('fetchRequests', () => {
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
