import chai from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

chai.use(dirtyChai);
chai.use(sinonChai);

export const { expect } = chai;

export function fakeGoogleApi() {
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
    load: sinon.fake.yields(),
    client: { init: sinon.fake.resolves() },
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
