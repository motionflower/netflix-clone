function toggleSearch() {
    var searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
}


let type = '';

document.addEventListener('DOMContentLoaded', function() {
    const genreOptions = document.getElementById('genreList').children;

    if (window.location.href.includes('movies.html')) {
      type = 'movie';
  } else if (window.location.href.includes('tvshows.html')) {
      type = 'tv';
  }

    Array.from(genreOptions).forEach(option => {
      option.addEventListener('click', function() {
        const genreId = this.getAttribute('data-genre-id');
        fetchData('', genreId);  // fetchData will handle clearing and updating the movie display
        console.log(this.textContent); // Log the genre name
        console.log(genreId); // Log the genre ID
        });
    });
});

function fetchData(keyword, genreId) {
  const apiKey = '9abd94e670c7ca7d0c5fb3d68f95604d';
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&with_genres=${genreId}&query=${encodedKeyword}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          displayMovies(data.results);  // Pass the movie data to displayMovies
      })
      .catch(error => console.error('Error:', error));
}


function displayMovies(movies) {
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = ''; // Clear existing content before displaying new movies

  movies.forEach(movie => {
      const movieElem = document.createElement('div');
      movieElem.classList.add('movie');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const img = document.createElement('img');
      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.src = imageUrl;
      img.alt = movie.title; // Good for accessibility and SEO
      img.onerror = function() {
          this.src = 'path/to/default/image.jpg'; // Fallback image
      };

      const description = document.createElement('p');
      description.classList.add('description');
      description.textContent = truncateText(movie.overview, 150); // Apply truncation function

      const rating = document.createElement('span');
      rating.classList.add('rating');
      rating.textContent = `Rating: ${movie.vote_average.toFixed(1)} / 10`; // Truncate rating to 1 digit after the dot
      rating.style.display = 'block'; // Make it a block element to appear on a new line

      imageContainer.appendChild(img);
      imageContainer.appendChild(description);
      imageContainer.appendChild(rating); 
      movieElem.appendChild(imageContainer);
      moviesContainer.appendChild(movieElem);
  });
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

