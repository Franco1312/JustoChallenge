const initialState = {
  hits: [],
  loggedUser: [],
  hitDetail: [{}],
  hitmansAndManagers: [],
  hitmanDetail: [{}],
  associatedHitmans: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_HITS':
      return {
        ...state,
        hits: action.payload,
      };
    case 'CREATE_HIT':
      return {
        ...state,
        hits: action.payload,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        loggedUser: action.payload,
      };
    case 'GET_HIT_BY_ID':
      return {
        ...state,
        hitDetail: action.payload,
      };
    case 'GET_HITMAN_BY_ID':
      return {
        ...state,
        hitmanDetail: action.payload,
      };
    case 'GET_HITMANS_AND_MANAGERS':
      return {
        ...state,
        hitmansAndManagers: action.payload,
      };
    case 'GET_ASSOCIATED_HITMANS':
      return {
        ...state,
        associatedHitmans: action.payload,
      };
    case 'UPDATE_HIT':
      return {
        ...state,
      };
    case 'MARK_HITMAN_AS_NON_ACTIVE':
      return {
        ...state,
      };
    case 'REGISTER_USER':
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}
