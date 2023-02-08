import { useState, useEffect } from "react";

const useCharacters = url => {
    const [characters, setCharacers] = useState([]);

    useEffect(()=> {
        fetch(url)
        .then(response => response.json())
        .then(data => setCharacers(data.results))
    }, [url]);

    return characters;
}

export default useCharacters;