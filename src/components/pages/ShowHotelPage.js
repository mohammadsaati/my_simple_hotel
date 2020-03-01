import React, { useContext, useEffect } from 'react';

import { HotelContext } from '../../contexts/hotel/HotelContext';
import { RoomContext } from '../../contexts/room/RoomContext';
import { UserContext } from '../../contexts/user/UserContext';
import HotelsRoom from '../UI/HotelsRoom';
import Nav from '../UI/Nav';

const ShowHotelPage = ({ match }) => {
    const hotelContext = useContext(HotelContext);
    const roomContext = useContext(RoomContext);
    const userContext = useContext(UserContext);
    const hotelName = match.params.name;

    const getData = async () => {
        try {
            await roomContext.state.getRooms();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const loadedHotel = hotelContext.state.showHotel(hotelName);
    const rooms = roomContext.state.hotelsRoom(loadedHotel.id);

    return (
        <>
            {
                userContext.state.isLogedIn ? <Nav /> : ''
            }
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 bg-warning" style={style.box}>

                        <div className="row">
                            <div className="col-6">
                                <h1>{`${loadedHotel.name}`}</h1>
                            </div>
                            <div className="col-6">
                                <small>
                                    <p className="text-secondary">
                                        <i className="fas fa-flag"></i>
                                        &nbsp;
                                    {`${loadedHotel.country}`}
                                    </p>
                                </small>
                                <small>
                                    <p className="text-secondary">
                                        <i className="fas fa-map-marker-alt"></i>
                                        &nbsp;
                                    {`${loadedHotel.location}`}
                                    </p>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <img src={`${loadedHotel.imageUrl}`} className="img-fluid" alt={`${loadedHotel.imageUrl}`} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12" dangerouslySetInnerHTML={{ __html: loadedHotel.description }}></div>
                </div>

                <div className="row mt-4">
                    <div className="col-12" style={style.box}>
                        <h3>Our rooms</h3>
                    </div>
                </div>

                <div className="row mt-4">
                    <HotelsRoom rooms={rooms} />
                </div>

                <br />
            </div>
        </>
    );
}

const style = {
    box: {
        boxShadow: '-1px 4px 4px #ccc',
        padding: '10px',
        borderRadius: '5px'
    }
}

export default ShowHotelPage;