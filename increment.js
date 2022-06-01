
const redux=require('redux');
const logger=require('redux-logger').logger;
const applyMiddleware=redux.applyMiddleware
const createStore=redux.createStore;

//*constants 
const INCREMENT='INCREMENT';
const DECREMENT='DECREMENT';
const INCREMENTBYVALUE='INCREMENTBYVALUE';

//*dispatch actions
function increment(){
    return{
        type:'INCREMENT'
    }
}

function decrement(){
    return{
        type:'DECREMENT'
    }
}
function incrementByValue(number=10){
    return{
        type:'INCREMENTBYVALUE',
        payload:number
    }
}

//*initial state
const initialState={
    counter:0
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case INCREMENT:
            return{
                ...state,
                counter:state.counter+1
            }
            
            break;
        
         case DECREMENT:
                return{
                    ...state,
                    counter:state.counter-1
                }
                
                break;
            
        case INCREMENTBYVALUE:
                    return{
                        ...state,
                        counter:state.counter+action.payload
                    }
                    
                    break;
        default:
            return{
                state
            }
            break;
    }
}



const store=createStore(reducer,applyMiddleware(logger));

console.log('initial state ',store.getState());

const unsubscribe=store.subscribe(()=>{
    console.log('update state',store.getState());
})

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());




store.dispatch(decrement());
store.dispatch(decrement());



store.dispatch(incrementByValue(3000));
store.dispatch(incrementByValue(8000));

unsubscribe();