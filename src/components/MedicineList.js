import React from 'react'
import Medicine from './Medicine'
import Header from './Header'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const MedicineList = () => {
    const [saltSuggestions, setSaltSuggestions] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        if (query) {
            fetchSalt();
          }
    }, [query])

    const fetchSalt = async () => {
        const data = await fetch(`https://backend.cappsule.co.in/api/v1/new_search?q=${query}&pharmacyIds=1,2,3`)
        const json = await data.json();
        setSaltSuggestions(json?.data?.saltSuggestions)
    }

    // console.log(saltSuggestions)

    return (
        <div>
            <Header />
            <div className='salt-container'>
                {saltSuggestions.map((salt, index) => {
                    return <Medicine key={salt.id} salt_forms_json={salt.salt_forms_json} index={index} />
                })}
            </div>
        </div>
    )
};

export default MedicineList
