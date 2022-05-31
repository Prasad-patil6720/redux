const redux=require('redux');
const logger=require('redux-logger').logger
const thunkMiddelwere=require('redux-thunk').default
const applyMiddleware=redux.applyMiddleware
const createStore=redux.createStore;
const axios=require('axios');
const intitialState={
    loding:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUESTED='FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED='FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED='FETCH_USERS_FAILED';


const fetchUserRequest=()=>{
    return{
        type:FETCH_USERS_REQUESTED
    }
}


const fetchUserSucceess=(users)=>{
    return{
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}

const fetchUserFailed=(error)=>{
    return{
        type:FETCH_USERS_FAILED,
        payload:error
    }
}

const reducer=(state=intitialState,action)=>{
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading:true
            }
            
            break;
        
        case FETCH_USERS_SUCCEEDED:
            return{
                ...state,
                loading:true,
                users:action.payload,
                error:''
            }
            
            break;
        
            case FETCH_USERS_FAILED:
            return{
                ...state,
                loading:false,
                users:[],
                error:action.payload
            }

            break;
    
    
    }
    
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
        const users=response.data.map((user)=>user.id)
        dispatch(fetchUserSucceess(users));
    
    }).catch((error)=>{
dispatch(fetchUserFailed(error))
    })

    }
}
const store=createStore(reducer,applyMiddleware(logger,thunkMiddelwere))

const unsubscribe=store.subscribe(()=>{console.log(store.getState());})



store.dispatch(fetchUsers());


unsubscribe();