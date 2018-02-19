import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
console.log("AddBottles");


$("#addBottleForm").submit((event)=>{
	console.log("form submit");

	var _brand = $("#brand").val();
	var _volume = $("#volume").val();
	var _price = Math.floor($("#price").val()*100);
	var _number = $("#quantity").val();
	var token = sessionStorage.getItem("accessToken");

	var _data ={
			brand:_brand,
			price:_price,
			volume:_volume,
			number:_number
		};

	console.log(_brand,_volume,_price,_number);

	$.ajax({
		url:"http://localhost:3000/bottles",
		method:"POST",
		data:_data,
		beforeSend: function(request) {
    		request.setRequestHeader("x-access-token", token);
  		},
		error:(request,status,error)=>{
			console.log(error,status,request);


		},
		success:(data)=>{		
			console.log("bottle added");

		}
	});

	return false;
});
