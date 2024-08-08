const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
let movielistContainer = document.getElementById("movielist-container")
const searchContainer = document.getElementById("search-container")
const apiKey = "5d1ecff"
let myWatchlist = JSON.parse(localStorage.getItem("myWatchlist")) || [];

searchButton.addEventListener('click', async ()=> {
    const inputValue = searchInput.value
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}`)
    const data = await response.json()
        
    const movieArray = data.Search
    let movieHtml = ""
    
    if(movieArray) {
        for (let movie of movieArray) {
        const movieDetails = await getMovieDetails(movie.imdbID)
                
        movieHtml += `
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
    
    document.addEventListener('click', function(e) {
        const addButton = e.target.closest("#add-button")
        if(addButton) {
            const selectedMovie = addButton.closest("#movie-list")
            const selectedMovieIndex = Array.from(selectedMovie.parentNode.children).indexOf(selectedMovie)
            const selectedMovieData = movieArray[selectedMovieIndex]
            let isAdded = false
            
            for(let movie of myWatchlist) {
                if(movie.imdbID === selectedMovieData.imdbID) {
                    isAdded = true
                }
            }
                
            if(!isAdded) {
                myWatchlist.push(selectedMovieData)
                localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
            } else {
                console.log("this movie is already in your watchilist!")
            }
        }
    })
    
    movielistContainer.innerHTML = movieHtml
})

async function getMovieDetails(ID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${ID}&plot=short&r=json`)
    const data = await response.json()
    return data
}

