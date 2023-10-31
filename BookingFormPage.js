import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://f255-210-245-110-144.ngrok-free.app';

const BookingFormPage = ({ selectedRoom }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [bookingData, setBookingData] = useState({
    room_id: '',
    time_start_booking: '',
    time_end_booking: '',
    employees_id: '',
  });

  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url + '/employee', {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ngrok-Trace-Id': 'bc47d5235e969cbcdd63082f9efdeb9c',
          Server: 'Werkzeug/3.0.0 Python/3.12.0',
          'cache-control': 'no-cache,private',
        },
      });
      setEmployees(response.data.employee);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }

    const currentTime = new Date().toLocaleString();
    setCurrentTime(currentTime);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setBookingData(prevData => ({
        ...prevData,
        room_id: selectedRoom.room_id,
      }));
    }
  }, [selectedRoom]);

  const handleBookingDataChange = e => {
    const { name, value } = e.target;
    setBookingData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmployeeSelection = employeeId => {
    console.log(employeeId);
    const parsedEmployeeId = parseInt(employeeId, 10);
    setBookingData(prevData => ({
      ...prevData,
      employees_id: parsedEmployeeId,
    }));

    console.log('Selected employee:', employeeId);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post(url + '/bookings', bookingData, {
        withCredentials: true,
      });
      console.log('Booking data sent:', bookingData);

      setBookingData({
        room_id: '',
        time_start_booking: '',
        time_end_booking: '',
        employee_id: '',
      });
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  return (
    <div>
      <h2>Đặt phòng</h2>
      <p>Phòng đã chọn: {selectedRoom.room_name}</p>
      <p>Ngày hiện tại: {currentTime}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='time_start_booking'>Thời gian bắt đầu:</label>
          <input
            type='datetime-local'
            id='time_start_booking'
            name='time_start_booking'
            value={bookingData.time_start_booking}
            onChange={handleBookingDataChange}
            required
          />
        </div>

        <div>
          <label htmlFor='time_end_booking'>Thời gian kết thúc:</label>
          <input
            type='datetime-local'
            id='time_end_booking'
            name='time_end_booking'
            value={bookingData.time_end_booking}
            onChange={handleBookingDataChange}
            required
          />
        </div>

        <div>
          <label>Chọn nhân viên:</label>
          <select
            value={bookingData.employee_id}
            onChange={e => handleEmployeeSelection(e.target.value)}
          >
            <option value=''>-- Chọn nhân viên --</option>
            {employees.map(employee => (
              <option key={employee.employees_id} value={employee.employees_id}>
                {employee.employees_name}
              </option>
            ))}
          </select>
        </div>

        <button type='submit'>Đặt Phòng</button>
      </form>
    </div>
  );
};

export default BookingFormPage;
