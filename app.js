let page = 1;
const btnPreview = document.getElementById('btn-preview');
const btnNext = document.getElementById('btn-next');

const KeyAPI = `66c63e35c5e08237f8f56bc92e712eb1`;

btnNext.addEventListener('click', () => {
    if (page < 1000) {
        page += 1;
        return fetchAPI();
    }
});

btnPreview.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        return fetchAPI();
    }
});

const fetchAPI = async () => {

    try {
        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=66c63e35c5e08237f8f56bc92e712eb1&language=es-MX&page=${page}`);
        console.log(res);

        if (res.status === 200) {
            let data = await res.json();
            console.log(data);

            let movies = '';
            data.results.forEach(movie => {

                var date = movie.release_date;

                movies += `
                    <div class="movie card w-80 bg-base-200 shadow-xl rounded-2xl">
                        <figure><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-full"/></figure>
                        <div class="card-body">
                            <h2 class="card-title text-center font-semibold">${movie.title}</h2>
                            <p class="text-base">${movie.overview}</p>
                            <div class="card-actions justify-end">
                                <div class="radial-progress text-accent" style="--value:${movie.vote_average * 10};">${movie.vote_average * 10 + '%'}</div>
                            </div>
                        </div>
					</div>
                    `;
            })

            document.getElementById('container').innerHTML = movies;

        } else if (res.status === 401) {
            console.log('Unauthorized');
        } else if (res.status === 404) {
            console.log('Not found');
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.log(error)
    }
}

fetchAPI();