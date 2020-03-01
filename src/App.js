import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HotelProvider } from './contexts/hotel/HotelContext';
import { RoomProvider } from './contexts/room/RoomContext';
import { UserProvider } from './contexts/user/UserContext';
import { OrderProvider } from './contexts/OrderContext';
import Home from './components/Home';
import HotelsPage from './components/pages/HotelsPage';
import ShowHotelPage from './components/pages/ShowHotelPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Panel from './components/pages/Panel';
import AddRoomPage from './components/pages/AddRoomPage';

import './App.css';


const App = () => {
  return (
    <HotelProvider>
      <RoomProvider>
        <UserProvider>
          <OrderProvider>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/panel' component={Panel} />
                <Route exact path='/addroom/:hotelId' component={AddRoomPage} />
                <Route exact path='/hotels/:country' component={HotelsPage} />
                <Route exact path='/hotel/:name' component={ShowHotelPage} />
              </Switch>
            </Router>
          </OrderProvider>
        </UserProvider>
      </RoomProvider>
    </HotelProvider>
  );
}

export default App;
