import axios from 'axios';

export class Hotel {

    constructor(id, userToken , name, country, location, imageUrl, description, advantage) {
        this.id = id
        this.userToken = userToken
        this.name = name
        this.country = country
        this.location = location
        this.imageUrl = imageUrl
        this.description = description
        this.advantage = advantage
    }
}

export class Room {
    constructor(id, hotelId, number, type, bedAmount, services, hasWifi, hasGym, hasPool, isReserved , price, imageUrl) {
        this.id = id
        this.hotelId = hotelId
        this.number = number
        this.type = type
        this.bedAmount = bedAmount
        this.services = services
        this.hasWifi = hasWifi
        this.hasGym = hasGym
        this.hasPool = hasPool
        this.isReserved = isReserved
        this.price = price
        this.imageUrl = imageUrl
    }

    Reserve = async (id) => {
        const url = `https://horelre.firebaseio.com/rooms/${id}.json`;
        const data = {
            isReserved : "true"
        }
        this.isReserved = "true";
        try {
            await axios.patch(url , data)
        } catch (error) {
            window.location.reload('/');
        }
    }
}

export class User {
    constructor(id, userName, password, fullName, phoneNumber) {
        this.id = id
        this.userName = userName
        this.password = password
        this.fullName = fullName
        this.phoneNumber = phoneNumber
    }
}

export class Customer extends User {

    constructor(id, userName, password, fullName, phoneNumber, natinalityCode, country) {
        super(id, userName, password, fullName, phoneNumber)
        this.natinalityCode = natinalityCode
        this.country = country
    }
}

export class Hoteler extends User {

    constructor(id, userName, password, fullName, phoneNumber, hotelCode , hotelId ) {
        super(id, userName, password, fullName, phoneNumber)
        this.hotelCode = hotelCode
        this.hotelId = hotelId
    }
}

export class Order {
    constructor (id , date , userToken , hotelId) {
        this.id = id
        this.date = date
        this.userToken = userToken
        this.hotelId = hotelId
    }
}