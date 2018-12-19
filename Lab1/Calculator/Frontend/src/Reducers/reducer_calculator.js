const initialState = {
    output : '',
    error : null
}

export default function  reducer (state=initialState , action )  {
    switch(action.type){
        case 'RESULT' : {
            return {...state , output : action.payload.output ,
                error : action.payload.error } ;
        }
        case 'RESULT_FAIL' : {
            return {...state , error : action.payload} ;
        }
        default :
            return state  ;

    }

}
