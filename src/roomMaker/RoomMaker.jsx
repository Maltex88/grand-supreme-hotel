import React from 'react';
import './roomMaker.sass'

import firebase from 'firebase/app';
import 'firebase/firestore';
class RoomMaker extends React.Component{


    handleClickAdd = e => {
        let counter = 8;
        let roomsToAdd = 1;

        for (let i = 0; i < roomsToAdd; i++) {
            counter ++;
            console.log('this is counter', counter)
            let obj = {
                    roomType: 'Supreme Room',
                    roomNumber: counter,
                    fromDate: '',
                    toDate: '',
                    availableRoom: true,
                    Balcony: 'No',
                    Oceanview: 'No',
                    FreeMinibar: 'Yes',
                    FreeRoomService: 'Yes',
                 };
                const collectionRef = firebase.firestore().collection('HotelRooms');
                collectionRef.add(obj)
                .then(() => {

                    })
                    .catch(error => {

                        })
        }
    }

    render(){
        return(
            <div className="makerOfTheRoom">

                <button onClick={this.handleClickAdd}>Lägg till</button>

            </div>
        )
    }
}
export default RoomMaker
