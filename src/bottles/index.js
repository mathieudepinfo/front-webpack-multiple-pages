import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";

console.log("Bottles");
$.holdReady( true );

$( window ).ready(function() {
	console.log("loaded");
	$(".deleteButton").click((event)=>{

		$.ajax({
			url:"http://localhost:3000/bottles/"+event.target.id,
			method:"DELETE",
			beforeSend: (xhr)=>{
	    		xhr.setRequestHeader ("x-access-token", sessionStorage.getItem("accessToken"));
			},
			error:(request,status,error)=>{
				console.log(error,status,request);
			},
			success:(data)=>{		
				location.reload();
			}
		});
	});
})


$.ajax({

	url:"http://localhost:3000/bottles",
	method:"GET",
	dataType:"json",
	error:(request,status,error)=>{
		console.log("error "+status);

	},
	success:(data)=>{
		for(var bottleIndex=0;bottleIndex<data.length;++bottleIndex){
			$("#tableContent").append(
			
			`<tr>
	          <th scope="row">${data[bottleIndex].ID}</th>
	          <td>${data[bottleIndex].BRAND}</td>
	          <td>${data[bottleIndex].VOLUME}</td>
	          <td>${(data[bottleIndex].PRICE/100.0).toPrecision(3)}</td>
	          <td>
	            <div class="dropdown">
	              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                Actions
	              </button>
	              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	                <a class="dropdown-item" onclick="sessionStorage.setItem('bottleId',${data[bottleIndex].ID})" href="/updateBottles.html">Modifier</a>
	                <a class="dropdown-item deleteButton" id="${data[bottleIndex].ID}"" href="#">Supprimer</a>
	              </div>
	            </div>
	          </td>
	        </tr>`
     		
			);
		}
		$.holdReady( false );
		console.log('liste loaded');
	}
	
})



$(".deleteButton").click(()=>{
	console.log(id);

	$.ajax({
		url:"http://localhost:3000/bottles/"+this.id,
		method:"DELETE",
		dataType:"json",
		beforeSend: (xhr)=>{
    		xhr.setRequestHeader ("x-access-token", sessionStorage.getItem("accessToken"));
		},
		error:(request,status,error)=>{
			console.log(error,status,request);
		},
		success:(data)=>{		
			location.reload();
		}
	});
})

$("#connect").append(()=>{

	console.log(sessionStorage);
	if(sessionStorage.getItem("auth") === "true"){
		return '<a  class="nav-link" href="" onclick="sessionStorage.clear();location.reload()">Deconnexion <span class="sr-only">(current)</span></a>';
	}
	return '<a class="nav-link" href="/index.html">Connexion <span class="sr-only">(current)</span></a>';

});


