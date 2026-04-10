export const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
