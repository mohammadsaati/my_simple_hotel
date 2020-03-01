import React, { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import { HotelContext } from '../../contexts/hotel/HotelContext';
import { countries } from '../CountiesName';


const AddHotelForm = () => {
    const [countriesName] = useState(countries);
    const hotelContext = useContext(HotelContext);

    const [info, setInfo] = useState({
        name: '',
        country: '',
        location: '',
        imageUrl: '',
        description: '',
        advantage: '',
        userToken: Cookies.get('token')
    });

    const onChange = e => setInfo({ ...info, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            !info.name ||
            !info.advantage ||
            !info.description ||
            !info.location ||
            !info.imageUrl ||
            info.country === '...'
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Please check the inputs',
                html: '',
                timer: 2000,
            })
        } else {
            try {
                await hotelContext.state.addNewHotel(info);
                Swal.fire({
                    icon: 'success',
                    title: 'You\r hotel added',
                    html: '',
                    timer: 2000,
                })
                setTimeout(() => { window.location.reload() } , 3000)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oh we have problem',
                    html: '',
                    timer: 2000,
                })
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-row">

                <div className="col-lg-6 col-md-12">
                    <input type="text" name="name" className="form-control" value={info.name} onChange={onChange} placeholder="hotel name" />
                </div>

                <div className="col-lg-6 col-md-12">
                    <select className="custom-select" name="country" onChange={onChange}>
                        <option value="..." defaultChecked>Choose one of them</option>
                        {
                            countriesName.map(country => (
                                <option value={country}>{country}</option>
                            ))
                        }
                    </select>
                </div>

            </div>

            <div className="form-row mt-4">

                <div className="col-lg-6 col-md-12">
                    <input type="text" name="location" className="form-control" value={info.location} onChange={onChange} placeholder="hotel location" />
                </div>

                <div className="col-lg-6 col-md-12">
                    <input type="text" name="imageUrl" className="form-control" value={info.imageUrl} onChange={onChange} placeholder="hotel imageUrl" />
                </div>

            </div>

            <div className="form-row mt-4">
                <div className="col-12">
                    <textarea name="description" className="form-control" value={info.description} onChange={onChange} placeholder="add some description"></textarea>
                </div>
            </div>

            <div className="form-row mt-4">
                <div className="col-12">
                    <textarea name="advantage" className="form-control" value={info.advantage} onChange={onChange} placeholder="What's you'r hotel advantage?"></textarea>
                </div>
            </div>

            <button type="submit" className="btn btn-danger text-center mt-4 full-width">
                <i className="fas fa-paper-plane"></i>
                &nbsp;
                New hotel
            </button>

        </form>
    );
}

export default AddHotelForm;