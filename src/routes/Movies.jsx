import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useRoute } from "wouter";
import MovieList from "../components/MovieList.jsx";
import {fetchMovieCredits, fetchMovieDetails, fetchMovieProviders} from "../services/api/index.js";
import Loading from "../components/Loading.jsx";
import MovieDetails from "../components/MovieDetails.jsx";

export default function Movies() {
    const [match, { movieId }] = useRoute('/films/:movieId?');
    const [movie, setMovie] = useState(undefined);
    const [cast, setCast] = useState(undefined);
    const [providers, setProviders] = useState(undefined);
    const [location, setLocation] = useLocation();

    useEffect(() => {
        setMovie(undefined);
        if (movieId !== undefined && Number.isInteger(Number(movieId))) {
            fetchMovieDetails(movieId).then((data) => {
                setMovie(data);
            });

            fetchMovieCredits(movieId).then((data) => {
                setCast(data);
            });

            fetchMovieProviders(movieId).then((data) => {
                setProviders(data);
            });
        }
    }, [movieId]);

    useEffect(() => {
        if (movie === null) {
            setLocation("/films");
        }
    }, [movie]);



    return (
        <Switch>
            <Route path={'/films'}>
                <MovieList />
            </Route>
            <Route path={'/films/:movieId'}>
                {movie === undefined ? (
                    <>
                    <Loading />
                    </>
                ) : (
                    <MovieDetails movie={movie} cast={cast} providers={providers} />
                )}
            </Route>

            <Route>
                <MovieList />
            </Route>
        </Switch>
    );
}