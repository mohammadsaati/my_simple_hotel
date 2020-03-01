import React from 'react';

import AddRoomForm from '../forms/AddRoomForm';
import Nav from '../UI/Nav';

const AddRoomPage = ({ match }) => {
    const hotelId = match.params.hotelId;

    return (
        <div className="container-fulid mb-4">
            <Nav />
            <br />
            <AddRoomForm hotelId={hotelId} />
        </div>
    );
}

export default AddRoomPage;