import React, { useContext } from 'react';

import { RoomContext } from '../../contexts/room/RoomContext';
import { HotelContext } from '../../contexts/hotel/HotelContext';

const Orders = ({ order }) => {
    const roomContext = useContext(RoomContext);
    const roomName = roomContext.state.findById(order.hotelId);

    const hotelContext = useContext(HotelContext);
    const hotel = hotelContext.state.findById(roomName.hotelId);

    return (
        <div className="col-12" >
            <div className="row">

                <div className="col-lg-4 col-md-12">
                    <p>
                        <small className="text-secondary">
                            <i className="fas fa-hotel"></i>
                            &nbsp;
                            roomNumber :
                        </small>
                        <b>{roomName.number}</b>
                    </p>
                </div>

                <div className="col-lg-2 col-md-12">
                    <p className="text-success"><b>{roomName.type}</b></p>
                </div>


                <div className="col-lg-6 col-md-12">
                    <p>
                        <small className="text-secondary">
                            <i className="fas fa-map-marked-alt"></i>
                            &nbsp;
                            Location : 
                            &nbsp;
                        </small>
                        <small>{hotel.location}</small>
                    </p>
                </div>

            </div>
        </div>

    );
}

export default Orders;