import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
query GetMovies {
  getMovies {
    AuthorId
    Casts {
      MovieId
      id
      name
      profilePict
    }
    Genre {
      name
    }
    GenreId
    id
    imgUrl
    rating
    slug
    synopsis
    title
    trailerUrl
  }
}
`

export const GET_MOVIE = gql`
    query GetMovie($getMovieId: ID) {
    getMovie(id: $getMovieId) {
        Casts {
        MovieId
        id
        name
        profilePict
        }
        Genre {
        name
        }
        GenreId
        id
        imgUrl
        rating
        slug
        synopsis
        title
        trailerUrl
        AuthorId
        Author {
        username
        email
        }
    }
    }
`