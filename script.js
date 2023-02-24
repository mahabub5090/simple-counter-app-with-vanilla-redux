const counter = document.getElementById( 'counter' );
const incrementBtn = document.getElementById( 'increment' );
const decrementBtn = document.getElementById( 'decrement' );

const incremnetInput = document.querySelector( "#increment-form" );
const decrementInput = document.querySelector( "#decrement-form" );


// initial state;(1)
const initialState = {
    value: 0
};

//  action type(2)

const INCREMENT = 'increment';
const DECREMENT = 'decrement';

// action creators (optional for dynamic payload);
const actionCreator = ( typeName, payloadCount ) =>
{
    if ( !payloadCount )
    {
        alert( "please Fill the Input box for Increment or Decrement" )
        return {
            type: typeName,
            payload: 0,
        }
    }
    else
    {
        return {
            type: typeName,
            payload: payloadCount,
        }
    }
}


//  reducer function (3);

function useRedux ( state = initialState, action )
{
    if ( action.type === INCREMENT )
    {
        if ( action.payload < 0 )
        {
            alert( "error for negative counter value in increment" )
            return state;
        }
        else
        {
            let copyObject = { ...state };
            copyObject.value = copyObject.value + action.payload;
            return copyObject;
        }

    }
    else if ( action.type === DECREMENT )
    {
        if ( action.payload < 0 || state.value < action.payload )
        {

            alert( "error for negative counter value in @decrement box or @Current counter value is less tthan decrement input value" )
            return state;

        }
        else
        {
            let copyObject = { ...state };
            copyObject.value = copyObject.value - action.payload;
            return copyObject;
        }

    }
    else return state;

}

//redux store (4);

const reduxStore = Redux.createStore( useRedux );

// updated UI function (5);

const render = () =>
{
    const recentState = reduxStore.getState();
    counter.innerText = recentState.value.toString();
}

// UI subscribe redux (6);

reduxStore.subscribe( render );

// button clck event or action (7);

incrementBtn.addEventListener( "click", () =>
{
    const incremnetValue = incremnetInput.value;
    reduxStore.dispatch( actionCreator( INCREMENT, parseFloat( incremnetValue ) ) );
}
);
decrementBtn.addEventListener( "click", () =>
{
    const decrementValue = decrementInput.value
    reduxStore.dispatch( actionCreator( DECREMENT, parseFloat( decrementValue ) ) );
    ;
}
);



