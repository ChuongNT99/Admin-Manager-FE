
import React from "react";
import TableEmployee from "./TableEmployee";
import TableBooking from "./TableBooking";
import RoomManagement from "./RoomManagement";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route>
        <Route path="employees" element={<TableEmployee/>}/>
        <Route path="list_booking" element={<TableBooking />}/>
        <RoomManagement/>
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
 
}
export default App;
