import React, { useState, useReducer, useMemo, useRef, useCallback  } from 'react'
import { Card, Image } from 'semantic-ui-react'
import './Characters.css'
import Search from './Search'
import useCharacters from '../hooks/UseCharacters'

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/'

const favoriteReducer = (state, action) => {
    switch(action.type){
        case'ADD_TO_FAVORITE':
        return{
            ...state,
            favorites: [...state.favorites, action.payload]
        }
        default:
            return state
    }
}

const Characters = () => {

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState('')
    const searchInput = useRef(null)

    const characters = useCharacters(API);

    const handleClick = favorite => {
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value);
    // }

    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // })

    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    return (
        <div className='container characters__container'>
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>
            {favorites.favorites.map(favorite => (
                <li className='' key={"favorito__"+favorite.id+"_"+favorite.name}>
                    {favorite.name}
                </li>
            ))}
            <div className='Characters mt-5'>
                <div className="row">
                    {filteredUsers.map(character => (
                        <div className="col-3 my-2 cards" key={character.id}>
                            <Card >
                                <Image src={character.image} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>{character.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{character.created}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {character.location.name}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {/* <button type='button' onClick={()=> handleClick(character)}>Agregar a favoritos</button> */}
                                    <button onClick={()=> handleClick(character)}>
                                        <span>agregar a favoritos</span>
                                        <div className="top"></div>
                                        <div className="left"></div>
                                        <div className="bottom"></div>
                                        <div className="right"></div>
                                    </button>
                                </Card.Content>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Characters