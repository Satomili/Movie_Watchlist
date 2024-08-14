# Movie Watchlist

## Description

Movie Watchlist is a web application that allows users to track and manage their favorite movies. You can add movies to your watchlist, view movie details, and remove movies from the list.

## Features

- Search for movies by title
- View movie details (title, poster, IMDb rate, runtime, genre, plot)
- Add movies to your watchlist
- Remove movies from your watchlist
- Responsive design for any device

## Installation

To run the project locally, follow these steps:

1. **Get a free API key at OMDB API ( <https://www.omdbapi.com/> )**
2. **Clone the repository**

    ```
    git clone https://github.com/yourusername/movie-watchlist.git
    ```
    Replace `yourusername` with your GitHub username
3. **Navigate to the project directory**

    ```
    cd movie-watchlist
    ```
4. **Install dependencies (NPM packages)**

    ```
    npm install
    ```
5. **Enter your API key in `index.js` and `watchlist.js`**

    Open `index.js` and `watchlist.js` and replace `"5d1ecff"` with your own API key from OMDB API.
    ```
    const apiKey = "YOUR_API_KEY"
    ```
6. **Set Local Storage**

    Ensure you have a local storage key named `"myMovieWatchlist"` or it will be created automatically.
7. **Run the Project Locally**
    ```
    npm start
    ```
    This will start a local server to host the project.

## Technologies

- **JavaScript :** ES6 and later
- **HTML :** HTML5
- **CSS :** CSS3 including Flexbox and Grid Layout

## Usage

1. Open the `index.html` file in your browser.
2. Use the search bar to find movies by title.
3. Click "+ Watchlist" to add a movie to your watchlist.
4. View and manage your watchlist in the `watchlist.html` file.
5. Click "Remove" to delete a movie from your watchlist.

