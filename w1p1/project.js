let endpoint = 'https://vanillajsacademy.com/api/photos.json',
	app = document.getElementById('app');

console.log('here');

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};

function fetchPhotos (endpoint) {
	fetch(endpoint).then(function(response) {
		if (response.ok) {
			return response.json();
		}
		throw response;

	}).then(renderPhotos)

	.catch(function(error) {
		console.log(error);
		renderError();
	});
}

function renderPhotos (data) {
	let figs = [];
	let html = '<div id="photos" class="photos">';
	console.log(data);
	for (let p of data) {
		// let id = sanitizeHTML(p.id),
		// 	url = sanitizeHTML(p.url),
		// 	name = sanitizeHTML(p.name),
		// 	desc = sanitizeHTML(p.description),
		// 	price = sanitizeHTML(p.price);
		let id = p.id,
		url = p.url,
		name = p.name,
		desc = p.description,
		price = p.price;
		html += `
<figure class="photo" id="${id}">
	<img src="${url}" />
	<figcaption class="photo-caption">
		<div class="photo-title">${name}</div>
		<div class="photo-description">${desc}</div>
		<div class="photo-price">$${price}</div>
	</figcaption>
</figure>
		`;
	}
	html += '</div>';
	app.innerHTML = html;
}

function renderError() {
	app.innerHTML = 'No photos for you!';
}

fetchPhotos(endpoint);