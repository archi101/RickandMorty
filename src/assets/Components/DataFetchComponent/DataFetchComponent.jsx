import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DataFetchComponent.css';
import { useQuery } from 'react-query';

const DataFetchComponent = () => {
    const [page, setPage] = useState(1);
    const [lastEpisodeNames, setLastEpisodeNames] = useState({});

    const fetchData = async ({ queryKey }) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching data");
        }
    };

    const { data, isLoading, isError } = useQuery(['characters', page], fetchData, {
        keepPreviousData: true,
    });

    useEffect(() => {
        if (data?.results) {
            data.results.forEach((character) => {
                const lastEpisodeUrl = character.episode[character.episode.length - 1];
                if (lastEpisodeUrl && !lastEpisodeNames[character.id]) {
                    axios.get(lastEpisodeUrl)
                        .then((response) => {
                            setLastEpisodeNames(prev => ({
                                ...prev,
                                [character.id]: response.data.name,
                            }));
                        })
                        .catch(() => {
                            setLastEpisodeNames(prev => ({
                                ...prev,
                                [character.id]: "Unknown Episode",
                            }));
                        });
                }
            });
        }
    }, [data]);

    if (isLoading) return <div>...loading</div>;
    if (isError) return <div>Error loading data</div>;

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, 42));

    return (
        <div className='contentContainer'>
            <h1>Rick And Morty</h1>
            <div className='characterWrapper'>
                {data.results && data.results.map((character) => (
                    <div key={character.id} className='characterDiv'>
                        <div className='characterImage'>
                            <img src={character.image} alt={character.name} />
                        </div>
                        <div className='characterDetails'>
                            <h2>{character.name}</h2>
                            <div className='statusSpecies'>
                                <p className='status'>Status: {character.status}</p>
                                <p className='species'>Species: {character.species}</p>
                            </div>
                            <p>Location Name: {character.location.name}</p>
                            <p>Last Seen In: {lastEpisodeNames[character.id] || "Loading..."}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pageTransitionButtons'>
                <button onClick={handlePrev} disabled={page === 1}>Previous</button>
                <button onClick={handleNext} disabled={page === 42}>Next</button>
            </div>
        </div>
    );
};

export default DataFetchComponent;
