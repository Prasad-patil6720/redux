const redux = require("redux");
const createStore = redux.createStore;
const axios = require("axios");
const thunkMiddelwere = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;
const logger = require("redux-logger").logger;

const initialPhotoState = {
  loding: false,
  photos: [],
  error: "",
};

//* constants

const FETCH_PHOTOS_REQUESTED = "FETCH_PHOTOS_REQUESTED";
const FETCH_PHOTOS_SUCCEEDDED = "FETCH_PHOTOS_SUCCEEDDED";
const FETCH_PHOTOS_FAILED = "FETCH_PHOTOS_FAILED";

//*actions

function fetchPhotoRequest() {
  return {
    type: "FETCH_PHOTOS_REQUESTED",
  };
}

function fetchPhotoSuccess(photos) {
  return {
    type: "FETCH_PHOTOS_REQUESTED",
    payload: photos,
  };
}

function fetchPhotoFailed(error) {
  return {
    type: "FETCH_PHOTOS_REQUESTED",
    payload: error,
  };
}

//*reducer
const reducer = (state = initialPhotoState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUESTED:
      return {
        ...state,
        loding: true,
      };

      break;
    case FETCH_PHOTOS_SUCCEEDDED:
      return {
        ...state,
        loding: false,
        photos:action.payload
      };

      break;
    case FETCH_PHOTOS_FAILED:
      return {
        ...state,
        loding: false,
        error:action.payload
      };

      break;
  }
};

const fetchPhotos=()=>{
    return async function(dispatch){
        dispatch(fetchPhotoRequest())


       await axios.get('https://jsonplaceholder.typicode.com/photos').then((response)=>{
            const photos=response.data.map((photo)=>photo.title);
            dispatch(fetchPhotoSuccess(photos));
        }).catch((error)=>{
            dispatch(fetchPhotoFailed(error))
        })
    }
}

const store=createStore(reducer,applyMiddleware(logger,thunkMiddelwere))

console.log('initial state',store.getState());

const unsubscribe=store.subscribe(()=>{
    console.log('updated state',store.getState());
})


store.dispatch(fetchPhotos())



unsubscribe();
