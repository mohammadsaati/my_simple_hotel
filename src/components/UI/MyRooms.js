import React, { useContext , useEffect } from 'react';
import Cookies from 'js-cookie';

import { HotelContext } from '../../contexts/hotel/HotelContext';
import { RoomContext } from '../../contexts/room/RoomContext';

const MyRooms = () => {
    const hotelContext = useContext(HotelContext);
    const roomcontext = useContext(RoomContext);
    const userHotels = hotelContext.state.myHotel(Cookies.get('token'));
    // var userRooms = [];
    const findRooms = () => {
        userHotels.forEach((hotel) => {
            roomcontext.state.myRooms(hotel.id)
        })
    }

    useEffect (() => {
        findRooms()
        // eslint-disable-next-line
    } , [])

    return (
        <div>
        
        </div>
    );
}

export default MyRooms;