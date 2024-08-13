// DOM elements
const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-container")
let movielistContainer = document.getElementById("movielist-container")
const searchContainer = document.getElementById("search-container")
const apiKey = "5d1ecff" // API key for OMDB API

// Load the movie watchlist from local storage or initialize an empty array
let myMovieWatchlist = JSON.parse(localStorage.getItem("myMovieWatchlist")) || [];
let movieArray = [] // Array to store movie data from API

// Event listener for search form submission
searchForm.addEventListener('submit', async (e)=> {
    e.preventDefault()
    const inputValue = searchInput.value.trim()

    // Fetch movie data from the API
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}`)
    const data = await response.json()
        
    movieArray = data.Search
    let movieHtml = ""
    
    if(movieArray) {
        for (let movie of movieArray) {
        const movieDetails = await getMovieDetails(movie.imdbID)
        const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "no-image-placeholder.png"
                
        movieHtml += `
<div id="movie-list" data-imdbid="${movie.imdbID}">
    <img class="movie-poster" src="${posterUrl}">
    <div id="movie-info">
        <div id="movie-info-one">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-imdbRating"><i class="fa-solid fa-star star-icon"></i> ${movieDetails.imdbRating}</p>
        </div>
        <div id="movie-info-two">
            <p class="movie-runtime"><i class="fa-regular fa-clock"></i> ${movieDetails.Runtime}</p>
            <p class="movie-genre"><i class="fa-solid fa-video"></i> ${movieDetails.Genre}</p>
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

// Event listener for Enter key in search input
searchInput.addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
        searchButton.click()
    } 
})

// Event listener for adding movies to watchlist
document.addEventListener('click', function(e) {
    const addButton = e.target.closest("#add-button");
    if (addButton) {
        const selectedMovie = addButton.closest("#movie-list")
        const imdbID = selectedMovie.getAttribute("data-imdbid")
        const selectedMovieData = movieArray.find((movie) => movie.imdbID === imdbID)
        const movieTitle = selectedMovieData.Title
        let isAdded = false

        for (let movie of myMovieWatchlist) {
            if (movie.imdbID === imdbID) {
                isAdded = true
            }
        }

        if (!isAdded) {
            myMovieWatchlist.push(selectedMovieData)
            localStorage.setItem("myMovieWatchlist", JSON.stringify(myMovieWatchlist))
            showNotification(`"${movieTitle}" added to your watchlist!`)
        } else {
            showNotification(`"${movieTitle}" is already in your watchlist!`)
        }
    }
});

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-check"></i>
            <div class="notification-msg">
                <h3>${message}</h3>
                <p>Check your watchlist from <b><a href="watchlist.html">here</a></b></p>
            </div>
        </div>
    `

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000)
}

// Function to fetch movie details
async function getMovieDetails(ID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${ID}&plot=short&r=json`)
    const data = await response.json()
    return data
}

