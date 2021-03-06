import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {  Link } from "react-router-dom";

import './Database.css'


const Database = (props) => {
  let loggo;
  let roomInfo;
  let roomStats;

    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        const hotelCollection = db.collection('HotelRooms');
        hotelCollection.get().then(snapshot => {
            let tierList = [];
            snapshot.forEach(doc => {
                let tierObj = {
                    ...doc.data(),
                    id: doc.id
                };
                tierList.push(tierObj);
            })
            setRoomData(tierList)
        })
    }, []);




    let listRoom = null;
    if(roomData) {

        listRoom = roomData.map(rooms => {


          if (rooms.roomType === 'Queen Room') {
            loggo = require('../shared/roomIMG/hotel-room-3652757_1920.jpg');
            roomInfo = `This is our smallest and most cozy of our hotelroom, but it still holds our premium standard and we promise you that this room will fit your every need.`
            roomStats =
            <ul className="roomStats">
              <li>Balcony: {rooms.Balcony}</li>
              <li>Ocean view: {rooms.Oceanview}</li>
              <li>Free Minibar: {rooms.FreeMinibar}</li>
              <li>Free RoomService: {rooms.FreeRoomService}</li>
            </ul>
          }
          if(rooms.roomType === 'King Room') {
              loggo = require('../shared/roomIMG/hotel-room-1447201_1920.jpg');
              roomInfo = `This is the smack in the middle of our Supreme Room and our Queen Room, this room is truly fit for a king`
              roomStats =
              <ul className="roomStats">
                <li>Balcony: {rooms.Balcony}</li>
                <li>Ocean view: {rooms.Oceanview}</li>
                <li>Free Minibar: {rooms.FreeMinibar}</li>
                <li>Free RoomService: {rooms.FreeRoomService}</li>
              </ul>
          }

          if (rooms.roomType === 'Supreme Room') {
            loggo = require('../shared/roomIMG/apartment-1822409_1920.jpg');
            roomInfo = `The king of kings, the supreme room. This room is a true beauty and screams premium and luxury design`
              roomStats =
              <ul className="roomStats">
                <li>Balcony: {rooms.Balcony}</li>
                <li>Ocean view: {rooms.Oceanview}</li>
                <li>Free Minibar: {rooms.FreeMinibar}</li>
                <li>Free RoomService: {rooms.FreeRoomService}</li>
              </ul>
          }
          if (props.selectedRoomType === rooms.roomType) {
            let  bookings = rooms.bookings;
            let falseFromDate = props.fromDate;
            let falseToDate = props.toDate;
            let counter = 0;
            let i;
            if (rooms.bookings) {
              for (i = 0; i < bookings.length; i++) {
                if((falseToDate <= bookings[i].fromDate && falseFromDate < bookings[i].toDate) || (falseToDate > bookings[i].fromDate && falseFromDate > bookings[i].toDate) ) {
                  counter ++;
                }
              }
              if(counter === i){



                return <li className="Room"key={rooms.id}><img className="roomImg" src={loggo} alt="Smiley face" height="242" width="342" /><div><h3>{rooms.roomType}</h3><p className="roomInfo">{roomInfo}</p>{roomStats}
                  <Link
    to={{
      pathname: '/ConfirmBooking/',
      aboutProps:{
        checkInDate: props.fromDate,
        checkOutDate: props.toDate,
        roomId: rooms.id,
        roomType: rooms.roomType,

      }
    }}

    >
      <button className="goToConfirmBtn">Book Now</button>
</Link>

              </div></li>
              } else {
                return false;
              }
            }
            else {
                return <li className="Room"key={rooms.id}><img className="roomImg" src={loggo} alt="Smiley face" height="242" width="342" /><div><h3>{rooms.roomType}</h3><p className="roomInfo">{roomInfo}</p>{roomStats}
                  <Link
            to={{
              pathname: '/ConfirmBooking/',
              aboutProps:{
                checkInDate: props.fromDate,
                checkOutDate: props.toDate,
                roomId: rooms.id,
                  roomType: rooms.roomType,
              }
            }}

            >
              <button className="goToConfirmBtn">Book Now</button>
  </Link>
                </div></li>
            }
        }

        return listRoom
    })



};

        return(

                <ul
                  className="Rooms">
                  {listRoom}
                </ul>

        )
}

export default Database
