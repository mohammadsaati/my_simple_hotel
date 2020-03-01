import React, { useState, createContext } from 'react';

import axios from 'axios';

import { Hotel } from '../Model';

export const HotelContext = createContext();

export const HotelProvider = (props) => {

    const [hotels , setHotels] = useState([
        new Hotel('h1', '65', 'Whitepod Hotel', 'Canada', 'German', 'https://q-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg', 'The hotel in German', 'this is the best'),
        new Hotel('h2', '65', 'Attrap Reves', 'Canada', 'United Kingdom', 'https://r-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg', 'The hotel in UK', 'we have good pool'),
        new Hotel('h3', '65', 'The Caves Resort', 'Canada', 'The USA', 'https://r-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_glamping/6e181b9e942c160f4605239be7ddc1728cbcc4c8.jpg', 'The hotel in NewYotk', 'we have good resturants'),
        new Hotel('h4', '65', 'Hotel de Glace', 'Poladn', 'Poladn', 'https://q-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-holidayhomes_300/604c7484d34a9e8791c2d5a0e2df4bc8c803dc7c.jpg', 'The hotel in ploand', 'services is good'),
        new Hotel('h5', '65', 'Magic Mountain Lodge', 'Italy', 'Italy', 'https://q-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_riad/ec1ea267f18d830b68ca76a666734f8e93a1853d.jpg', 'The hotel in Italia', 'The best consert'),
    ]);

    const getHotels = async () => {
        const url = 'https://horelre.firebaseio.com/hotels.json';
        var loadedHotels = [];
        try {
            const response = await axios.get(url);
            for (const key in response.data) {
                loadedHotels.push(
                    new Hotel(
                        key ,
                        response.data[key].userToken ,
                        response.data[key].name ,
                        response.data[key].country ,
                        response.data[key].location ,
                        response.data[key].imageUrl ,
                        response.data[key].description ,
                        response.data[key].advantage
                    )
                );
            }
            setHotels(loadedHotels);
        } catch (error) {
            console.log(error);
        }
    }

    const addNewHotel = async (hotel) => {
        const url = 'https://horelre.firebaseio.com/hotels.json';
        try {
            await axios.post(url,hotel);
        } catch (error) {
            throw error
        }
    }

    const deleteHotel = async (id) => {
        const url = `https://horelre.firebaseio.com/hotels/${id}.json`;

        try {
            await axios.delete(url);
        } catch (error) {
            console.log(error)
        }
    }


    const findByCountry = (country) => {
        var hotelsCounrties = [];
        hotels.forEach(hotel => {
            if (hotel.country === country) {
                hotelsCounrties.push(hotel)
            }
        });
        return hotelsCounrties;
    }


    const showHotel = (name) => {
        return hotels.find(hotel => hotel.name === name);
    }

    const findById = (id) => {
        return hotels.find(hotel => hotel.id === id);
    }

    const myHotel = (token) => {
        var mine = [];
        hotels.forEach((hotel) => {
            if (hotel.userToken === token) {
                mine.push(hotel)
            }
        })
        return mine;
    }


    return (
        <HotelContext.Provider
            value={{
                state: {
                    'hotels': hotels,
                    'findByCountry': findByCountry,
                    'findById': findById,
                    'getHotels': getHotels,
                    'addNewHotel': addNewHotel,
                    'myHotel': myHotel,
                    'showHotel': showHotel ,
                    'deleteHotel' : deleteHotel ,
                    
                }
            }}
        >
            {props.children}
        </HotelContext.Provider>
    );
}