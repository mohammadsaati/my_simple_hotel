import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HotelContext } from '../../contexts/hotel/HotelContext';

const HotelsPage = ({ match }) => {
    const [load, setLoad] = useState(false);
    const hotelContext = useContext(HotelContext);
    const countryName = match.params.country;

    const getData = async () => {
        setLoad(true)
        await hotelContext.state.getHotels();
        setLoad(false);
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, []);
    const hotels = hotelContext.state.findByCountry(countryName);

    if (load) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ marginTop: '50vh' }}>
                <div class="spinner-grow text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {
                hotels.map(hotel => (
                    <div className="row mb-4" style={styles.box}>
                        <div className="col-lg-4 col-md-4" style={{ padding: '0px' }}>
                            <img src={hotel.imageUrl} className="img-fluid" alt={hotel.name} style={styles.ciclar} />
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <h1>{`${hotel.name}`}</h1>
                            <small>
                                <p className="text-secondary">
                                    <i className="fas fa-map-marker-alt"></i>
                                    &nbsp;
                                    {
                                        `Location : ${hotel.location}`
                                    }
                                </p>
                            </small>
                            <p className="text-secondary">{`${hotel.advantage}`}</p>
                            <br />
                            <Link to={`/hotel/${hotel.name}`} className="btn btn-sm btn-primary">More</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
const styles = {
    box: {
        boxShadow: '4px 4px 4px #ccc',
        borderRadius: '6px'
    },
    ciclar: {
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px'
    }
}
export default HotelsPage;