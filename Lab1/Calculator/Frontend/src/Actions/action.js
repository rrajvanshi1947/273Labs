import axios from 'axios' ;

export function calc(a , b , action ){
    return  function(dispatch){
        axios.post('http://localhost:3002/'+action, {
            input1 : a ,
            input2 : b ,
            action : action
        })
            .then(function (response) {
                console.log('Response for Add ' , response.data) ;
                dispatch({type : 'RESULT' , payload : response.data })
            })
            .catch(function (error) {
                console.log('Error Response' , error );
                dispatch({type : 'RESULT_FAIL' , payload : 'Enter Valid Data '})
            })
    }
}