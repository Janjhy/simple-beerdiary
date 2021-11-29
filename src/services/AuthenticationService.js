import {Log, UserManager} from 'oidc-client';

class AuthenticationService {
  userManager : UserManager;

  constructor() {
    const options = {
      authority: process.env.REACT_APP_AUTH,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: `${process.env.REACT_APP_APP_URL}signin-callback.html`,
      silent_redirect_uri: `${process.env.REACT_APP_APP_URL}silent-renew.html`,
      post_logout_redirect_uri: `${process.env.REACT_APP_APP_URL}`,
      response_type: 'code',
      scope: process.env.REACT_APP_CLIENT_SCOPE
    };
    this.userManager = new UserManager(options);
    Log.logger = console;
    Log.level = Log.INFO;
  }

  getThisUser()  {
    return this.userManager.getUser();
  }

  login() {
    return this.userManager.signinRedirect();
  }

  logout()  {
    return this.userManager.signoutRedirect();
  }

  tokenRenew() {
    return this.userManager.signinSilent();
  }
}

export default AuthenticationService;
