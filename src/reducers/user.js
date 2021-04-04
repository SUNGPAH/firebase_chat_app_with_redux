export const SET_JWT_TOKEN = 'SET_JWT_TOKEN'
export const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const setJwtToken = (jwtToken) => ({
  type: SET_JWT_TOKEN,
  payload: jwtToken,
});

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
})

const initialState = {
  jwtToken: null,
  userProfile: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:{
      return {
        ...state,
        jwtToken: action.payload,
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload
      }
    }
    default:
      return state;
  }
};

export default user;