
import React from "react";
import TableEmployee from "./TableEmployee";
import TableBooking from "./TableBooking";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route>
        <Route path="employees" element={<TableEmployee/>}/>
        <Route path="list_booking" element={<TableBooking />}/>
        
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
 
}
export default App;
