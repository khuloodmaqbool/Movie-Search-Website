import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define an interface for the movie data
interface MovieData {
    Title: string;
    Plot: string;
    Actors: string;
    Genre: string;
    Director: string;
    Runtime: string;
    Released: string;
    Year: string;
    imdbRating: string;
    Poster: string;
}

export const GetMovie = () => {
    const [apiData, setApiData] = useState<MovieData | null>(null);
    const [searchMovie, setSearchMovie] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleMovieBtn = async () => {
        setApiData(null);
        setLoading(true);
        setError(false);
        const api = `https://www.omdbapi.com/?t=${searchMovie}&apikey=662780f9`;

        try {
            const response = await fetch(api);
            if (!response.ok) throw new Error("Movie Not Found");
            const data: MovieData = await response.json();
            setApiData(data);
        } catch (error: any) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-5xl font-black text-center bg-orange_color py-5 text-black" style={{ fontFamily: "AnyBody" }}>
                Search Movie Website
            </h1>
            <div className="flex flex-col justify-center items-center w-fit mx-auto">
                <Input
                    className="lg:w-96 md:w-96 w-2/8 py-6 px-4 text-lg mt-12"
                    placeholder="Type Movie Name"
                    type="text"
                    value={searchMovie}
                    onChange={(event) => setSearchMovie(event.target.value)}
                />
                <Button
                    variant="outline"
                    className="text-lg w-fit my-8 text-white rounded-lg py-6 px-8 bg-orange_color"
                    onClick={handleMovieBtn}
                >
                    Search
                </Button>
            </div>

            {loading ? (
                <div className="loader"></div>
            ) : error ? (
                <p>Error fetching movie data. Please try again.</p>
            ) : (
                apiData && (
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">MOVIE NAME</h2>
                                    <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-5xl title-font font-medium mb-4">{apiData.Title}</h1>

                                    <p className="leading-relaxed mb-4">{apiData.Plot}</p>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Actors</span>
                                        <span className="ml-auto text-gray-900">{apiData.Actors}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Genre</span>
                                        <span className="ml-auto text-gray-900">{apiData.Genre}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Director</span>
                                        <span className="ml-auto text-gray-900">{apiData.Director}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Runtime</span>
                                        <span className="ml-auto text-gray-900">{apiData.Runtime}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Released</span>
                                        <span className="ml-auto text-gray-900">{apiData.Released}</span>
                                    </div>
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Year</span>
                                        <span className="ml-auto text-gray-900">{apiData.Year}</span>
                                    </div>
                                    <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                        <span className="text-gray-500">Rating</span>
                                        <span className="ml-auto text-gray-900">{apiData.imdbRating}</span>
                                    </div>
                                </div>
                                <img alt="Movie Poster" className="lg:w-1/2 w-full lg:h-auto h-auto object-cover object-top rounded" src={apiData.Poster} />
                            </div>
                        </div>
                    </section>
                )
            )}
        </>
    );
};
