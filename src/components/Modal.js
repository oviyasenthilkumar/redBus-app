// Modal.js
import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { seatPayment } from './TaskSlice';

const Modal = ({ bus,show, onClose, totalFare ,seatIndex, busIndex}) => {
  const dispatch = useDispatch();
  const {selectedSeats} = useSelector((state) => state.redBus);
  if (!show) return null;
 
const handleBooking = (e,seatIndex, busIndex,bus)=>{
  e.preventDefault()
  let genderArray = []
  let gender;
  let seatNo;
  selectedSeats.forEach((seat,Index) => {
    gender = e.target[`gender${Index}`].value;
    seatNo = e.target[`seat${Index}`].value;
    genderArray.push(gender)
   }); 
  dispatch(seatPayment({ seatIndex, busIndex,genderArray, gender, seatNo,bus }));
}
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Passenger Details</h3>
            <CloseIcon onClick={onClose} className="close-icon" />
          </div>
          <form onSubmit={(e)=>{handleBooking(e,seatIndex, busIndex,bus); onClose(e)}}>
            <div className="passengerForm">
              {selectedSeats && selectedSeats.map((seat,i)=>{
                return(
                  <>
                  <div className="passengerInput">
                <label>Name</label><br />
                <input type="text" placeholder="Name" name='name' required/><br />
                <b>Seat :</b><input value={seat} name={`seat${i}`} readOnly/> 
              </div> 
              <div className="passengerInput2">
                <label className='radio-label'>Gender</label><br />
                <div className="passengerFlex">
                  <input type="radio" name={`gender${i}`}  value="male"/>Male
                  <input type="radio" name={`gender${i}`}  value="female"/>Female<br />
                </div>
              </div>
                </>
                )
                
              })}
              
              <div className="passengerInput2 ageInput">
                <label>Age</label><br />
                <input type="number" placeholder="Age" name='age'/>
              </div>
              <div className="passengerInput">
                <label>State of Residence</label><br />
                <input type="text" required/>
              </div>
              <div className="ContactImg">
                <img src="../redBusImg/mail.svg" className="mailImg" alt="Mail" />
                <h5>Contact Details</h5>
                <hr />
              </div>
              <div className="ticketDetails">
                Your ticket will be sent to these details
              </div>
              <div className="passengerInput">
                <label>Email ID</label><br />
                <input type="email" placeholder="Email ID" required/>
              </div>
              <div className="passengerInput">
                <label>Phone</label><br />
                <input type="tel" placeholder="Phone" required/>
              </div>
              <div className="paymentProcess">
                <hr />
                <p>By clicking on proceed, I agree that I have read and understood the <a href="/">TnCs</a> and the <a href="/">Privacy Policy</a></p>
                <div className="passengerFlex" style={{ margin: '10px 0' }}>
                  <h3 className="TotalAmt">Total Amount: INR {totalFare} .00</h3>
                  <button type="submit" className="PayBtn">PROCEED TO PAY</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
