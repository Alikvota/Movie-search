class Movie {
	constructor(data) {
		this.posterLink = data.poster_path;
		this.title = data.title;
		this.overview = data.overview;
	}

	getPoster() {
		const element = document.createElement('img');
		element.src = `https://image.tmdb.org/t/p/w300${this.posterLink}`;
		element.alt = this.title;

		return element;
	}

	getTitle() {
		const element = document.createElement('div');
		element.innerText = this.title;
		return element;
	}

	getOverview() {
		const element = document.createElement('div');
		element.innerText = this.overview;
		return element;
	}

	render() {
		const rootElement = document.querySelector('#root');
		const movieElement = document.createElement('div');
		movieElement.id = 'movie';

		movieElement.append(this.getPoster(), this.getTitle(), this.getOverview());
		rootElement.append(movieElement);
	}
}

utils.Movie = Movie;