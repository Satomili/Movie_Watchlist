let watchlistContainer = document.getElementById("watchlist-container")
const apiKey = "5d1ecff"
let myMovieWatchlist = JSON.parse(localStorage.getItem("myMovieWatchlist")) || [];

// Render the movie watchlist on the page
async function renderMyMovieWatchlist() {
    let myMovieWatchlistHtml = ""
    
    if(myMovieWatchlist.length > 0) {
        for (let movie of myMovieWatchlist) {
        const movieDetails = await getMovieDetails(movie.imdbID)
        const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "no-image-placeholder.png"
        
        myMovieWatchlistHtml += `
<div id="movie-list" data-imdbid="${movie.imdbID}">
    <img class="movie-poster" src="${posterUrl}">
    <div id="movie-info">
        <div id="movie-info-one">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-imdbRating"><i class="fa-solid fa-star star-icon"></i> ${movieDetails.imdbRating}</p>
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
        myMovieWatchlistHtml = `
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
        watchlistContainer.innerHTML = myMovieWatchlistHtml;
    }
}

// Event listener for removing movies from watchlist
document.addEventListener('click', function(e) {
    const removeButton = e.target.closest("#remove-button")
    if (removeButton) {
        const selectedMovie = removeButton.closest("#movie-list")
        if (selectedMovie) {
            const imdbID = selectedMovie.getAttribute("data-imdbid")
            const selectedMovieIndex = myMovieWatchlist.findIndex(movie => movie.imdbID === imdbID)
            if (selectedMovieIndex !== -1) {
                const movieTitle = myMovieWatchlist[selectedMovieIndex].Title
                myMovieWatchlist.splice(selectedMovieIndex, 1)
                localStorage.setItem("myMovieWatchlist", JSON.stringify(myMovieWatchlist))
                renderMyMovieWatchlist()
                showNotification(`"${movieTitle}" is deleted from your watchlist!`)
            }
        }
    }
})

// Function to fetch movie details
async function getMovieDetails(ID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${ID}&plot=short&r=json`)
    const data = await response.json()
    return data
}

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification')
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-check"></i>
            <div class="notification-msg">
                <h3>${message}</h3>
            </div>
        </div>
    `
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 3000)
}

// Initial rendering of the movie watchlist on page load
renderMyMovieWatchlist()