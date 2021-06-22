import decode from "jwt-decode";

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if user is still logged in
  loggedIn() {
    // checks for saved token that's still valid
    const token = this.getToken();
    // use type coersion to check if token's NOT undefined and NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    // retrieves user token from localStorage
    return localStorage.getItem("id_token");
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    // refresh app
    window.location.assign("/");
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // reload page and reset state of application
    window.location.assign("/");
  }
}

// instantiate new version of for every component that imports it
export default new AuthService();
