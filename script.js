function toggleSearch() {
    var searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
}

// API implementation

function fetchData(keyword, genreId) {
  const apiKey = '9abd94e670c7ca7d0c5fb3d68f95604d';
  const encodedKeyword = encodeURIComponent(keyword);
  // Adjusted URL for search/movie with genre filtering
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedKeyword}&with_genres=${genreId}`;

  console.log("URL being fetched:", url); // Debugging to see what URL is used

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        console.log(data.results); // This contains the array of movies
      } else {
        console.log('No results found');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Example call: Search for 'superman' movies in the Action genre
fetchData('superman', 28); // 28 is the genre ID for Action


function fetchMovieGenres() {
  const apiKey = '9abd94e670c7ca7d0c5fb3d68f95604d';
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const genresMap = new Map();
      data.genres.forEach(genre => {
        genresMap.set(genre.id, genre.name);
      });
      console.log(genresMap); // This prints out the map of genres with their IDs
    })
    .catch(error => console.error('Error:', error));
}

// Example call: Search for most popular movies in the specified genre
fetchMovieGenres(); // Fetch the movie genres first

