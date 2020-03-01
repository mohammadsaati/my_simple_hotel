import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

import { OrderContext } from '../../contexts/OrderContext';
import { RoomContext } from '../../contexts/room/RoomContext';
import { HotelContext } from '../../contexts/hotel/HotelContext';
import Nav from '../UI/Nav';
import Orders from '../UI/Orders';
import AddHotelForm from '../forms/AddHotelForm';
import MyHotels from '../UI/MyHotels';


const Panel = () => {
    const orderContext = useContext(OrderContext);
    const roomContext = useContext(RoomContext);
    const hotelContext = useContext(HotelContext);

    useEffect(() => {
        roomContext.state.getRooms();
        hotelContext.state.getHotels();
        orderContext.state.getOrders();
        // eslint-disable-next-line
    }, []);

    if (!Cookies.get('token')) {
        window.location.replace('/login');
    }


    return (
        <div className="container-fulid mb-4">
            <Nav />

            <div className="d-flex justify-content-center" style={{ padding: '10px' }}>
                <div className="col-lg-6 col-md-12">
                    <div className="box bg-warning">My orders</div>
                    <br />
                    <div className="container">
                        <div className="row">
                            {
                                orderContext.state.orders.map((order) => (
                                    order.userToken === Cookies.get('token') ?
                                        <Orders order={order} />
                                        : ''
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="box bg-success">Add hotel</div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12" style={{ marginTop: '6px' }}>
                                <AddHotelForm />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="col-12 mt-4">
                <div className="box bg-info">Manage hotels</div>
                <div className="mt-4" style={{ padding: '0px 23px' }}>
                    <div className="row">
                        <MyHotels />
                    </div>
                </div>
            </div>

           

        </div>

    );

}

export default Panel;