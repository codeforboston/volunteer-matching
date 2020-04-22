const sheetsLayout = {
  Requests: [
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
  ],
  Donations: [
    'id',
    'dateReceived',
    'status',
    'urgency',
    'donorName',
    'donorId',
    'category',
    'subCategory',
    'details',
    'location',
    'recipient',
    'dateDeployed',
    'recurranceFrequency',
    'assigned',
    'notes',
  ],
};

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

async function fetch(commit, range) {
  const columns = sheetsLayout[range];
  const { result: { values } } = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    range,
  });
  const rowsWithoutHeader = values.slice(1);
  const items = rowsWithoutHeader.map((row) => {
    const item = {};
    for (let i = 0; i < row.length; i += 1) {
      item[columns[i]] = row[i];
    }
    return item;
  });
  commit(`load${range}`, items);
}

export async function fetchRequests({ commit }) {
  fetch(commit, 'Requests');
}

export async function fetchDonations({ commit }) {
  fetch(commit, 'Donations');
}

export function initializeGoogleClient({ commit }) {
  const updateSignInStatus = (isSignedIn) => {
    commit(isSignedIn ? 'signIn' : 'signOut');
    if (isSignedIn) {
      fetchRequests({ commit });
      fetchDonations({ commit });
    } else {
      commit('clearSheetsData');
    }
  };

  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: process.env.VUE_APP_API_KEY,
      clientId: process.env.VUE_APP_CLIENT_ID,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
}


export default {
  initializeGoogleClient, signIn, signOut, fetchRequests, fetchDonations,
};
