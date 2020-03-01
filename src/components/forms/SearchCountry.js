import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { countries } from '../CountiesName';

const SearchCountry = () => {

    const [countriesName] = useState(countries);
    const [country , setCountry] = useState('');

    return (
        <div className="card mt-4">
            <div className="card-header bg-primary text-light">
                Could you tell use where do you want to go?
           </div>
            <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="country"><h4>Search Country</h4></label>
                        <select className="custom-select" name="country" onChange={(e) => setCountry(e.target.value)}>
                            <option value="..." defaultChecked>Choose one of them</option>
                            {
                                countriesName.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Link to={ country !=='' && country !=='...' ? `/hotels/${country}` : '/' } className={ country !=='' && country !=='...' ? `btn btn-primary` : `btn btn-danger disabled`} style={{ width: '100%' }}>
                        {
                            country !=='' && country !=='...' ? 'Find hotel' : 'Select'
                        }
                    </Link>
                            
            </div>
        </div>
    );
}

export default SearchCountry;