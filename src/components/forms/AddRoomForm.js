import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

import { RoomContext } from '../../contexts/room/RoomContext';

const AddRoomForm = ({ hotelId }) => {
    const [load, setLoad] = useState(false);
    const [roomInfo, setRoomInfo] = useState({
        hotelId: hotelId,
        number: '',
        type: 'primary',
        bedAmount: '',
        services: '',
        hasWifi: 'false',
        hasGym: 'false',
        hasPool: 'false',
        isReserved: 'false',
        price: '',
        imageUrl: ''
    });
    const roomContext = useContext(RoomContext);

    const onChange = e => setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            !roomInfo.number ||
            !roomInfo.bedAmount ||
            !roomInfo.services ||
            !roomInfo.price ||
            !roomInfo.imageUrl
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Please cheeck inputs',
                html: '',
                timer: 2000,
            })
        } else {
            try {
                setLoad(true);
                await roomContext.state.addRoom(roomInfo);
                Swal.fire({
                    icon: 'success',
                    title: 'room added',
                    html: '',
                    timer: 2000,
                })
                setTimeout(() => window.location.replace('/panel'), 2500);
                setLoad(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Woops! try again',
                    html: '',
                    timer: 2000,
                })
            }
        }
    }

    if (load) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ marginTop: '50vh' }}>
                <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ position: 'relative' }}>
            <div className="row">
                <div className="over-lay-dark"></div>
                <div className="col-12" style={{ padding: '20px ' }}>
                    <h2><b>Add room</b></h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-row" >

                            <div className="col-lg-4 col-md-12">
                                <input type="text" name="number" value={roomInfo.number} onChange={onChange} placeholder="hotel number" className="form-control" />
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <input type="text" name="bedAmount" value={roomInfo.bedAmount} onChange={onChange} placeholder="bed amount" className="form-control" />
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <input type="text" name="price" value={roomInfo.price} onChange={onChange} className="form-control" placeholder="price : 20$ per night" />
                            </div>
                        </div>

                        <div className="form-row">

                            <div className="col-lg-3 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="type"><b className="text-danger">room tye</b></label>
                                    <select name="type" className="custom-select" onChange={onChange}>
                                        <option defaultChecked value="primary">primary</option>
                                        <option value="deluxe">deluxe</option>
                                        <option value="diplomat">diplomat</option>
                                        <option value="typical">typical</option>
                                        <option value="VIP">VIP</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="hasWifi"><b className="text-danger">has Wifi?</b></label>
                                    <select name="hasWifi" className="custom-select" onChange={onChange}>
                                        <option defaultChecked value="false">no</option>
                                        <option value="true">yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="hasGym"><b className="text-danger">has Gym?</b></label>
                                    <select name="hasGym" className="custom-select" onChange={onChange}>
                                        <option defaultChecked value="false">no</option>
                                        <option value="true">yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="hasPool"><b className="text-danger">has Pool?</b></label>
                                    <select name="hasPool" className="custom-select" onChange={onChange}>
                                        <option defaultChecked value="false">no</option>
                                        <option value="true">yes</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="mt-4">
                            <input type="text" className="form-control" name="imageUrl" value={roomInfo.imageUrl} onChange={onChange} placeholder="Your hotel image URL" />
                        </div>

                        <div className="mt-4">
                            <textarea name="services" className="form-control" value={roomInfo.services} onChange={onChange} placeholder="What's this room services?" style={{ height: '150px' }}></textarea>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn btn-outline-warning sp-btn text-center full-width">
                                <i className="fas fa-plus"></i>
                                &nbsp;
                                Create
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AddRoomForm;