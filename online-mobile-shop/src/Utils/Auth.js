// Simulate authentication service
const Auth = {
  isAuthenticated: false,

  authenticate(name, pass, cb) {
    this.isAuthenticated = true;
    setTimeout(
      () =>
        cb({
          name: name,
          pass: pass,
        }),
      100
    );
  },

  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default Auth;
