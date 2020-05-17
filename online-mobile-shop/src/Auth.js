// Simulate authentication service
const Auth = {
  _isAuthenticated: false,

  authenticate(name, pass, cb) {
    this._isAuthenticated = true;
    localStorage.setItem("authUser", name);
    setTimeout(
      () =>
        cb({
          name: name,
        }),
      100
    );
  },

  signout(cb) {
    this._isAuthenticated = false;
    localStorage.removeItem("authUser");
    setTimeout(cb, 100);
  },
};

export default Auth;
