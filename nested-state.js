const { act } = require('react-dom/test-utils');
const redux =require('redux');
const logger=require('redux-logger').logger;
const createStore=redux.createStore;
const produce=require('immer').produce;
const applyMiddleware=redux.applyMiddleware;

const STREET_UPDATED='STREET_UPDATED';
const intitialState={
    name:'prasad',
    address:{
        street:'123 Main street',
        city:'boston',
        state:'MA',
    },
}


function updateStreet(street){
    return{
        type:'STREET_UPDATED',
        payload:street
    }
}


const reducer=(state=intitialState,action)=>{
    switch (action.type) {
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            
                return produce(state,(draft)=>{
                draft.address=action.payload
            })
    
        default:
            return{
                state
            }
            break;
    }
}


const store=createStore(reducer,applyMiddleware(logger));


// console.log("initial state",store.getState());


// const unsubscribe=store.subscribe(()=>{
//     console.log('updated state',store.getState());
// })


store.dispatch(updateStreet("nashik"))

// unsubscribe();