import React from 'react';

import SearchCountry from './forms/SearchCountry';
const Home = () => {

    return (
        <div className="container mt-4">
           <h1 className="m-auto"> <b>Find You'r country hotel</b></h1>
            <br/>
            <SearchCountry />
        </div>
    );
}

export default Home;