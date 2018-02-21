import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

console.log("Login");
const _LOGIN = undefined;

$("#connexion-form").submit((event)=>{
	console.log("form submit");

	var _username = $("#username").val();
	var _password = $("#password").val();

	console.log(_username,_password)
	$.ajax({
		url:"http://localhost:3000/login",
		method:"GET",
		dataType:"json",
		beforeSend: (xhr)=>{
    		xhr.setRequestHeader ("Authorization", "Basic " + btoa(_username + ":" + _password));
		},
		error:(request,status,error)=>{
			console.log(error,status,request);


		},
		success:(data)=>{		
			if (typeof(Storage) !== "undefined") {
				console.log("isi ca existe");
    			// Code for localStorage/sessionStorage.
			} else {
    			// Sorry! No Web Storage support..
			}
			console.log(data);
			sessionStorage.setItem("accessToken" ,data.token);
			sessionStorage.setItem("auth" ,data.auth);
			
			window.location.href ="/bottles.html";

		}
	});

	return false;
});
