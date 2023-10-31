import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomManagement.css';
import { RxUpdate } from 'react-icons/rx';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import BookingFormPage from './BookingFormPage';

const url = 'https://f255-210-245-110-144.ngrok-free.app';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [edit, setEditId] = useState(-1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [redirectToBookingForm, setRedirectToBookingForm] = useState(false);

  const fetchData = async () => {
    await axios
      .get(url + '/rooms', {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ngrok-Trace-Id': 'bc47d5235e969cbcdd63082f9efdeb9c',
          Server: 'Werkzeug/3.0.0 Python/3.12.0',
          'cache-control': 'no-cache,private',
        },
      })
      .then(res => {
        setRooms(res.data.rooms);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (redirectToBookingForm) {
      setSelectedRoom(null);
      setRedirectToBookingForm(false);
    }
  }, [redirectToBookingForm]);

  const handleSubmit = async event => {
    event.preventDefault();
    await axios
      .post(url + '/rooms', { room_name: roomName })
      .then(res => {
        fetchData();
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleEdit = id => {
    setEditId(id);
  };

  const handleUpdate = async () => {
    await axios
      .put(url + '/rooms/' + edit, { room_name: roomName })
      .then(res => {
        console.log(res.data.rooms);
        fetchData();
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = async id => {
    await axios
      .delete(url + '/rooms/' + id)
      .then(res => {
        fetchData();
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleToggleBookingForm = room => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleHideBookingForm = () => {
    setShowBookingForm(false);
  };

  return (
    <div className='container'>
      {!showBookingForm && (
        <div className='form-div'>
          <form action='' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter room'
              onChange={e => setRoomName(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
          </form>
          <div className='action'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, key) => {
                  return (
                    <tr key={room.room_id}>
                      <td>{key}</td>
                      <td>
                        {edit === room.room_id ? (
                          <input
                            type='text'
                            value={roomName}
                            onChange={e => setRoomName(e.target.value)}
                          />
                        ) : (
                          room.room_name
                        )}
                      </td>
                      <td>{room.status ? 'Đang bận' : 'Rảnh'}</td>
                      <td>
                        {edit === room.room_id ? (
                          <RxUpdate onClick={handleUpdate} />
                        ) : (
                          <FiEdit3
                            onClick={() => handleEdit(room.room_id)}
                            style={{ color: 'blue' }}
                          />
                        )}
                        <RiDeleteBin6Fill
                          onClick={() => handleDelete(room.room_id)}
                          style={{
                            color: 'red',
                            marginLeft: 12,
                            marginRight: 12,
                          }}
                        />
                        <button onClick={() => handleToggleBookingForm(room)}>
                          Đặt phòng
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showBookingForm && (
        <BookingFormPage
          selectedRoom={selectedRoom}
          onHideBookingForm={handleHideBookingForm}
        />
      )}
    </div>
  );
};

export default RoomManagement;
