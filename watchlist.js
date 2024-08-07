let watchlistContainer = document.getElementById("watchlist-container")
const apiKey = "5d1ecff"
let myWatchlist = JSON.parse(localStorage.getItem("myWatchlist")) || [];

async function renderMyWatchlist() {
    let myWatchlistHtml = ""
    
    if(myWatchlist.length > 0) {
        for (let movie of myWatchlist) {
        const movieDetails = await getMovieDetails(movie.imdbID)
        
        myWatchlistHtml += `
<div id="movie-list">
    <img class="movie-poster" src="${movie.Poster}">
    <div id="movie-info">
        <div id="movie-info-one">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-imdbRating">⭐ ${movieDetails.imdbRating}</p>
        </div>
        <div id="movie-info-two">
            <p class="movie-runtime">${movieDetails.Runtime}</p>
            <p class="movie-genre">${movieDetails.Genre}</p>
            <button id="remove-button">
                <i class="fa-solid fa-circle-minus" id="remove-icon"></i>
                <p>Remove</p>
            </button>
        </div>
        <p class="movie-plot">${movieDetails.Plot}</p>
    </div>
</div>
<hr>f
        `
        }
    } else {
        myWatchlistHtml = `
<div class="msg">
    <h2>Your watchlist is looking a little empty...</h2>
    <a href="index.html"><div id="watchlist-add-button">
        <i class="fa-solid fa-circle-plus" id="add-icon"></i>
        <p>Let’s add some movies!</p>
    </div></a>
</div>
        `
    }
    
    if (watchlistContainer) {
        watchlistContainer.innerHTML = myWatchlistHtml;
    }
}

document.addEventListener('dblclick', function(e) {
    const removeButton = e.target.closest("#remove-button");
    if (removeButton) {
        const selectedMovie = removeButton.closest("#movie-list");
        if (selectedMovie) {
            const selectedMovieIndex = Array.from(selectedMovie.parentNode.children).indexOf(selectedMovie);
            if (selectedMovieIndex !== -1) {
                myWatchlist.splice(selectedMovieIndex, 1);
                localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist));
                renderMyWatchlist();
            }
        }
    }
})

async function getMovieDetails(ID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${ID}&plot=short&r=json`)
    const data = await response.json()
    return data
}

renderMyWatchlist()