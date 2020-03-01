import React, { createContext, useState } from 'react';
import axios from 'axios';

import { Room } from '../Model';

export const RoomContext = createContext();

export const RoomProvider = (props) => {

    const [rooms, setRooms] = useState([
        new Room('r1', '-M170ydDurgfn2-0KH0q', '321', 'primary', '4', 'dinner', true, true, false, false, '50', 'https://roomshotels.com/wp-content/uploads/2016/11/MG_4827-768x512.jpg'),
        new Room('r2', 'h1', '387', 'deluxe', '4', 'dinner', true, true, true, false, '80', 'https://cocoandcreme.com/wp-content/uploads/2019/08/5527f47fdd0895c44f8b459e-750-422.jpg'),
        new Room('r3', 'h1', '351', 'primary', '3', 'dinner and breafast', true, false, false, false, '102', 'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg%3D/hotels/45000000/44100000/44097900/44097833/2b801ab0_z.jpg?tr=q-40,w-740,h-500,fo-auto,n-dynamic&_src=imagekit'),
        new Room('r4', 'h1', '301', 'iplomat', '2', 'dinner and lunch', true, true, false, false, '40', 'https://www.dreamhotels.com/d/meatpackingdistrict/media/__thumbs_1600_621_crop/AoS-gP3Tz9jQJxMd38h7qLxyuXXWo_Igq3izKx9E8UU.jpg'),
        new Room('r5', 'h2', '331', 'primary', '1', 'dinner', false, true, false, false, '77.2', 'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/07/03/Photos/Processed/hotel12-k54--621x414@LiveMint.jpg'),
        new Room('r6', 'h2', '378', 'deluex', '4', 'dinner', true, true, false, false, '32.25', 'https://2vhl7g2tr8qy3p930937a2lq-wpengine.netdna-ssl.com/wp-content/uploads/sites/9/2019/11/Inntel-Hotels-Art-Eindhoven-Art-Jaccuzzi-kamer-Overview-1030x687.jpg'),
        new Room('r7', 'h2', '521', 'typical', '2', 'noservice', true, true, false, false, '98.41', 'https://138hch2qt9j695k636u0c2hf-wpengine.netdna-ssl.com/wp-content/uploads/sites/12/2017/07/Eind-Loft-Junior-Suite.jpg'),
    ]);



    const hotelsRoom = (hotelId) => {
        var hotelRoom = [];

        rooms.forEach(room => {
            if (room.hotelId === hotelId) {
                hotelRoom.push(room);
            }
        })

        return hotelRoom;
    }

    const findById = (id) => {
        return rooms.find(room => room.id === id);
    }
    const getRooms = async () => {
        const url = "https://horelre.firebaseio.com/rooms.json";
        var loadedRoom = [];
        try {
            const response = await axios.get(url);
            for (const key in response.data) {
                loadedRoom.push (
                    new Room (
                        key ,
                        response.data[key].hotelId ,
                        response.data[key].number ,
                        response.data[key].type ,
                        response.data[key].bedAmount ,
                        response.data[key].services ,
                        response.data[key].hasWifi ,
                        response.data[key].hasGym ,
                        response.data[key].hasPool ,
                        response.data[key].isReserved ,
                        response.data[key].price ,
                        response.data[key].imageUrl
                    )
                );
            }
            setRooms(loadedRoom);
        } catch (error) {
            throw error
        }
    }

    const addRoom = async (room) => {
        const url = "https://horelre.firebaseio.com/rooms.json";
        try {
            await axios.post(url, room);
        } catch (error) {
            throw error
        }
    }


    return (
        <RoomContext.Provider
            value={{
                state: {
                    'rooms': rooms,
                    'hotelsRoom': hotelsRoom,
                    'findById': findById,
                    'addRoom': addRoom ,
                    'getRooms' : getRooms ,
                  
                }
            }}
        >
            {props.children}
        </RoomContext.Provider>
    );
}