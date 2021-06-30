const base_url = "https://api.jikan.moe/v3";

window.addEventListener("load", pageLoaded);

function pageLoaded() {
	const form = document.getElementById("search_form");
	form.addEventListener("submit",searchAnime);
}

function searchAnime(event) {

	event.preventDefault()

	const form = new FormData(this);
	const query = form.get("search");

	fetch(`${base_url}/search/anime?q=${query}&page=1`)
	.then(res=>res.json())
	.then(updateDOM)
	.catch(err=>console.warn(err.message));
}

function updateDOM(data) {

	console.log(data.results);

	const searchResults = document.getElementById("search-results");

	searchResults.innerHTML = data.results
		.sort((a,b)=>a.episodes-b.episodes)
		.map(anime=>{
			return `
				<div class="card mx-auto my-2" style="width: 18rem;">
			    	<img class="card-img-top" src="${anime.image_url}" alt="Card image cap">
			  		<div class="card-body">
				    	<h5 class="card-title">${anime.title}</h5>
				    	<p class="card-text">${anime.synopsis}</p>
				    	<p class="card-text">Puntaje: ${anime.score}</p>
				    	<a href="${anime.url}" class="btn btn-primary">Saber más</a>
			  		</div>
				</div>	
			`
		});
}