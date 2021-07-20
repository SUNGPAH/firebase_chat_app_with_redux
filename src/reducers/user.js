export const SET_JWT_TOKEN = 'SET_JWT_TOKEN'
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const SECOND_SAGA = 'SECOND_SAGA';
export const SET_LANDING_COURSES = "SET_LANDING_COURSES";

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
  message: "",
  landingCourses: []
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

    case SECOND_SAGA: {
      return {
        ...state,
        message: action.payload
      }
    }

    case SET_LANDING_COURSES: {
      return {
        ...state,
        landingCourses: action.payload
      }
    }
    default:
      return state;
  }
};

export default user;