window.utils = {};

window.utils.apiFetch = function (searchText, callback) {
	const API_KEY = 'c9af24510c420407dd2d2bff8d7f4441';
	let url = 'https://api.themoviedb.org/3/';
	let pathname;
	let query = `api_key=${API_KEY}`;

	if (searchText) {
		pathname = 'search/movie';
		query += `&query=${searchText}`;
	} else {
		pathname = 'trending/movie/week';
	}

	fetch(`${url}${pathname}?${query}`, {method: 'GET'})
		.then(response => response.json())
		.then(body => {
			if (body && body.results) {
				callback(body.results);
			}
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
};

window.utils.removeChildrenFromRoot = function() {
	const root = document.querySelector('#root');

	for (let i = 0; i < root.children.length; i++) {
		const child = root.children[i];

		if (!child.classList.contains('search-box')) {
			child.remove();
		}
	}
};

window.onload = function() {
	searchPanel();
	utils.apiFetch(null, renderFilms);

	function renderFilms(data) {
		utils.removeChildrenFromRoot();
		const root = document.querySelector('#root');
		const moviesListElement = document.createElement('div');
		moviesListElement.id = 'movies';

		for(let i = 0; i < data.length; i++) {
			const film = document.createElement('div');
			film.className = 'movie';
			film.innerText = data[i].title;
			film.addEventListener('click', function(e) {
				utils.removeChildrenFromRoot();

				const movie = new utils.Movie(data[i]);
				movie.render();
			});
			moviesListElement.append(film);
		}

		root.appendChild(moviesListElement);
	}

	function searchInput() {
		const input = document.createElement('input');
		input.className = 'search-movie';
		input.type = 'text';
		input.placeholder = 'Type movie name here';

		return input;
	}

	function searchBtn() {
		const button = document.createElement('button');
		button.type = 'button';
		button.innerText = 'Search';

		button.addEventListener('click', function (event) {
			const searchInput = document.querySelector('.search-movie');
			utils.apiFetch(searchInput.value.trim(), renderFilms);
		});

		return button;
	}

	function searchPanel() {
		const root = document.querySelector('#root');
		const searchBox = document.createElement('div');
		searchBox.className = 'search-box';

		const input = searchInput();
		const searchButton = searchBtn();

		searchBox.append(input, searchButton);
		root.appendChild(searchBox);
	}
};