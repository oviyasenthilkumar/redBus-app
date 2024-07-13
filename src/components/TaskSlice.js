import { createSlice, current } from "@reduxjs/toolkit";
import requiredDetails from "./BusBook";

const initialState = {
  BusList: [],
  SortBusList: [],
  selectedSeats: [],
  seatsPrice: [],
  seatArray:[],
  soldTickets:[],
  busArray: requiredDetails.bus
};

const TaskSlice = createSlice({
  name: "redBus",
  initialState,
  reducers: {

    ListOfBuses: (state, action) => {
      const { from, to } = action.payload;
    
      state.BusList = state.busArray.filter(
        (bus) => bus.from === from && bus.to === to
      );
      state.SortBusList = state.busArray.filter(
        (bus) => bus.from === from && bus.to === to
      );
     
    },
    DepartureTiming: (state, action) => {
      const { min, max } = action.payload;
      state.BusList = state.SortBusList.filter(
        (time) => time.stime >= min && time.stime <= max
      );
    },
    ArrivalTiming: (state, action) => {
      const { min, max } = action.payload;
      state.BusList = state.SortBusList.filter(
        (time) => time.etime >= min && time.etime <= max
      );
      },
   
    IconFilter: (state, action) => {
      const { icon } = action.payload;
      console.log(icon);
      // Check if BusList is defined and is an array
      if (Array.isArray(state.BusList)) {
      //   // Filter the BusList based on whether the iconsArray includes the specified icon
      if(icon.length === 1){
        state.BusList = state.BusList.filter(
          (item) =>            
          Array.isArray(item.iconsArray) && icon.some(icon => item.iconsArray.includes(icon))
        );
      }else{
        state.BusList = state.SortBusList.filter(
          (item) =>
          Array.isArray(item.iconsArray) && icon.some(icon => item.iconsArray.includes(icon))
        );
      }
      } else {
        console.error("BusList is not an array");
      }
    },
    SingleSeat:(state,action)=>{
      const {seat,isSingleSeat} = action.payload;
     if(!isSingleSeat){
      state.BusList = state.BusList.filter((bus)=>bus?.single)
     }else{
      state.BusList = state.SortBusList
     }
    },
    BusType:(state,action)=>{
      const {isSeatType,types} = action.payload;
      console.log(isSeatType,types);
      if(!isSeatType){
        state.BusList = state.BusList.filter((seat)=>seat?.busTypeArray.includes(types))
      }else{
        state.BusList = state.SortBusList
      }
    },
    DepartureSort:(state,action)=>{
      const isAsc = action.payload;
     if(!isAsc){
      state.BusList = state.BusList.sort((a,b)=>a.stime - b.stime)
     }else{
      state.BusList = state.BusList.sort((a,b)=>b.stime - a.stime)
     }
        
    },
    ArrivalSort:(state,action)=>{
      const isArr = action.payload;
     if(!isArr){
      state.BusList = state.BusList.sort((a,b)=>a.etime - b.etime)
     }else{
      state.BusList = state.BusList.sort((a,b)=>b.etime - a.etime)
     }
        
    },
    DurationSort:(state,action)=>{
        const isDuration = action.payload;
      if(!isDuration){
        state.BusList = state.BusList.sort((a,b)=>a.durations - b.durations)
       }else{
        state.BusList = state.BusList.sort((a,b)=>b.durations - a.durations)
       }
    },
    RatingSort:(state,action)=>{
     const isHigh = action.payload;
     if(!isHigh){
      state.BusList = state.BusList.sort((a,b)=>b.rating - a.rating)
     }else{
      state.BusList = state.BusList.sort((a,b)=>a.rating - b.rating)
     }
    },
    FareSort:(state,action)=>{
     const isLess = action.payload;
     if(!isLess){
      state.BusList = state.BusList.sort((a,b)=>a.fare - b.fare)
     }else{
      state.BusList = state.BusList.sort((a,b)=>b.fare - a.fare)
     }
    },
    AvailableSeatSort:(state,action)=>{
      const isAvail = action.payload;
      if(!isAvail){
        state.BusList = state.BusList.sort((a,b)=>b.seatAvail - a.seatAvail)
      }else{
        state.BusList = state.BusList.sort((a,b)=>a.seatAvail - b.seatAvail)
      }
    },
    SelectedSeat:(state,action)=>{
       const {index,i} = action.payload;
        if(state.BusList[index].id === action.payload.bus.id){
        if(state.BusList[index]?.seatSleepLower[i].id === action.payload.seat.id){
          state.BusList[index].seatSleepLower[i] = {...state.BusList[index]?.seatSleepLower[i],isSelect:!action.payload.seat.isSelect} 
          state.selectedSeats = state.selectedSeats.includes(action.payload.seat.seatNo) ? state.selectedSeats.filter(seat => seat !== action.payload.seat.seatNo) : [...state.selectedSeats, action.payload.seat.seatNo];
          if (!state.seatsPrice) {
            state.seatsPrice = [];
          }
          let seatFare = action.payload.seat.Fare;
          let seatId = action.payload.seat.id;
         let seatindex = state.seatsPrice.findIndex(seat => seat.id === seatId)
         if (seatindex >= 0) {
          // If seat fare exists in the array, remove it
          state.seatsPrice.splice(seatindex, 1);
        } else {
          // If seat fare does not exist, add it
          state.seatsPrice.push({ id: seatId, Fare: seatFare , index:index,i:i});
        }

        }else if(state.BusList[index]?.seatSleepUpper[i].id === action.payload.seat.id){
          state.BusList[index].seatSleepUpper[i] = {...state.BusList[index]?.seatSleepUpper[i],isSelect:!action.payload.seat.isSelect} 
          state.selectedSeats = state.selectedSeats.includes(action.payload.seat.seatNo) ? state.selectedSeats.filter(seat => seat !== action.payload.seat.seatNo) : [...state.selectedSeats, action.payload.seat.seatNo];
          if (!state.seatsPrice) {
            state.seatsPrice = [];
          }
          let seatFare = action.payload.seat.Fare;
          let seatId = action.payload.seat.id;
         let seatindex = state.seatsPrice.findIndex(seat => seat.id === seatId)
         if (seatindex >= 0) {
          // If seat fare exists in the array, remove it
          state.seatsPrice.splice(seatindex, 1);
        } else {
          // If seat fare does not exist, add it
          state.seatsPrice.push({ id: seatId, Fare: seatFare, index:index,i:i });
        }
        }else{
          console.log("try again");
        }
      }
      else{
        console.error("wrong")
      }
   },
     SelectSeaterSleeper:(state,action)=>{
      const {index,i} = action.payload;
      if(state.BusList[index].id === action.payload.bus.id){
        if(state.BusList[index]?.arrangement[i].id === action.payload.seat.id){
          state.BusList[index].arrangement[i] = {...state.BusList[index]?.arrangement[i],isSelect:!action.payload.seat.isSelect} 
          state.selectedSeats = state.selectedSeats.includes(action.payload.seat.seatNo) ? state.selectedSeats.filter(seat => seat !== action.payload.seat.seatNo) : [...state.selectedSeats, action.payload.seat.seatNo];
          if (!state.seatsPrice) {
            state.seatsPrice = [];
          }
          let seatFare = action.payload.seat.Fare;
          let seatId = action.payload.seat.id;
         let seatindex = state.seatsPrice.findIndex(seat => seat.id === seatId)
         if (seatindex >= 0) {
          // If seat fare exists in the array, remove it
          state.seatsPrice.splice(seatindex, 1);
        } else {
          // If seat fare does not exist, add it
          state.seatsPrice.push({ id: seatId, Fare: seatFare, index:index,i:i });
        }
        }else if(state.BusList[index]?.seatSleepUpper[i].id === action.payload.seat.id){
          state.BusList[index].seatSleepUpper[i] = {...state.BusList[index]?.seatSleepUpper[i],isSelect:!action.payload.seat.isSelect} 
          state.selectedSeats = state.selectedSeats.includes(action.payload.seat.seatNo) ? state.selectedSeats.filter(seat => seat !== action.payload.seat.seatNo) : [...state.selectedSeats, action.payload.seat.seatNo];
          if (!state.seatsPrice) {
            state.seatsPrice = [];
          }
          let seatFare = action.payload.seat.Fare;
          let seatId = action.payload.seat.id;
         let seatindex = state.seatsPrice.findIndex(seat => seat.id === seatId)
         if (seatindex >= 0) {
          // If seat fare exists in the array, remove it
          state.seatsPrice.splice(seatindex, 1);
        } else {
          // If seat fare does not exist, add it
          state.seatsPrice.push({ id: seatId, Fare: seatFare , index:index,i:i});
        }
        }else{
          console.log("try again");
        }
      }
      else{
        console.error("wrong")
      }
     },
     SelectSeater:(state,action)=>{
      const {busIndex,seatIndex} = action.payload;
      if(state.BusList[busIndex].id === action.payload.bus.id){
        if(state.BusList[busIndex]?.seatSeater[seatIndex].id === action.payload.seat.id){
          state.BusList[busIndex].seatSeater[seatIndex] = {...state.BusList[busIndex]?.seatSeater[seatIndex],isSelect:!action.payload.seat.isSelect} 
          state.selectedSeats = state.selectedSeats.includes(action.payload.seat.seatNo) ? state.selectedSeats.filter(seat => seat !== action.payload.seat.seatNo) : [...state.selectedSeats, action.payload.seat.seatNo];
          if (!state.seatsPrice) {
            state.seatsPrice = [];
          }
          let seatFare = action.payload.seat.Fare;
          let seatId = action.payload.seat.id;
         let seatindex = state.seatsPrice.findIndex(seat => seat.id === seatId)
         if (seatindex >= 0) {
          // If seat fare exists in the array, remove it
          state.seatsPrice.splice(seatindex, 1);
        } else {
          // If seat fare does not exist, add it
          state.seatsPrice.push({ id: seatId, Fare: seatFare, index:busIndex,i:seatIndex });
         
        }
        }else{
          console.log("try again");
        }
      }
      else{
        console.error("wrong")
      }
     },
     seatPriceChange:(state,action)=>{
        const {bus,index,isEnable} = action.payload;
        if (state.BusList[index].id === bus.id) {
          const seatTypes = ['arrangement', 'seatSleepLower', 'seatSleepUpper', 'seatSeater'];
  
          seatTypes.forEach(type => {
            if (state.BusList[index][type]) {
              state.BusList[index][type] = state.BusList[index][type].map(seat => ({
                ...seat,
                isEnabled: seat.Fare == isEnable || isEnable === 0,
              }));
            }
          });
        } else {
          console.log("error");
        }
      },
     seatPayment:(state,action)=>{
         let { gender,genderArray, seatIndex, busIndex ,seatNo,bus} = action.payload;
         const seatTypes = ['arrangement', 'seatSleepLower', 'seatSleepUpper', 'seatSeater'];
         const selectedSeats = state.selectedSeats;
            for (let i = 0; i < selectedSeats.length; i++) {
              const seatNo = selectedSeats[i];
        
            for (let j = 0; j < seatTypes.length; j++) {
              const seatType = seatTypes[j];
               const seats = state.BusList[busIndex][seatType];
              if (seats) {
                const seatIndex = seats.findIndex(seat => seat.seatNo === seatNo);
                
                if (seatIndex !== -1 && seats[seatIndex].seatNo === seatNo) {
                  console.log(genderArray[i]);
                  state.BusList[busIndex][seatType][seatIndex] = {
                    ...state.BusList[busIndex][seatType][seatIndex],
                    isBooked: true,
                    gender:genderArray[i]
                  };
                  const bookedSeat = state.BusList[busIndex][seatType][seatIndex];
                  state.soldTickets.push(bookedSeat);
                  console.log(bookedSeat);
                } else {
                  console.log("Bus ID or seat number does not match");
                }
              }
            }
          }
          state.selectedSeats = []
          state.seatsPrice = []
      } 
     }
  },);

export const {SelectSeater,seatPayment,seatPriceChange, ListOfBuses, DepartureTiming, ArrivalTiming, IconFilter, SingleSeat, BusType, DepartureSort, ArrivalSort, DurationSort, RatingSort, FareSort, AvailableSeatSort, SelectedSeat, SelectSeaterSleeper} =
  TaskSlice.actions;
export default TaskSlice.reducer;
