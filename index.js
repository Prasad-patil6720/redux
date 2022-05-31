
'use strict'
const redux=require('redux');
const createStore=redux.createStore;
const bindActionCreators=redux.bindActionCreators;
const combineReducers=redux.combineReducers;


//*create constants
const CAKE_ORDER='CAKE_ORDER';
const CAKE_RESTOCK='CAKE_RESTOCK';
const ICECREAM_ORDER='ICECREAM_ORDER';
const ICECREAM_RESTOCK='ICECREAM_RESTOCK';


//*create initial state of the store;

// const initialState={
//     numOfCakes:10,
//     numOfIceCreams:30
// };

//* work with multiple reducers intitial state
const initialCakeState={
    numOfCakes:50
}

const initialIceCreamState={
    numOfIceCreams:80
}
//*create action for action;


function orderCake(){
    return{
        type:'CAKE_ORDER'
    }
}

function restockCake(qty=5){
return{
    type:CAKE_RESTOCK,
    payload:qty

}
}
function orderIcecream(qty=1){
    return{
        type:'ICECREAM_ORDER',
        payload:qty
    }
}

function restockIceCream(qty=1){
    return{
        type:'ICECREAM_RESTOCK',
        payload:qty
    }
}

//*create reducer for stror;

// const reducer=(state=initialState,action)=>{
//     switch (action.type) {
//         case CAKE_ORDER:
//             return{
//                 ...state,
//                 numOfCakes:state.numOfCakes-1
//             }
            
//             break;
//         case CAKE_RESTOCK:
//             return{
//                 ...state,
//                 numOfCakes:state.numOfCakes+action.payload
//             }
//             break;

//         case ICECREAM_RESTOCK:
//             return{
//                 ...state,
//                 numOfIceCreams:state.numOfIceCreams+action.payload
//             }
            
//             break;
//         case ICECREAM_ORDER:
//             return{
//                 ...state,
//                 numOfIceCreams:state.numOfIceCreams-action.payload
//             }
//             break;
        
        
    
//         default:
//             return state
//             break;
//     }
// }


//*insted of 😅 this use multiple reducers to easy to debug and solve the probleme

const cakeReducer=(state=initialCakeState,action)=>{
    switch (action.type) {
        case CAKE_ORDER:
            return{
                ...state,
                numOfCakes:state.numOfCakes-1
            }            
            break;
        case CAKE_RESTOCK:
            return{
                ...state,
                numOfCakes:state.numOfCakes+action.payload
            }
            break;

        default:
            return{
                state
            }
            break;
    }

}


const iceCreamReducer=(state=initialIceCreamState,action)=>{
    switch (action.type) {
        case ICECREAM_RESTOCK:
            return{
                ...state,
                numOfIceCreams:state.numOfIceCreams+action.payload
            }
            
            break;
        case ICECREAM_ORDER:
            return{
                ...state,
                numOfIceCreams:state.numOfIceCreams-action.payload
            }
            break;
        
        
    
        default:{
            return state
        }
            break;
        
    }

}


//*create store


// const store=createStore(reducer);

//* combine reducers

const rootReducer=combineReducers(
    {
        cake:cakeReducer,
        iceCream:iceCreamReducer
    }
);
const store=createStore(rootReducer)

console.log('initial state',store.getState());

//*this will call every time when we update state
const unsubscribe=store.subscribe(()=>{
    console.log('updated state',store.getState());
})



// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake());
// console.log(store.getState());


const actions=bindActionCreators({orderCake,restockCake,orderIcecream,restockIceCream},store.dispatch);

// actions.orderCake();

// actions.restockCake(20);

// actions.orderIcecream(3);
// actions.orderIcecream(5);
// actions.orderIcecream(4);

// actions.restockIceCream(5);
// actions.restockIceCream(5);
//*after unsubscribe we cannot update state of the application
unsubscribe();

