import chai from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

chai.use(dirtyChai);
chai.use(sinonChai);

export const { expect } = chai;

function googleAuth() {
  let signInListener;
  const isSignedIn = sinon.stub().returns(false);
  const publishIsSignedIn = () => {
    if (signInListener) { signInListener(isSignedIn()); }
  };
  const signIn = sinon.fake(() => {
    isSignedIn.returns(true);
    publishIsSignedIn();
  });
  const signOut = sinon.fake(() => {
    isSignedIn.returns(false);
    publishIsSignedIn();
  });

  return {
    auth2: {
      getAuthInstance: sinon.stub().returns({
        signIn,
        signOut,
        isSignedIn: {
          get: isSignedIn,
          listen: (listener) => { signInListener = listener; },
        },
      }),
    },
    fake: {
      updateIsSignedIn(signedIn) { isSignedIn.returns(signedIn); },
    },
  };
}

function googleSpreadsheets() {
  const sheetValues = { Donations: [], Requests: [] };
  return {
    sheets: {
      spreadsheets: {
        values: {
          get: sinon.fake(({ range }) => ({ result: { values: sheetValues[range] } })),
        },
      },
    },
    fake: {
      spreadsheets: {
        addValue(range, value) {
          sheetValues[range] = value;
        },
      },
    },
  };
}

export function fakeGoogleApi() {
  const auth = googleAuth();
  const spreadsheets = googleSpreadsheets();

  return {
    load: sinon.fake.yields(),
    client: {
      init: sinon.fake.resolves(),
      sheets: spreadsheets.sheets,
    },
    auth2: auth.auth2,
    fake: {
      ...auth.fake,
      ...spreadsheets.fake,
    },
  };
}
