import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
  return (
    <div className="Search my-5">
        <input type="text" className='form-control' ref={searchInput} placeholder='Buscar...' value={search} onChange={handleSearch} />
    </div>
  )
}

export default Search