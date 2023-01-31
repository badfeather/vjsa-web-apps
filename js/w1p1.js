let app = document.getElementById('app');

function fetchPhotos () {
	fetch('https://vanillajsacademy.com/api/photos.json').then(function(response) {
		if (response.ok) {
			return response.json();
		}
		throw response;

	}).then(renderPhotos)

	.catch(function(error) {
		console.log(error);
	});
}

function renderPhotos (data) {
	let figs = [];
	let html = '<div id="photos" class="photos">';
	console.log(data);
	for (let p of data) {
		let id = p.id,
		url = p.url,
		name = p.name,
		desc = p.description,
		price = p.price;
		html += `
<figure class="photo" id="${id}">
	<img src="${url}" alt="${desc}" />
	<figcaption class="photo-caption">
		<div class="photo-title">${name}</div>
		<div class="photo-price">$${price}</div>
	</figcaption>
</figure>
		`;
	}
	html += '</div>';
	app.innerHTML = html;
}

fetchPhotos();