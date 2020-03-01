import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


import { HotelContext } from '../../contexts/hotel/HotelContext';

const MyHotels = () => {
    const hotelContext = useContext(HotelContext);

    useEffect(() => {
        hotelContext.state.getHotels();

        // eslint-disable-next-line
    }, []);

    const onDelete = async (id) => {
        try {
            await hotelContext.state.deleteHotel(id);
            Swal.fire({
                icon: 'success',
                title: 'Hotel deleted',
                html: '',
                timer: 2000,
            })
            window.location.reload();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Woops! we have some error',
                html: '',
                timer: 2000,
            })
        }
    }

    const mine = hotelContext.state.myHotel(Cookies.get('token'));

    return (
        <div className="col-12">
            {
                mine.map(hotel => (
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <div className="row mb-4">
                                <div className="col-lg-3 col-md-12" style={
                                    {
                                        backgroundImage: `url(${hotel.imageUrl})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: '4px',
                                        boxShadow: '4px 4px 4px #ccc'
                                    }
                                }>

                                </div>
                                <div className="col-lg-8 col-md-12">
                                    <p><b>{hotel.name}</b></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <p>
                                <i className="fas fa-street-view"></i>
                                &nbsp;
                                {hotel.location}
                            </p>
                        </div>

                        <div className="col-lg-3 text-center">
                            <small className="text-primary">
                                <Link to={`/addroom/${hotel.id}`}>
                                    <i className="fas fa-plus-square"></i>
                                    &nbsp;
                                    Add room
                                </Link>
                            </small>
                        </div>

                        <div className="col-lg-2 text-center">
                            <small>
                                <Link className="text-danger" onClick={() => { onDelete(hotel.id)}}>
                                    <i className="fas fa-trash-alt"></i>
                                </Link>
                            </small>
                        </div>



                    </div>
                ))
            }
        </div>
    );
}

export default MyHotels;