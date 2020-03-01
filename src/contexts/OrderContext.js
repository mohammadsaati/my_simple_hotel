import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


import { Order } from './Model';

export const OrderContext = createContext();

export const OrderProvider = (props) => {

    const [orders, setOrders] = useState([]);

    const order = async (hotelId) => {
        const url = 'https://horelre.firebaseio.com/orders.json';
        const todaysDate = new Date();

        const data = {
            date: todaysDate.getFullYear() + '/' + todaysDate.getMonth() + '/' + todaysDate.getDate(),
            userInfo: Cookies.get('token'),
            hotelId: hotelId
        }

        try {
            const response = await axios.post(url, data);
            console.log(response.data);
        } catch (error) {
            throw error;
        }
    }

    const getOrders = async () => {
        const url = 'https://horelre.firebaseio.com/orders.json';
        var loadedOrder = [];
        try {
            const response = await axios.get(url);
            for (const key in response.data) {
                loadedOrder.push(
                    new Order(
                        key,
                        response.data[key].date,
                        response.data[key].userInfo,
                        response.data[key].hotelId
                    )
                );
            }
            setOrders(loadedOrder);
        } catch (error) {
            throw error
        }
    }

    return (
        <OrderContext.Provider
            value={{
                state: {
                    'order': order,
                    'getOrders': getOrders,
                    'orders': orders
                }
            }}
        >
            {props.children}

        </OrderContext.Provider>
    );
}