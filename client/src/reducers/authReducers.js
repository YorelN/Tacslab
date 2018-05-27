const initialState = {
  isLoggedIn: false,
  infos: null
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case "LOGIN":
      return Object.assign({}, ...state, {
        isLoggedIn: true,
        infos: payload
      });
    case "SIGNUP":
      return Object.assign(
        {},
        {
          isLoggedIn: false,
          infos: null
        }
      );
    case "LOGOUT":
      return Object.assign(
        {},
        {
          isLoggedIn: false,
          infos: null
        }
      );
    default:
      return state;
  }
};
