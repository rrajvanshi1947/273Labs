var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;
var url = require('url');   


module.exports = function(app){
	
	
	app.use(bodyParser.json()); 
	app.use(urlencodedParser) ; 

	app.post('/ADD' , function(req,res)
	{

		if(isNaN(parseFloat(req.body.input1)) || isNaN(parseFloat(req.body.input2))){
			console.log('Invalid Number ')
			res.status(400).json({error : 'Enter valid number'}) ;  
		}else{

			var output = parseFloat(req.body.input1) + parseFloat(req.body.input2) ;
			console.log('Result ' , output) ;
			res.status(201).json({output : output , error : ''}) ;
		}
		
	});

	
	app.post('/SUB' , function(req,res)
	{
		if(isNaN(parseFloat(req.body.input1)) || isNaN(parseFloat(req.body.input2))){
			console.log('Invalid Number ')
			res.status(400).json({error : 'Enter valid number'}) ;  
		}else{

			var output = parseFloat(req.body.input1) - parseFloat(req.body.input2) ;
			console.log('Result ' , output) ;
			res.status(201).json({output : output}) ;
		}
		
		
	});
	
	

	app.post('/MUL' , function(req,res)
	{
		if(isNaN(parseFloat(req.body.input1)) || isNaN(parseFloat(req.body.input2))){
			console.log('Invalid Number ')
			res.status(400).json({error : 'Enter valid number'}) ;  
		}else{

			var output = parseInt(req.body.input1) * parseInt(req.body.input2) ;
			console.log('Result ' , output) ;
			res.status(201).json({output : output}) ;
		}

	});
	
	

	app.post('/DIV' , function(req,res)
	{
		if(isNaN(parseInt(req.body.input1)) || isNaN(parseInt(req.body.input2))){
			console.log('Invalid Number ')
			res.status(400).json({error : 'Enter valid number'}) ;  
		}else if (parseInt(req.body.input2 ) === 0 ){
			console.log('Cannot divide by 0');
			res.status(201).json({output : '' , error : 'Division by Zero is not possible'}) ;
		}
		else{
			var output = parseInt(req.body.input1) / parseInt(req.body.input2) ;
			console.log('Result ' , output) ;
			res.status(201).json({output : output , error : ''}) ;
		}
		
	});
	
};