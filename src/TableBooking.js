import React, { useState, useEffect } from "react";
import axios from 'axios';

const url ='https://f255-210-245-110-144.ngrok-free.app/'
const TableBooking = () => {
    const[bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get(url +'/bookings',
                {
                    withCredentials: true
                }).then(res => {
                    setBookings(res.data.bookings)})
    }, []);
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Room Name</th>
              <th>Time Start</th>
              <th>Time End</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((book, key) => {
                    return(
                        <>
                        <tr key={book.bookings_id}>
                            <td>{key+1}</td>
                            <td>{book.room_name}</td>
                            <td>{book.time_start_booking}</td>
                            <td>{book.time_end_booking}</td>
                            <td>{book.employees_name}</td>
                        </tr>
                        </>
                    )
                }
            ) 
            }

          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableBooking;
