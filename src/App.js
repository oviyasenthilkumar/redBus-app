import "./App.css";
import sleep from './sleep.svg';
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import BookingPg from "./components/BookingPg";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Header/>,<Home/>,<Footer/>]}/>
        <Route path="buses" element={[<Header/>,<BookingPg/>]}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
