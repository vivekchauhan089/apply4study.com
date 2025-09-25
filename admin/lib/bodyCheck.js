//Method for checking all key of request

let obj = {
	checkBody : function(request,body){
		for(let i in body){
			if(typeof body[i] == 'object'){
				console.log(i);
				if(typeof request[i] != 'undefined'){
					if(body[i].length && body[i].length > 0 ){
						return obj.checkBody(request[i][0],body[i][0]);
					} else {
						return obj.checkBody(request[i],body[i]);
					}
				} else {
					console.log(i);
					return {success:false ,key:i};
				}    
			} else {
				if(typeof request[i] == 'undefined'){
					console.log(i);
					return {success:false ,key:i};
				}
			}
		}
		return {success:true};
	}
}
module.exports = obj;