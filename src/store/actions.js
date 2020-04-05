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


export default { initializeGoogleClient, signIn, signOut };
