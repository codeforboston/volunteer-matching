import { expect, fakeGoogleApi } from './helpers';

// This test only exists because the fake is a bit complicated, the fakeGoogleApi is not part of the
// published app

describe('fakeGoogleApi', () => {
  it('alerts a listener upon sign in', (done) => {
    const gapi = fakeGoogleApi();

    expect(gapi.auth2.getAuthInstance().isSignedIn.get()).to.be.false();
    gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
      expect(isSignedIn).to.be.true();
      done();
    });

    gapi.auth2.getAuthInstance().signIn();

    expect(gapi.auth2.getAuthInstance().isSignedIn.get()).to.be.true();
  });

  it('alerts a listener upon sign out', (done) => {
    const gapi = fakeGoogleApi();
    gapi.fake.updateIsSignedIn(true);

    expect(gapi.auth2.getAuthInstance().isSignedIn.get()).to.be.true();
    gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
      expect(isSignedIn).to.be.false();
      done();
    });

    gapi.auth2.getAuthInstance().signOut();

    expect(gapi.auth2.getAuthInstance().isSignedIn.get()).to.be.false();
  });

  it('can return fake spreadsheet data', async () => {
    const gapi = fakeGoogleApi();
    gapi.fake.spreadsheets.addValue('A1:C', [
      ['value at A:1', 'value at A:2', 'value at A:3'],
      ['value at B:1', 'value at B:2', 'value at B:3'],
      ['value at C:1', 'value at C:2', 'value at C:3'],
    ]);

    const { result: { values } } = gapi.client.sheets.spreadsheets.values.get({ spreadsheetId: 'spreadsheetId', range: 'A1:C' });

    expect(values).to.eql([
      ['value at A:1', 'value at A:2', 'value at A:3'],
      ['value at B:1', 'value at B:2', 'value at B:3'],
      ['value at C:1', 'value at C:2', 'value at C:3'],
    ]);
  });
});
