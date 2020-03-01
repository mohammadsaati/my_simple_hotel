import React, { useContext, useEffect } from 'react';

import Swal from 'sweetalert2';
import { UserContext } from '../../contexts/user/UserContext';
import { OrderContext } from '../../contexts/OrderContext';

const HotelRooms = ({ rooms }) => {

    const userContext = useContext(UserContext);
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        userContext.state.cheeckLogedIn();
        console.log(rooms)
    }, [rooms, userContext.state]);

    const order = async (id) => {
        if (!userContext.state.isLogedIn) {
            Swal.fire({
                icon: 'error',
                title: 'Please login',
                html: '',
                timer: 2000,
            })

        } else {
            try {
                await orderContext.state.order(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Room reserved for you',
                    html: '',
                    timer: 2000,
                })
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Try it late , Thanks',
                    html: 'we have some error to send http request , please try it later',
                    timer: 2000,
                })
            }
        }

    }

    return (
        rooms.map(room => (
            <div className="col-lg-4 col-md-12 mb-4" key={room.id}>
                <div className="card">
                    <img src={room.imageUrl} className="card-img-top" alt={room.imageUrl} />
                    <div className="card-body">
                        <h4>Hotel type : {room.type}</h4>
                        <br />
                        <small>
                            <p className="text-secondary">
                                <i className="fas fa-concierge-bell"></i>
                                &nbsp;
                                {room.services}
                            </p>
                            <p className="text-success">
                                <i className="fas fa-bed"></i>
                                &nbsp;
                                beds : {room.bedAmount}
                            </p>
                        </small>
                        <p className="text-danger">price : {room.price} $</p>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <small>
                                    {
                                        room.hasWifi === "true" ? <i className="text-success fas fa-wifi"></i> : <i className="text-secondary fas fa-wifi"></i>
                                    }
                                    &nbsp;&nbsp;&nbsp;
                                    {
                                        room.hasGym === "true" ? <i className="text-success fas fa-dumbbell"></i> : <i className="text-secondary fas fa-dumbbell"></i>
                                    }
                                    &nbsp;&nbsp;&nbsp;
                                    {
                                        room.hasPool === "true" ? <i className="text-success fas fa-swimmer"></i> : <i className="text-secondary fas fa-swimmer"></i>
                                    }
                                </small>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                {
                                    room.isReserved === "false" ?
                                        <button type="submit" className="btn btn-sm btn-primary"
                                            onClick={() => {
                                                room.Reserve(room.id);
                                                order(room.id);
                                            }
                                            }>
                                            Reseve
                                        </button>

                                        :
                                        <p className="text-warning">Reserved</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
}


export default HotelRooms;