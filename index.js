const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
let movielistContainer = document.getElementById("movielist-container")
const searchContainer = document.getElementById("search-container")
const apiKey = "5d1ecff"
let myMovieWatchlist = JSON.parse(localStorage.getItem("myMovieWatchlist")) || [];
let movieArray = []
console.log(myMovieWatchlist)

searchButton.addEventListener('click', async ()=> {
    const inputValue = searchInput.value
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}`)
    const data = await response.json()
        
    movieArray = data.Search
    let movieHtml = ""
    
    if(movieArray) {
        for (let movie of movieArray) {
        const movieDetails = await getMovieDetails(movie.imdbID)
                
        movieHtml += `
<div id="movie-list" data-imdbid="${movie.imdbID}">
    <img class="movie-poster" src="${movie.Poster}">
    <div id="movie-info">
        <div id="movie-info-one">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-imdbRating"><i class="fa-solid fa-star star-icon"></i> ${movieDetails.imdbRating}</p>
        </div>
        <div id="movie-info-two">
            <p class="movie-runtime">${movieDetails.Runtime}</p>
            <p class="movie-genre">${movieDetails.Genre}</p>
            <button id="add-button">
                <i class="fa-solid fa-circle-plus" id="add-icon"></i>
                <p>Watchlist</p>
            </button>
        </div>
        <p class="movie-plot">${movieDetails.Plot}</p>
    </div>
</div>
<hr>
        `
        }
    } else {
        movieHtml = `
<div class="msg">
    <h2>
        Unable to find what you’re looking for. Please try another search.
    </h2>
</div>
            `
    }
    
    movielistContainer.innerHTML = movieHtml
})

document.addEventListener('click', function(e) {
    const addButton = e.target.closest("#add-button");
    if (addButton) {
        const selectedMovie = addButton.closest("#movie-list")
        const imdbID = selectedMovie.getAttribute("data-imdbid")
        const selectedMovieData = movieArray.find((movie) => movie.imdbID === imdbID)
        let isAdded = false

        for (let movie of myMovieWatchlist) {
            if (movie.imdbID === imdbID) {
                isAdded = true
            }
        }

        if (!isAdded) {
            myMovieWatchlist.push(selectedMovieData)
            localStorage.setItem("myMovieWatchlist", JSON.stringify(myMovieWatchlist))
        } else {
            console.log("This movie is already in your watchlist!");
        }
    }
});

async function getMovieDetails(ID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${ID}&plot=short&r=json`)
    const data = await response.json()
    return data
}

