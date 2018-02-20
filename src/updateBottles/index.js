import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
console.log("UpdateBottles");


function updateForm(){

	$.ajax({
		url:`http://localhost:3000/bottles/${sessionStorage.getItem("bottleId")}`,
		method:"GET",
		error:(request,status,error)=>{
			console.log(error,status,request);
		},
		success:(data)=>{		
			$("#brand").val(data.BRAND);
			$("#volume").val(data.VOLUME);
			$("#price").val((data.PRICE/100).toPrecision(3));
			$("#quantity").val(data.NBR);	

		}
	});
	
}

updateForm();

$("#updateBottleForm").submit((event)=>{
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
		url:`http://localhost:3000/bottles/${sessionStorage.getItem("bottleId")}`,
		method:"PATCH",
		data:_data,
		beforeSend: function(request) {
    		request.setRequestHeader("x-access-token", token);
  		},
		error:(request,status,error)=>{
			console.log(error,status,request);


		},
		success:(data)=>{		
			console.log("bottle patched");
			updateForm();

		}
	});

	return false;
});

$("#connect").append(()=>{

	console.log(sessionStorage);
	if(sessionStorage.getItem("auth") === "true"){
		return '<button  class="nav-link" onclick="sessionStorage.clear();location.reload()">Deconnexion <span class="sr-only">(current)</span></button>';
	}
	return '<a class="nav-link" href="/index.html">Connexion <span class="sr-only">(current)</span></a>';

});