import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState('')

  // const handleClick = async () => {
  //     const data = await fetch('https://backend.cappsule.co.in/api/v1/new_search?q=' + query.toLowerCase() + '&pharmacyIds=1,2,3')
  //     const json = await data.json();
  //     console.log(json)
  // }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/medicines?q=${query}`);
  };

  return (
    <div className='container'>
      <div className='heading'>Cappsule web development test</div>

      <div className="search-container" >
        <img src="/Frame 1738.png" alt="" />
        <input type="text" className='search-box'
          placeholder='Type your medicine name here'
          value={query}
          onChange={(e) => setQuery(e.target.value)} />
        <button className='search-btn' onClick={handleClick}>Search</button>
      </div>

      <img src="/Line 97.png" alt="" className='hr-line' />
    </div>
  )
}

export default Header;
