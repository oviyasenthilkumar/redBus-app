import React, { useState } from "react";

// component
import data from '../components/Buses.json'

// material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Carousel from 'react-multi-carousel';
import Container from '@mui/material/Container';
import 'react-multi-carousel/lib/styles.css';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NorthIcon from '@mui/icons-material/North';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// redux
import { useDispatch } from "react-redux";


// reducer
import { ListOfBuses } from "./TaskSlice";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
  const navigate = useNavigate()
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [content,setContent] = useState(true)
  const readMore= ()=>{
    setContent(false)
  }
  const readLess=()=>{
    setContent(true)
  }
// material UI Accordian function
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
   
  };
 

// navigate bus place and date
  const [from,setFrom] = useState("")
  const [to,setTo] = useState("")
  const [date,setDate] = useState(new Date())


  
  



  const dispatch = useDispatch()
  const handleSubmit = (event) => {
   
    event.preventDefault();
    if((from != "")&&(to != " ")){
      console.log(from , to);
      dispatch(ListOfBuses({from,to}));
      navigate('/buses',{state:{from,to,dayString,dates, monthString, year}})
    }else{
      alert("please choose places !")
    }
  };
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const getDateComponents = (date) => {
    const dates = date.getDate();
    const day = date.getDay();
    // console.log(day);
    const month = date.getMonth() + 1 ;// Months are zero-indexed, so we add 1
    const year = date.getFullYear();
    const monthNames = [
     "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysName = ["Mon","Tue","Wed","Thur","Fri","Sat","sun"];
    const dayString = daysName[day]
    const monthString = monthNames[month];
    return { dayString,dates,day, monthString, year };
  };

  const { dayString,dates,day, monthString, year } = getDateComponents(date);
  
  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };
  
  const today = new Date();
  const minDate = today;
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);
  // places to select
  const placesTo = ['Chennai', 'Bangalore', 'Madurai'];
  const placesFrom = ['Trichy','Coimbatore','Salem'];
  return (
    <>
    <div className="dummy"></div>
      <div className="banner">
        <h2 className="heading">India's No. 1 Online Bus Ticket Booking Site</h2>
      </div>
      <Container maxWidth="lg" className="content">
        <div className="ban-2">
          <img src="../redBusImg/bg1.png" className="ban1Img" />
          <img src="../redBusImg/bg2.png" className="ban2Img" />
        </div>
        <div className="inputBoxes">
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
     
      <div className="inputBoxes">
      <div className="from">
        <div className="busImg"><img src="../redBusImg/bus.svg"/></div>
          
          <FormControl variant="filled" className="input">
        <InputLabel id="from-place-label">From</InputLabel>
        <Select
          labelId="from-place-label"
          id="from-place filled-basic"
          value={from}
          name="fromPlace"
          onChange={(e) => setFrom(e.target.value)}
        >
          {placesFrom.map((place, index) => (
            <MenuItem key={index} value={place}>
              {place}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
       </div>
       <div className="to">
       <div className="busImg"><img src="../redBusImg/busin.svg"/></div>
         
          <FormControl variant="filled" className="input">
          <InputLabel id="to-place-label">To</InputLabel>
          <Select
            labelId="to-place-label"
            id="to-place"
            value={to}
            name="toPlace"
            onChange={(e) => setTo(e.target.value)}
          >
            {placesTo.map((place, index) => (
              <MenuItem key={index} value={place}>
                {place}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
       </div>

       <div className="date">
        <label><CalendarMonthIcon className="calendar"  onClick={handleIconClick}/></label>
        
        <div className="dateTable">
      
      {isDatePickerOpen && (
        <DatePicker
          selected={date}
          onChange={(date) => {
            setDate(date);
            setIsDatePickerOpen(false);
          }
          } 
           inline
           minDate={minDate}
           maxDate={maxDate}
        />
      )}
       </div>
       <div className="dateDisplay">
        <p className="dateDisplayP">Date</p>
        <p> {dates} {monthString}</p>
        <p className="dateDisplayP">{year}</p>
      </div>
       </div>
       
      
      <div className="searchBtn">
        <Button onClick={handleSubmit}>SEARCH BUSES</Button>
      </div>
      </div> 
    </Box>

        </div>
     
        <div className="govtBus">
                <h1>GOVERNMENT BUSES</h1>
                <span>View All</span>
            </div>
           
            <Carousel responsive={responsive}>    
        {
          data && data.map((cards,i)=>{
            let words = cards.malayalam.length>30 ? (cards.malayalam.substring(0,29)+ "...") : cards.malayalam;
            return(
            <div  key={i} className="buses">
               <div className="busCards">
               <div className="cardHeader">
                  <div className="cardLogo">
                    <img src={cards.img} alt=""/>
                  </div>
                  <div>
                  <div className="cardHeading">{cards.name}  <span><StarBorderOutlinedIcon/>{cards.rate}</span></div>
                  <div>
                  {words }</div>
                  </div>
                  
                </div>
                <hr/>
                <div className="cardDescription">
                  <div className="card-des">
                  {cards.des}
                  </div>
                  <div className="cardDescription_foot">
                    <img src="../redBusImg/rb_bus.svg"/>
                    <p>{cards.foot}</p>
                  </div>
                </div>
               
               </div>
               {/* <div className="cardFooter">
                      <div> {cards.foot2} </div>
                </div> */}
              </div>
             
            )
          })
        }
      
      </Carousel>
      
      <div>
 
        <Row className="about">    
          <Col>
          <div>
                <h2>NOW,<b>GET MORE THAN JUST BUS</b> TICKETS WITH REDBUS!</h2>
                <div className="trainSymbol">
                  <div className="trainSymbolCnt">
                  <img src="../redBusImg/rail.svg"/>
                  <h4>Train Tickets</h4>
                  </div>
                </div>
              </div>
              <div className="abt-cnt">
                <p>Book IRCTC Train Tickets on redRail simple & superfast booking process with no service fee + no payment gateway charge.</p>
              </div>
              <div>
                <div className="abt-li">
                  <img src="../redBusImg/railAuthorized.svg"/>
                  <h3>Authorised IRCTC Partner</h3>
                </div>
                <div className="abt-li">
                  <img src="../redBusImg/railHasslefree.svg"/>
                  <h3>Instant refunds on UPI payments</h3>
                </div>
                <div className="abt-li">
                  <img src="..\redBusImg\railrefunds.svg"/>
                  <h3>Hassle- free customer support</h3>
                </div>
                
              </div>
              <div >
                <button className="Btns">Book Train Tickets <ArrowForwardIcon/> </button>
              </div>
          </Col>
          <Col>
          <div className="trainbg">
            <img src="../redBusImg/railPop.svg"/>
            </div>
            </Col>
          
        </Row>

      </div>
      <div className="enjoyApp">
          <div className="enjoy-header">
            <h2>ENJOY THE APP!</h2>
          </div>
          <div className="boxes">
          <div className="enjoy-box">
            <div className="enjoy-box-para">
              <img src="../redBusImg/tick.svg"/>
              <p>Quick access</p>
              </div>
              <div className="enjoy-box-para">
              <img src="../redBusImg/tick.svg"/>
              <p>Superior live tracking</p>
            </div>
            <div className="enjoy-box-div">
              <div className="box1">
                <h3>4.6 <StarRateRoundedIcon/> </h3>
                <p>50M + downloads</p>
                <h5>Play Store</h5>
              </div>
              <div className="box2">
                <h3>4.6 <StarRateRoundedIcon/> </h3>
                <p>50M + downloads</p>
                <h5>App Store</h5>
              </div>
            </div>
          </div>
         
            <div className="qr-app">
                <div>
                  <h4>Scan to <br/> download</h4>
                 <div className="qrImg">
                 <img src="../redBusImg/qrCode.svg"/>
                 </div>
                </div>
                <div className="apps">
                  <h4>Download the<br/> App on</h4>
                  <div>
                    <img src="../redBusImg/playStore.svg"/>
                  </div>
                  <div>
                  <img src="../redBusImg/appStore.svg"/>
                  </div>
                </div>
            </div>
          </div>
      </div>

      <div className="primo">
        <div className="primoCnt">
            <div className="primo-icon">
              <AlarmOnIcon className="primoIcons"/>
              <div className="primo-cnt">
                <h3>On Time</h3>
                <p>Punctual arrivals on 95% trips </p>
              </div>
            </div>
            <div className="primo-icon">
            <StarBorderOutlinedIcon  className="primoIcons"/>
            <div className="primo-cnt">
              <h3>Friendly Staff</h3>
              <p>Always ready to help</p>
            </div>
            </div>
            <div className="primo-icon">
              <StarBorderOutlinedIcon  className="primoIcons"/>
              <div className="primo-cnt">
                <h3>Top Rated</h3>
                <p>Buses with 4+ star rating</p>
              </div>
            </div>
        </div>
      </div>
      <div className="global">
          <h1>GLOBAL PRESENCE</h1>
          <div className="country">
            <div>
              <img src="../redBusImg/colombia.svg"/>
              <h4>Colombia</h4>
            </div>
            <div>
              <img src="../redBusImg/India.svg"/>
              <h4>India</h4>
            </div>
            <div>
              <img src="../redBusImg/Indonesia.svg"/>
              <h4>Indonesia</h4>
            </div>
            <div>
              <img src="../redBusImg/Malaysia.svg"/>
              <h4>Malaysia</h4>
            </div>
            <div>
              <img src="../redBusImg/Peru.svg"/>
              <h4>Peru</h4>
            </div>
            <div>
              <img src="../redBusImg/Singapore.svg"/>
              <h4>Singapore</h4>
            </div>
          </div>
      </div>

      <div className="bookBus">
        <h1>BOOK BUS TICKETS ONLINE</h1>

        {
          content ? (<p className="bookBusCnt">redBus is India's largest brand for online bus ticket booking and offers an easy-to-use online bus ticket booking service and train; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travellers. A leading platform for booking bus tickets, redBus has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.<br/>
<br/>

         Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. You can then compare bus prices, user ratings & amenities, select your preferred seat, boarding & dropping points and pay using multiple payment options like UPI, debit or credit card, net banking and more. With redBus, get assured safe & secure payment methods and guaranteed travel with the best seat and bus operator of your choice.... <button className="clickBtn" onClick={readMore}>Read More</button> </p>) : 

          (<p className="bookBusCnt">redBus is India's largest brand for online bus ticket booking and offers an easy-to-use online bus ticket booking service and train; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, redBus makes road journeys super convenient for travellers. A leading platform for booking bus tickets, redBus has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.<br/>
          <br/>
          Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. You can then compare bus prices, user ratings & amenities, select your preferred seat, boarding & dropping points and pay using multiple payment options like UPI, debit or credit card, net banking and more. With redBus, get assured safe & secure payment methods and guaranteed travel with the best seat and bus operator of your choice  <br/>
          <br/>
          Once the bus booking payment is confirmed, all you have to do is pack your bags and get ready to travel with the m-ticket, which you can show to the bus operator on your mobile before boarding the bus. Online bus ticket booking with redBus is that simple!<br/>
          <br/>
          redBus also offers other exclusive benefits on online bus tickets like flexible ticket rescheduling options, easy & friendly cancellation policies, and instant payment refunds. With a live bus tracking feature, you can plan travel and never miss the bus. You can get the cheapest bus tickets by availing the best discounts for new & existing customers. With redDeals, you can also get exclusive & additional discounts on your online bus ticket booking. You will get 24/7 customer support on call, chat & help to resolve all your queries in English & local languages.<br/>
          <br/>
         redBus offers Primo bus services, specially curated by redBus with highly rated buses and best-in-class service. With Primo by redBus, you can be assured of safe, comfortable, and on-time bus service at no additional cost. With multiple boarding and dropping points available across all major cities in India, you can select at your convenience and enjoy a smooth travel experience.<br/>
         <br/>


        redBus operates in six countries, including India, Malaysia, Singapore, Indonesia, Peru, and Colombia. Through its website and app, it has sold over 220 million bus tickets worldwide. With over 36 million satisfied customers, redBus is committed to providing its users with a world-class online bus booking experience.<br/>
        <br/>

         redBus offers bus tickets from some of the top private bus operators, such as Orange Travels, VRL Travels, SRS Travels, Chartered Bus, and Praveen Travels, and state government bus operators, such as APSRTC, TSRTC, GSRTC, Kerala RTC, TNSTC, RSRTC, UPSRTC, and more. With redBus, customers can easily book bus tickets for different bus types, such as AC/non-AC, Sleeper, Seater, Volvo, Multi-axle, AC Sleeper, Electric buses, and more.<button className="clickBtn" onClick={readLess}>Read less</button> </p>)
        }
        </div>
        <div className="deals">
            <h1>Bus Booking redDeals on redBus</h1>
            <p className="deal-para">Don't miss out on these incredible offers, book your bus tickets now and travel with convenience and affordability. Hurry, grab the best bus booking deals before they're gone!</p>
            <div className="deals-banner">
            <div>
              <img src="../redBusImg/rb_bus.svg"/>
            </div>
            <div className="dealsCnt">
              <h3>
              Unlock Unbeatable Exclusive redDeals! <span>20% OFF</span>
              </h3>
              <p><span>3080</span> Deals  |   <span>1318</span> Bus Operators   |   <span>418409</span> Routes</p>
            </div>
            <div>
              <button className="deals-book">Book now</button>
            </div>
            </div>
        </div>

        <div className="accordian">
          <h1>FAQs related to Bus Tickets Booking</h1>
          <ul>
            <li>General</li>
            <li>Ticket-related</li>
            <li>Payment</li>
            <li>Cancellation & Refund</li>
            <li>Insurance</li>
          </ul> 
          <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<AddIcon/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Can I track the location of my booked bus online?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>What are the advantages of purchasing a bus ticket with redBus?</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          There are many advantages to purchasing online bus tickets with redBus. redBus is India’s most trusted bus ticket company, where you can book any type of private or government-owned bus. redBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Why book bus tickets online on redBus?
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Booking bus tickets online on redBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With redBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings. Payment security is another notable feature of online booking, which ensures that your financial information is well-protected against fraud. Additionally, customers can pick their seats, providing a customized travel experience. Online bus booking platforms give real-time updates about any changes in the bus timetable, including delays or cancellations, enabling better planning. The convenience doesn't stop here; travellers can even compare onboard amenities like charging points or snacks, further enhancing the travel experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<AddIcon/>}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Do I need to create an account on the redBus site to book my bus ticket?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No, you don’t have to create an account on the redBus site to book your bus ticket. But it is advisable to make one to accelerate the process next time you want to book bus tickets. Also, redBus has many discounts and offers that you can easily access if you have an account with us.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<AddIcon/>}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Does bus booking online cost me more?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Not at all! The bus ticket price is the same as you would get from the bus operator/ counter of any bus ticket agency. redbus reduces the travel budget by comparing the bus ticket prices among various operators, making it a more cost-effective choice. Therefore, online bus booking is increasingly recognized as a more convenient, efficient, and economical mode of securing travel arrangements.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>How can I get the discounts on the bus booking?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To get a discount on bus booking, please visit https://www.redbus.in/info/OfferTerms and check the available offers. Copy the coupon code and paste it during checkout to avail of the discount.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<AddIcon/>}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>What's New in Bus Booking on redBus?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Primo Bus Ticket: redBus has launched Primo bus services, where passengers can enjoy travelling in high-rated buses with best-in-class services. While looking for bus tickets on the desired route, customers can check the Primo tag to choose this excellent service. From hygiene standards to on-time service and comfort, passengers can benefit from the online bus booking experience from Primo buses.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Can I book a Government bus ticket on redBus?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, you can book government bus tickets on redBus. redBus has extended its bus booking services to many RTCs in India. Some of these RTCs are Andhra Pradesh State Road Transport Corporation (APSRTC), Assam State Transport Corporation (ASTC), Bihar State Tourism Development Corporation (BSTDC), Himachal Road Transport Corporation (HRTC), Jammu and Kashmir State Road Transport Corporation (JKSRTC), Kerala RTC, Kadamba Transport Corporation (KTCL), Patiala and the East Punjab States Union (PEPSU), Puducherry Road Transport Corporation (PRTC), Rajasthan State Road Transport Corporation (RSRTC), South Bengal State Transport Corporation (SBSTC), Uttarakhand Transport Corporation (UTC), West Bengal Transport Corporation WBTC (CTC), North Bengal State Transport Corporation (NBSTC) Chandigarh Transport Undertaking (CTU) 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Do I need to create an account on the redBus site to book my bus ticket?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No, you don’t have to create an account on the redBus site to book your bus ticket. But it is advisable to make one to accelerate the process next time you want to book bus tickets. Also, redBus has many discounts and offers that you can easily access if you have an account with us.
          </Typography>
        </AccordionDetails>
      </Accordion>
          </div>
        </div>
        <div className="upArrow" onClick={scrollToTop} >
            <div className="upArrowAnim">
                <NorthIcon className="arrow"/>
            </div>
        </div>
      </Container>
      
    </>
  );
};

export default Home;
