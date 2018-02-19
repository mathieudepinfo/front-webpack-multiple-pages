import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
console.log("Bottles");

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
	                <a class="dropdown-item" href="#">Modifier</a>
	                <a class="dropdown-item" href="#">Supprimer</a>
	              </div>
	            </div>
	          </td>
	        </tr>`
     
			);
		}
	}
	
})


$("#connect").append(()=>{

	console.log(sessionStorage);
	if(sessionStorage.getItem("auth") === "true"){
		return '<button  class="nav-link" onclick="sessionStorage.clear();location.reload()">Deconnexion <span class="sr-only">(current)</span></button>';
	}
	return '<a class="nav-link" href="/index.html">Connexion <span class="sr-only">(current)</span></a>';

});


