function initializeGoogleClient({ commit }) {
  const updateSignInStatus = (isSignedIn) => commit(isSignedIn ? 'signIn' : 'signOut');

  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: process.env.VUE_APP_API_KEY,
      clientId: process.env.VUE_APP_CLIENT_ID,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/drive.file',
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}


const REQUEST_COLS = [
  'id',
  'dateRequested',
  'status',
  'requestUrgency',
  'requesterName',
  'requesterId',
  'requestCategory',
  'requestSubCategory',
  'requestDetails',
  'requestLocation',
  'fulfilledBy',
  'dateFulfilled',
  'recurrenceFrequency',
  'assigned',
  'notes',
];

export async function fetchRequests({ commit }) {
  const { result: { values } } = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    range: 'Requests',
  });
  const rowsWithoutHeader = values.slice(1);
  const requests = rowsWithoutHeader.map((row) => {
    const request = {};
    for (let i = 0; i < row.length; i += 1) {
      request[REQUEST_COLS[i]] = row[i];
    }
    return request;
  });
  commit('loadRequests', requests);
}


export default {
  initializeGoogleClient, signIn, signOut, fetchRequests,
};
