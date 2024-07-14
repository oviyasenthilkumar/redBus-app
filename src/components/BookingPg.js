import React, { useEffect, useState } from "react";
import "./Booking.css";
import Modal from './Modal';

// react Icons
import { TbPlug } from "react-icons/tb";
import { LuArmchair } from "react-icons/lu";

// material Ui
import EastIcon from "@mui/icons-material/East";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// react bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// reducer
import {
  DepartureTiming,
  ArrivalTiming,
  IconFilter,
  SingleSeat,
  BusType,
  DepartureSort,
  ArrivalSort,
  DurationSort,
  RatingSort,
  FareSort,
  AvailableSeatSort,
  SelectedSeat,
  SelectSeaterSleeper,
  SelectSeater,
  seatPriceChange
} from "./TaskSlice";


const BookingPg = () => {

  const { BusList,selectedSeats,seatsPrice } = useSelector((state) => state.redBus);
  console.log(BusList);
  const totalFare =  seatsPrice.reduce((total,acc)=>total + acc.Fare , 0)
  // filter options length
  let busCount = BusList ? BusList.length : 0;
  //  console.log(BusList);
  let array = ["bottle", "bed", "blanket", "charge", "track", "sos"];
  let bottle = BusList.filter((item) => item?.iconsArray?.includes(array[0]));
  let bed = BusList.filter((item) => item?.iconsArray?.includes(array[1]));
  let blanket = BusList.filter((item) => item?.iconsArray?.includes(array[2]));
  let charge = BusList.filter((item) => item?.iconsArray?.includes(array[3]));
  let track = BusList.filter((item) => item?.iconsArray?.includes(array[4]));
  let sos = BusList.filter((item) => item?.iconsArray?.includes(array[5]));
  //  single seat length
  let single = BusList.filter((item) => item?.singleSeat);

  // departure timing length
  let depoMrng = BusList.filter((depo) => depo.stime <= 600);
  let depoNoon = BusList.filter(
    (depo) => depo.stime <= 1200 && depo.stime > 600
  );
  let depoEve = BusList.filter(
    (depo) => depo.stime <= 1800 && depo.stime > 1200
  );
  let depoNyt = BusList.filter(
    (depo) => depo.stime < 2400 && depo.stime > 1800
  );
  // arrival timing length
  let arrMrng = BusList.filter((arr) => arr.etime <= 600);
  let arrNoon = BusList.filter((arr) => arr.etime <= 1200 && arr.etime > 600);
  let arrEve = BusList.filter((arr) => arr.etime <= 1800 && arr.etime > 1200);
  let arrNyt = BusList.filter((arr) => arr.etime < 2400 && arr.etime > 1800);

  let busType = ["nonAc", "Ac", "seater", "sleeper"];
  let nonAc = BusList.filter((item) =>
    item?.busTypeArray?.includes(busType[0])
  );
  let Ac = BusList.filter((item) => item?.busTypeArray?.includes(busType[1]));
  let seater = BusList.filter((item) =>
    item?.busTypeArray?.includes(busType[2])
  );
  let sleeper = BusList.filter((item) =>
    item?.busTypeArray?.includes(busType[3])
  );

  const location = useLocation();
  const { from, to, dayString, dates, monthString, year } = location.state || {};
  const [placeFrom, setPlaceFrom] = useState(from);
  const [placeTo, setPlaceTo] = useState(to);
  const navigate = useNavigate()
  // update places
  const handleFormPlaces = (event) => {
    event.preventDefault();
    navigate('/')
  };
  const dispatch = useDispatch();

  const [depMor, setDepMor] = useState(false);

  const [arrival, setArrival] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [activeButton, setActiveButton] = useState("");

  //  filter functions
  const handleDepartureTime = (e) => {
    let time = e.target.value;
    let newMin = 0;
    let newMax = 0;

    if (!depMor) {
      if (time === "600") {
        newMax = 600;
      } else if (time === "1200") {
        newMax = 1200;
        newMin = 600;
      } else if (time === "1800") {
        newMax = 1800;
        newMin = 1200;
      } else if (time === "2400") {
        newMax = 2400;
        newMin = 1800;
      }

      setMin(newMin);
      setMax(newMax);
      // console.log("Filtering with min:", newMin, "and max:", newMax);
      dispatch(DepartureTiming({ min: newMin, max: newMax }));
      setDepMor(true);
    } else {
      newMax = 2400;
      newMin = 0;
      setMin(newMin);
      setMax(newMax);
      dispatch(DepartureTiming({ min: newMin, max: newMax }));
      setDepMor(false);
    }
  };
  const handleArrivalTime = (e) => {
    let time = e.target.value;
    let newMin = 0;
    let newMax = 0;

    if (!arrival) {
      if (time === "600") {
        newMax = 600;
      } else if (time === "1200") {
        newMax = 1200;
        newMin = 600;
      } else if (time === "1800") {
        newMax = 1800;
        newMin = 1200;
      } else if (time === "2400") {
        newMax = 2400;
        newMin = 1800;
      }

      setMin(newMin);
      setMax(newMax);
      console.log("Filtering with min:", newMin, "and max:", newMax);
      dispatch(ArrivalTiming({ min: newMin, max: newMax }));
      setArrival(true);
    } else {
      newMax = 2400;
      newMin = 0;
      setMin(newMin);
      setMax(newMax);
      dispatch(ArrivalTiming({ min: newMin, max: newMax }));
      setArrival(false);
    }
  };

  const [icon, setIcon] = useState([]);
  const [aminity, setAminity] = useState(false);

  const handleAminity = (event) => {
    console.log(event);
    let newIcon = [event];
    let newIconDummy = ["bottle", "bed", "charge", "track", "sos", "blanket"];

    if (!aminity) {
      setIcon(newIcon);
      console.log(newIcon);
      dispatch(IconFilter({ icon: newIcon }));
      setActiveButton(event);
      setAminity(true);
    } else {
      setIcon(newIconDummy);
      console.log(newIconDummy);
      dispatch(IconFilter({ icon: newIconDummy }));
      setActiveButton(null);
      setAminity(false);
    }
  };
  const [singleSeat, setSingleSeat] = useState(false);
  const handleSingleSeat = (seats) => {
    let seat = seats;
    let isSingleSeat = singleSeat;
    if (!singleSeat) {
      dispatch(SingleSeat({ seat: seat, isSingleSeat: isSingleSeat }));
      setSingleSeat(true);
    } else {
      dispatch(SingleSeat({ seat: seat, isSingleSeat: isSingleSeat }));
      setSingleSeat(false);
    }
  };
  const [seatType, setSeatType] = useState(false);
  const handleSeatType = (type) => {
    let types = type;
    let isSeatType = seatType;
    if (!seatType) {
      dispatch(BusType({ types: type, isSeatType: isSeatType }));
      setSeatType(true);
    } else {
      dispatch(BusType({ type: type, isSeatType: isSeatType }));
      setSeatType(false);
    }
  };
  const [depSort, setDepSort] = useState(false);
  // sortBy Options
  const handleDepartureSort = () => {
    let isAsc = depSort;
    if (!depSort) {
      setDepSort(true);
      dispatch(DepartureSort(isAsc));
    } else {
      setDepSort(false);
      dispatch(DepartureSort(isAsc));
    }
  };
  const [arrSort, setArrSort] = useState(false);
  const handleArrivalSort = () => {
    let isArr = arrSort;
    if (!arrSort) {
      setArrSort(true);
      dispatch(ArrivalSort(isArr));
    } else {
      setArrSort(false);
      dispatch(ArrivalSort(isArr));
    }
  };
  const [durationSort, setDurationSort] = useState(false);
  const handleDurationSort = () => {
    let isDuration = durationSort;
    if (!durationSort) {
      setDurationSort(true);
      dispatch(DurationSort(isDuration));
    } else {
      setDurationSort(false);
      dispatch(DurationSort(isDuration));
    }
  };

  const [rate, setRate] = useState(false);
  const handleRatingSort = () => {
    let isHigh = rate;
    if (!rate) {
      setRate(true);
      dispatch(RatingSort(isHigh));
    } else {
      setRate(false);
      dispatch(RatingSort(isHigh));
    }
  };

  const [fare, setFare] = useState(false);
  const handleFareSort = () => {
    let isLess = fare;
    if (!fare) {
      setFare(true);
      dispatch(FareSort(isLess));
    } else {
      setFare(false);
      dispatch(FareSort(isLess));
    }
  };

  const [seat, setSeat] = useState(false);
  const handleAvailSeats = () => {
    let isAvail = seat;
    if (!seat) {
      setSeat(true);
      dispatch(AvailableSeatSort(isAvail));
    } else {
      setSeat(false);
      dispatch(AvailableSeatSort(isAvail));
    }
  };


  const [seatIndex, setSeatIndex] = useState(0)
 
  const handleSeatClick = (seat, bus, index, i) => {
    setSeatIndex(i)
    dispatch(SelectedSeat({bus:bus, index: index, i: i,seat:seat }))
  }
  const handleSeater = (seat, bus, index, i)=>{
    setSeatIndex(i)
    dispatch(SelectSeater({busIndex: index, seatIndex: i,seat:seat,bus:bus}))
  }

  const handleSleeperSeater =  (seat, bus, index, i)=>{
    setSeatIndex(i)
    dispatch(SelectSeaterSleeper({index: index, i: i,seat:seat,bus:bus}))
  }
  // modal
  const [showModal, setShowModal] = useState(false);
  const [busIndex,setBusIndex] = useState(0)
  const [bus,setBus] = useState()
  const handleOpenModal = (e,index,bus) => {
    setBusIndex(index)
    setBus(bus)
    e.preventDefault();
    setShowModal(true);
    
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };


  const renderTooltip = (seat) => (
    <Tooltip id={`tooltip-${seat}`}>
      <div className="tooltip">Seat: {seat.seatNo} ||
        Fare: {seat.Fare}</div>
    </Tooltip>
  );

   
 
  const [enable,setEnable] = useState(0)
  const handleSeatPrice = (e,bus,index)=>{
    const newPrice = enable ===   e.target.textContent  ? 0 : e.target.textContent;
    console.log(newPrice);
    setEnable(newPrice)
    dispatch(seatPriceChange({isEnable:newPrice,bus:bus,index:index}))
  }
    
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null); // State to track which accordion is open

  // Function to toggle accordion section
  const toggleAccordion = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Close the accordion if it's already open
    } else {
      setOpenAccordionIndex(index); // Open the selected accordion
    }
  };
  return (
    <>
      <div className="bookingBus">
        <div className="bookingFirst">
          <ul className="bookingList">
            <li>
              <a>
                <b onClick={() => navigate('/')}>Home</b>
              </a>
            </li>
            <div className="symbol">
              <img src="../redBusImg/greater-than.png" />
            </div>
            <li>Bus Tickets </li>
            <div className="symbol">
              <img src="../redBusImg/greater-than.png" />
            </div>
            <li> places </li>
            <div className="symbol">
              <img src="../redBusImg/greater-than.png" />
            </div>
          </ul>
          <p className="fromToPlaces">
            {from} to {to} Bus
          </p>
        </div>

        <div>
          <form className="bookingSecond" onSubmit={handleFormPlaces}>
            <div className="bookingPlace">
              <input
                type="text"
                value={placeFrom}
                onChange={(e) => {
                  setPlaceFrom(e.target.value);
                }}
                className="placeBusInput"
              />
              <EastIcon className="arrowIcon" />
              <input
                value={placeTo}
                type="text"
                onChange={(e) => {
                  setPlaceTo(e.target.value);
                }}
                className="placeBusInput"
              />
            </div>
            <div className="bookingDate">
              <div className="symbol">
                <img src="../redBusImg/less-than.png" />
              </div>
              <div>
                <p>
                  {dates}
                  {monthString}
                </p>

                <h6>{dayString}</h6>
              </div>
              <div className="symbol">
                <img src="../redBusImg/greater-than.png" />
              </div>
              <button className="modifyBtn" type="submit">
                Modify
              </button>
            </div>
          </form>
        </div>

        <div className="container">
          <div className="row">
            <div className="col filter">
              <div>
                <h4>FILTERS</h4>
              </div>
              <div className="aminityIconBusCnt">
                <img
                  src="../redBusImg/bus-location.png"
                  className="aminityIconBus aminityIcon"
                />
                Live Tracking
              </div>

              <div>
                <h5>DEPARTURE TIME</h5>
                <form>
                  <input
                    type="checkbox"
                    id="6am"
                    value="600"
                    name="mrng"
                    onChange={handleDepartureTime}
                  />
                  <label for="6am">
                    <img src="../redBusImg/sun-rise.png" className="filIcon" />
                    Before 6am ({depoMrng.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="mor"
                    value="1200"
                    name="noon"
                    onChange={handleDepartureTime}
                  />
                  <label for="mor">
                    <img src="../redBusImg/noon.png" className="filIcon" />
                    6am to 12pm ({depoNoon.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="afternoon"
                    value="1800"
                    name="eve"
                    onChange={handleDepartureTime}
                  />
                  <label for="afternoon">
                    <img src="../redBusImg/sunSet.png" className="filIcon" />
                    12pm to 6pm ({depoEve.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="6pm"
                    value="2400"
                    name="night"
                    onChange={handleDepartureTime}
                  />
                  <label for="6pm">
                    <img src="../redBusImg/eve.png" className="filIcon" />
                    After 6pm ({depoNyt.length}){" "}
                  </label>
                  <br />
                </form>
              </div>
              <div>
                <form>
                  <h5>BUS TYPES</h5>
                  <input
                    type="checkbox"
                    id="seater"
                    value="seater"
                    name="seat"
                    onChange={(e) => handleSeatType(e.target.value)}
                  />
                  <label for="seater"> SEATER ({seater.length}) </label>
                  <br />
                  <input
                    type="checkbox"
                    id="sleeper"
                    value="sleeper"
                    name="seat"
                    onChange={(e) => handleSeatType(e.target.value)}
                  />
                  <label for="sleeper"> SLEEPER ({sleeper.length}) </label>
                  <br />
                  <input
                    type="checkbox"
                    id="ac"
                    value="Ac"
                    name="seat"
                    onChange={(e) => handleSeatType(e.target.value)}
                  />
                  <label for="ac"> AC ({Ac.length}) </label>
                  <br />
                  <input
                    type="checkbox"
                    id="non-ac"
                    value="nonAc"
                    name="seat"
                    onChange={(e) => handleSeatType(e.target.value)}
                  />
                  <label for="non-ac"> NON AC ({nonAc.length}) </label>
                  <br />
                </form>
              </div>
              <div>
                <h5>SEAT AVAILABILITY</h5>
                <form>
                  <input
                    type="checkbox"
                    id="single"
                    value="single"
                    name="single"
                    onChange={(e) => handleSingleSeat(e.target.value)}
                  />
                  <label for="single"> SINGLE SEAT ({single.length}) </label>
                  <br />
                </form>
              </div>

              <div>
                <h5>ARRIVAL TIME</h5>
                <form>
                  <input
                    type="checkbox"
                    id="earlyMor"
                    value="600"
                    name="mrng"
                    onChange={handleArrivalTime}
                  />
                  <label for="earlyMor">
                    <img src="../redBusImg/sun-rise.png" className="filIcon" />
                    Before 6am ({arrMrng.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="noon"
                    value="1200"
                    name="noon"
                    onChange={handleArrivalTime}
                  />
                  <label for="noon">
                    <img src="../redBusImg/noon.png" className="filIcon" />
                    6am to 12pm ({arrNoon.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="evening"
                    value="1800"
                    name="evening"
                    onChange={handleArrivalTime}
                  />
                  <label for="evening">
                    <img src="../redBusImg/sunSet.png" className="filIcon" />
                    12pm to 6pm ({arrEve.length}){" "}
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    id="night"
                    value="2400"
                    name="night"
                    onChange={handleArrivalTime}
                  />
                  <label for="night">
                    <img src="../redBusImg/eve.png" className="filIcon" />
                    After 6pm ({arrNyt.length}){" "}
                  </label>
                  <br />
                </form>
              </div>

              <div>
                <h5>AMINITY</h5>
                <div>
                  <button
                    className={`aminityBtns ${activeButton === "bottle" ? "active" : ""
                      }`}
                    value="bottle"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <img
                      src="../redBusImg/bottle.png"
                      className="aminityIcon"
                    />
                    Water Bottle ({bottle.length})
                  </button>
                  <br />
                  <button
                    className={`aminityBtns ${activeButton === "blanket" ? "active" : ""
                      }`}
                    value="blanket"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <img
                      src="../redBusImg/blanket.png"
                      className="aminityIcon"
                    />
                    Blankets ({blanket.length})
                  </button>
                  <br />
                  <button
                    className={`aminityBtns ${activeButton === "charge" ? "active" : ""
                      }`}
                    value="charge"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <TbPlug /> Charging Point ({charge.length})
                  </button>
                  <br />
                  <button
                    className={`aminityBtns ${activeButton === "track" ? "active" : ""
                      }`}
                    value="track"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <img
                      src="../redBusImg/busTrack.png"
                      className="aminityIcon"
                    />
                    Track My Bus ({track.length})
                  </button>
                  <br />
                  <button
                    className={`aminityBtns ${activeButton === "sos" ? "active" : ""
                      }`}
                    value="sos"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <img src="../redBusImg/sos.png" className="aminityIcon" />
                    Emergency Contact Number ({sos.length})
                  </button>
                  <br />
                  <button
                    className={`aminityBtns ${activeButton === "bed" ? "active" : ""
                      }`}
                    value="bed"
                    onClick={(e) => handleAminity(e.target.value)}
                  >
                    <img src="../redBusImg/bed.png" className="aminityIcon" />{" "}
                    Bed Sheet ({bed.length})
                  </button>
                </div>
              </div>
            </div>
            <div className="col buses">
              <div className="carousel">
                <img src="../redBusImg/img1.png" className="carouselImg" />
                <img src="../redBusImg/img2.png" className="carouselImg" />
                <img src="../redBusImg/img3.png" className="carouselImg" />
                <img src="../redBusImg/img4.png" className="carouselImg" />
                <img src="../redBusImg/img5.png" className="carouselImg" />
                <img src="../redBusImg/img6.png" className="carouselImg" />
                <img src="../redBusImg/img7.png" className="carouselImg" />
              </div>
              <div className="sortOptions">
                <div className="noOfBuses">
                  <b> {busCount} Buses</b> found
                </div>
                <div className="sortBy">
                  <b>SORT BY:</b>
                  <p
                    onClick={handleDepartureSort}
                    className={depSort ? "red" : ""}
                  >
                    Departure{" "}
                    {depSort ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </p>
                  <p
                    onClick={handleDurationSort}
                    className={durationSort ? "red" : ""}
                  >
                    Duration{" "}
                    {durationSort ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </p>
                  <p
                    onClick={handleArrivalSort}
                    className={arrSort ? "red" : ""}
                  >
                    Arrival{" "}
                    {arrSort ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                  </p>
                  <p onClick={handleRatingSort} className={rate ? "red" : ""}>
                    Ratings {rate ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                  </p>
                  <p onClick={handleFareSort} className={fare ? "red" : ""}>
                    Fare {fare ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                  </p>
                  <p onClick={handleAvailSeats} className={seat ? "red" : ""}>
                    Seats available{" "}
                    {seat ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </p>
                </div>
              </div>

              <div className="BusLists">
                {BusList &&
                  BusList.map((bus, index) => {
                  // console.log(bus);
                    return (
                      <>
                        <div className="singleBus" key={bus.id}>
                          <div className="busBox">
                            <img src={bus.img} />

                            <div className="row-one">
                              <div className="col1">
                                <h4> {bus.busName}</h4>
                                <p className="col1-p">{bus.busType}</p>
                              </div>
                              <div className="col2">
                                <h4>{bus.departure}</h4>
                                <p className="col2-p">{bus.sPlace}</p>
                              </div>
                              <div className="col3">
                                <p className="col3-p">{bus.duration}</p>
                              </div>
                              <div className="col4">
                                <p className="col4-p-time">{bus.arrival}</p>
                                <p className="col4-p-nextDate">
                                  {dates + 1}
                                  {monthString}
                                </p>
                                <p className="col4-p">{bus.ePlace}</p>
                              </div>
                              <div className="col5">
                                <div
                                  className={
                                    bus.rating >= 4
                                      ? "ratingIcon ratingIconColor2"
                                      : bus.rating >= 3
                                        ? "ratingIcon ratingIconColor1"
                                        : "ratingIcon ratingIconColor3"
                                  }
                                >
                                  <StarBorderOutlinedIcon />
                                  {bus?.rating}
                                </div>
                                <p className="col5-p">
                                  <img
                                    src="redBusImg/user.svg"
                                    className={
                                      bus.rateMember > 0
                                        ? "yes userRatingIcon"
                                        : "no"
                                    }
                                  />
                                  {bus.rateMember}
                                </p>
                              </div>
                              <div className="col6">
                                <p>
                                  Starts from <br /> INR <s>{bus.strick}</s>{" "}
                                  <br /> <span>{bus.fare}</span>
                                </p>
                              </div>
                              <div className="col7">
                                <p className="col7-p">
                                  {" "}
                                  {bus.seatAvail} seats available
                                </p>
                                <p className="col7-p">
                                  {bus.windowSeat ? bus.windowSeat : bus.single}
                                </p>
                              </div>
                            </div>
                            <div className="row-two">
                              <div className="aminitiesIcon">
                                <ul>
                                  {bus.icons?.map((icon, index) => (
                                    <>
                                      <li className="iconList" key={index}>
                                        <img
                                          className={icon?.clean ? "yes" : "no"}
                                          src={icon?.clean}
                                          title="Deep Cleaned Bus"
                                        />
                                        <img
                                          className={icon?.usb ? "yes" : "no"}
                                          src={icon?.usb}
                                          title="USB port for charger"
                                        />
                                        <img
                                          className={
                                            icon?.pillow ? "yes" : "no"
                                          }
                                          src={icon?.pillow}
                                          title="Pillow"
                                        />
                                        <img
                                          className={icon?.cctv ? "yes" : "no"}
                                          src={icon?.cctv}
                                          title="cctv"
                                        />
                                        <img
                                          className={
                                            icon?.blanket ? "yes" : "no"
                                          }
                                          src={icon?.blanket}
                                          title="Blankets"
                                        />
                                        <img
                                          className={
                                            icon?.readLight ? "yes" : "no"
                                          }
                                          src={icon?.readLight}
                                          title="Reading light"
                                        />
                                        <img
                                          className={icon?.sos ? "yes" : "no"}
                                          src={icon?.sos}
                                          title="Emergency contact number"
                                        />
                                        <img
                                          className={icon?.track ? "yes" : "no"}
                                          src={icon?.track}
                                          title="Track My Bus"
                                        />
                                        <img
                                          className={
                                            icon?.charge ? "yes" : "no"
                                          }
                                          src={icon?.charge}
                                          title="Charging Point"
                                        />
                                        <img
                                          className={
                                            icon?.ticket ? "yes" : "no"
                                          }
                                          src={icon?.ticket}
                                          title="M Ticket Supported"
                                        />
                                        <img
                                          className={
                                            icon?.bottle ? "yes" : "no"
                                          }
                                          src={icon?.bottle}
                                          title="Water Bottle"
                                        />
                                        <img
                                          className={icon?.wifi ? "yes" : "no"}
                                          src={icon?.wifi}
                                          title="Wifi"
                                        />
                                        <img
                                          className={
                                            icon?.headset ? "yes" : "no"
                                          }
                                          src={icon?.headset}
                                          title="headset"
                                        />
                                        <img
                                          className={icon?.tv ? "yes" : "no"}
                                          src={icon?.tv}
                                          title="Personal Tv"
                                        />
                                        <img
                                          className={icon?.bed ? "yes" : "no"}
                                          src={icon?.bed}
                                          title="Bed Sheet"
                                        />
                                        <img
                                          className={
                                            icon?.magazine ? "yes" : "no"
                                          }
                                          src={icon?.magazine}
                                          title="magazine Pouch"
                                        />
                                        <img
                                          className={icon?.wet ? "yes" : "no"}
                                          src={icon?.wet}
                                          title="Wet Wipes"
                                        />
                                        <img
                                          className={
                                            icon?.toilet ? "yes" : "no"
                                          }
                                          src={icon?.toilet}
                                          title="Toilet"
                                        />
                                        <img
                                          className={icon?.movie ? "yes" : "no"}
                                          src={icon?.movie}
                                          title="Movie"
                                        />
                                        <img
                                          className={
                                            icon?.restRoom ? "yes" : "no"
                                          }
                                          src={icon?.restRoom}
                                          title="RestRoom"
                                        />
                                        <img
                                          className={
                                            icon?.captianSeat ? "yes" : "no"
                                          }
                                          src={icon?.captianSeat}
                                          title="captianSeat"
                                        />
                                        <img
                                          className={
                                            icon?.disposalSeatCover
                                              ? "yes"
                                              : "no"
                                          }
                                          src={icon?.disposalSeatCover}
                                          title="disposalSeatCover"
                                        />
                                      </li>
                                    </>
                                  ))}
                                </ul>
                              </div>
                              <div className="tickets">
                                <p>
                                  <img
                                    src="../redBusImg/timer.png"
                                    className="ticketIcon"
                                  />
                                  FLexi Ticket
                                </p>
                                <p>
                                  <img
                                    src="../redBusImg/bus-location.png"
                                    className="ticketIcon"
                                  />
                                  Live Tracking
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row-three">


                            <button  onClick={() => toggleAccordion(index)}>VIEW SEATS</button>
                          </div>
                        </div>
                        {openAccordionIndex === index && (
                        <div className="accordianSeat" key={bus.id}>

                          <div className="priceList">
                            <span className="seatsPrice">Seat Price</span>
                            
                          
                            
                              <>
                              
                              <button className="allSeats" onClick={(e) => {handleSeatPrice(e,bus,index)}} value={0} >All</button>
                              <button className="seats" onClick={(e) => {handleSeatPrice(e,bus,index)}}>{bus?.priceList[0]}</button>
                              <button className="seats" onClick={(e) => {handleSeatPrice(e,bus,index)}}>{bus?.priceList[1]}</button>
                              <button className="seats" onClick={(e) => {handleSeatPrice(e,bus,index)}}>{bus?.priceList[2]}</button>
                              <button className="seats"onClick={(e) => {handleSeatPrice(e,bus,index)}}>{bus?.priceList[3]}</button>
                              <button className="seats" onClick={(e) => {handleSeatPrice(e,bus,index)}}>{bus?.priceList[4]}</button>
                              </>
                           
                            


                          </div>

                          <hr />

                          <div className="accordianRow">
                            <div className="accordian-col1">
                              <div className="headLine">
                                Click on an Available seat to proceed with your
                                transaction.
                              </div>
                              <div
                                className={
                                  bus.checkBus === "seater" ? "yes" : "no"
                                }
                              >
                                <div className="seatArrangeChair">
                                  {bus?.seatSeater?.map((seat, i) =>
                                    seat.visible === "none" ? (
                                      <div
                                        key={seat.id}
                                        style={{
                                          visibility: "hidden",
                                          display: "inline-block",
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    ) : (
                                      <div className="SeaterSeats  " key={seat.id}>
                                        <OverlayTrigger
                                          placement="bottom"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip(seat)}
                                        >
                                          <div>
                                            <LuArmchair className={ ` chair ${ bus?.seatSeater[i].isSelect ? " seatDisable" : ""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender === "female" ? "girl" : "boy" : ""}` } onClick={() =>{ handleSeater(seat, bus, index, i) }} disabled={bus?.seatSeater?.map((seat)=>seat.Fare === enable ? true : false)}/>
                                          </div>
                                        </OverlayTrigger>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className={bus.checkBus === "sleeperSeater" ? "yes LowerSeats" : "no"}>
                                <h4>Lower Deck</h4>
                                <div className="seatArrangeBox">
                                  {bus?.arrangement?.map((seat, i) => seat.visible === "none" ? (
                                    <div
                                      key={seat.id}
                                      style={{
                                        visibility: "hidden",
                                        display: "inline-block",
                                        height: "20px",
                                        width: "20px",
                                      }}
                                    />
                                  ) :
                                    seat.BusSeatType === "seat" ? (<div className="SeaterSeats " key={seat.id}>

                                      <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(seat)}
                                      >
                                        <div>
                                          <LuArmchair  className={`chair ${seat.isSelect ? "seatDisable" : ""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender == "female" ? "girl" : "boy" : ""} `}  onClick={() => {handleSleeperSeater(seat, bus, index, i)}} />
                                        </div>
                                      </OverlayTrigger>
                                    </div>) : (<div className="lowerDeckSemiSleep" key={seat.id} >
                                      <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(seat)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          version="1.1"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 100 80"
                                          // fill="none"
                                          style={{
                                            enableBackground: "new 0 0 100 100",
                                          }}
                                          onClick={() => {handleSleeperSeater(seat, bus, index, i)}}
                                          className={ `seatModalSleep ${bus?.arrangement[i].isSelect ?" seatDisable" :""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender == "female" ? "girl" : "boy" : ""}`}
                                        >
                                          <g>
                                            <path d="M83.8,28.8h-3.1c-3.5,0-6.3,2.8-6.3,6.3v29.7c0,3.5,2.8,6.3,6.3,6.3h3.1c3.5,0,6.3-2.8,6.3-6.3V35.1   C90.1,31.7,87.3,28.8,83.8,28.8z M88.2,64.9c0,2.4-2,4.4-4.4,4.4h-3.1c-2.4,0-4.4-2-4.4-4.4V35.1c0-2.4,2-4.4,4.4-4.4h3.1   c2.4,0,4.4,2,4.4,4.4V64.9z" />
                                            <path d="M90,23.1H10c-2.8,0-5,2.2-5,5v43.8c0,2.8,2.2,5,5,5h80c2.8,0,5-2.2,5-5V28.1C95,25.4,92.8,23.1,90,23.1z M93.1,71.9   c0,1.7-1.4,3.1-3.1,3.1H10c-1.7,0-3.1-1.4-3.1-3.1V28.1c0-1.7,1.4-3.1,3.1-3.1h80c1.7,0,3.1,1.4,3.1,3.1V71.9z" />
                                          </g>
                                        </svg>
                                      </OverlayTrigger>
                                    </div>)
                                  )}
                                </div>
                              </div>
                              <div
                                className={
                                  bus.checkBus === "sleeper"
                                    ? "yes LowerSeats"
                                    : "no"
                                }

                              >
                                <h4>Lower Deck</h4>
                                <div className="seatArrangeBox">
                                  {bus.seatSleepLower?.map((seat, i) =>
                                    seat.visible === "none" ? (
                                      <div
                                        key={seat.id}
                                        style={{
                                          visibility: "hidden",
                                          height: "10px",
                                        }}
                                      />
                                    ) : (
                                      <div className="lowerDeck" key={seat.id}>

                                        <OverlayTrigger
                                          placement="bottom"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip(seat)}
                                        >


                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 100 80"
                                            className={ ` seatModal ${bus?.seatSleepLower[i].isSelect ? " seatDisable" : ""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender == "female" ? "girl" : "boy" : ""}` } 
                                            onClick={() => {handleSeatClick(seat, bus, index, i)}}
                                            
                                          >
                                            <g >
                                              <path d="M83.8,28.8h-3.1c-3.5,0-6.3,2.8-6.3,6.3v29.7c0,3.5,2.8,6.3,6.3,6.3h3.1c3.5,0,6.3-2.8,6.3-6.3V35.1   C90.1,31.7,87.3,28.8,83.8,28.8z M88.2,64.9c0,2.4-2,4.4-4.4,4.4h-3.1c-2.4,0-4.4-2-4.4-4.4V35.1c0-2.4,2-4.4,4.4-4.4h3.1   c2.4,0,4.4,2,4.4,4.4V64.9z" />
                                              <path d="M90,23.1H10c-2.8,0-5,2.2-5,5v43.8c0,2.8,2.2,5,5,5h80c2.8,0,5-2.2,5-5V28.1C95,25.4,92.8,23.1,90,23.1z M93.1,71.9   c0,1.7-1.4,3.1-3.1,3.1H10c-1.7,0-3.1-1.4-3.1-3.1V28.1c0-1.7,1.4-3.1,3.1-3.1h80c1.7,0,3.1,1.4,3.1,3.1V71.9z" />
                                            </g>
                                          </svg>
                                        </OverlayTrigger>

                                      </div>
                                    )
                                  )}

                                </div>
                              </div>

                              <div
                                className={
                                  bus.checkBus === "sleeper"
                                    ? "yes upperSeats"
                                    : "no"
                                }
                              >
                                <h4>Upper Deck</h4>
                                <div className="seatArrangeBox">
                                  {bus.seatSleepUpper?.map((seat, i) =>
                                    seat.visible === "none" ? (
                                      <div
                                        key={seat.id}
                                        style={{
                                          visibility: "hidden",
                                          height: "10px",
                                        }}
                                      />
                                    ) : (
                                      <div className="upperDeck" key={seat.id}>
                                        <OverlayTrigger
                                          placement="bottom"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip(seat)}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 100 80"
                                           
                                            style={{
                                              enableBackground:
                                                "new 0 0 100 100",
                                            }}
                                            onClick={() => {handleSeatClick(seat, bus, index, i)}}
                                            className={` seatModal ${bus?.seatSleepUpper[i].isSelect ? " seatDisable" : ""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender == "female" ? "girl" : "boy" : ""}`} 
                                          >
                                            <g>
                                              <path d="M83.8,28.8h-3.1c-3.5,0-6.3,2.8-6.3,6.3v29.7c0,3.5,2.8,6.3,6.3,6.3h3.1c3.5,0,6.3-2.8,6.3-6.3V35.1   C90.1,31.7,87.3,28.8,83.8,28.8z M88.2,64.9c0,2.4-2,4.4-4.4,4.4h-3.1c-2.4,0-4.4-2-4.4-4.4V35.1c0-2.4,2-4.4,4.4-4.4h3.1   c2.4,0,4.4,2,4.4,4.4V64.9z" />
                                              <path d="M90,23.1H10c-2.8,0-5,2.2-5,5v43.8c0,2.8,2.2,5,5,5h80c2.8,0,5-2.2,5-5V28.1C95,25.4,92.8,23.1,90,23.1z M93.1,71.9   c0,1.7-1.4,3.1-3.1,3.1H10c-1.7,0-3.1-1.4-3.1-3.1V28.1c0-1.7,1.4-3.1,3.1-3.1h80c1.7,0,3.1,1.4,3.1,3.1V71.9z" />
                                            </g>
                                          </svg>
                                        </OverlayTrigger>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div
                                className={
                                  bus.checkBus === "sleeperSeater"
                                    ? "yes upperSeats"
                                    : "no"
                                }
                              >
                                <h4>Upper Deck</h4>
                                <div className="seatArrangeBox">
                                  {bus.seatSleepUpper?.map((seat, i) =>
                                    seat.visible === "none" ? (
                                      <div
                                        key={seat.id}
                                        style={{
                                          visibility: "hidden",
                                          height: "10px",
                                        }}
                                      />
                                    ) : (
                                      <div className="lowerDeckSemiSleep" key={seat.id}>
                                        <OverlayTrigger
                                          placement="bottom"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip(seat)}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 100 80"
                                            // fill="none"
                                            style={{
                                              enableBackground:
                                                "new 0 0 100 100",
                                            }}
                                            onClick={() => {handleSleeperSeater(seat, bus, index, i)}}
                                            className={ ` seatModalSleep ${bus?.seatSleepUpper[i].isSelect ? " seatDisable" : ""} ${!seat.isEnabled ? 'disabledIcon' : '' } ${seat.isBooked ? seat.gender == "female" ? "girl" : "boy" : ""}`} 
                                          >
                                            <g>
                                              <path d="M83.8,28.8h-3.1c-3.5,0-6.3,2.8-6.3,6.3v29.7c0,3.5,2.8,6.3,6.3,6.3h3.1c3.5,0,6.3-2.8,6.3-6.3V35.1   C90.1,31.7,87.3,28.8,83.8,28.8z M88.2,64.9c0,2.4-2,4.4-4.4,4.4h-3.1c-2.4,0-4.4-2-4.4-4.4V35.1c0-2.4,2-4.4,4.4-4.4h3.1   c2.4,0,4.4,2,4.4,4.4V64.9z" />
                                              <path d="M90,23.1H10c-2.8,0-5,2.2-5,5v43.8c0,2.8,2.2,5,5,5h80c2.8,0,5-2.2,5-5V28.1C95,25.4,92.8,23.1,90,23.1z M93.1,71.9   c0,1.7-1.4,3.1-3.1,3.1H10c-1.7,0-3.1-1.4-3.1-3.1V28.1c0-1.7,1.4-3.1,3.1-3.1h80c1.7,0,3.1,1.4,3.1,3.1V71.9z" />
                                            </g>
                                          </svg>
                                        </OverlayTrigger>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                            </div>
                            <div className="accordian-col2">
                              <div>
                                
                              </div>
                              <form >
                                <div className="paymentDetails">
                                  <div className="points">
                                    <h3>BOARDING POINT</h3>
                                    <p className="dpoint"><b>{bus.departure}</b> {bus.sPlace}</p>
                                  </div>
                                  <div className="points">
                                    <h3>DROPPING POINT</h3>
                                    <p className="apoint"><b>{bus.arrival}</b> {bus.ePlace}</p>
                                  </div>
                                 
                                        <div className="points" >
                                    <hr />
                                    <div className="points amountBox">
                                      <h4>Seat No.</h4>
                                      <b>{selectedSeats && selectedSeats.join()}</b>
                                    </div>
                                  </div>
                                  
                                       <div className="amount" >
                                       <hr />
                                       
                                       <div className="points amountBox">
                                         <p>Amount<span>( Taxes will be calculated during payment )</span></p>
                                         <strong>INR{ totalFare ? totalFare : 0 }.00</strong>
                                       </div>
                                      
                                     </div>
                                 
                                 
                                   
                                  
                                  <div className="bookBtn">
                                    <button type="submit" onClick={(e) => {
    if (selectedSeats.length > 0) {
      handleOpenModal(e, index, bus);
    } else {
      e.preventDefault();
      alert("Please select a seat");
    }
  }} >PROCEED TO BOOK</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal bus={bus} seatIndex={seatIndex} busIndex={busIndex} selectedSeats={selectedSeats} totalFare={totalFare} show={showModal} onClose={handleCloseModal} />

    </>
  );
};

export default BookingPg;
