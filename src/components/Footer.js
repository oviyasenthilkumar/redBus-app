import React from "react";

// material UI
import Accordion from "@mui/material/Accordion";
import Container from "@mui/material/Container";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CopyrightIcon from '@mui/icons-material/Copyright';

// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <div className="foot">
      <Container>
        <div className="footer">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Popular Bus Routes
            </AccordionSummary>
            <AccordionDetails className="places">
              Delhi To Manali Bus | Delhi To Rishikesh Bus | Delhi To Shimla Bus
              | Delhi To Nainital Bus | Delhi To Katra Bus | Bangalore To Goa
              Bus | Bangalore To Hyderabad Bus | Bangalore To Tirupathi Bus
              |Bangalore To Chennai Bus | Bangalore To Pondicherry Bus |
              Hyderabad To Bangalore Bus | Hyderabad To Goa Bus | Hyderabad To
              Srisailam Bus | Hyderabad To Vijayawada Bus | Hyderabad To
              Tirupathi Bus | Pune To Goa Bus | Pune To Mumbai Bus | Pune To
              Nagpur Bus | Pune To Kolhapur Bus | Pune To Nashik Bus | Mumbai To
              Goa Bus | Mumbai To Pune Bus | Mumbai To Shirdi Bus | Mumbai To
              Mahabaleshwar Bus | Mumbai To Kolhapur Bus | Kolkata To Digha Bus
              | Kolkata To Siliguri Bus | Kolkata To Puri Bus | Kolkata To
              Bakkhali Bus | Kolkata To Mandarmani Bus | Chennai To Bangalore
              Bus | Chennai To Pondicherry Bus | Chennai To Coimbatore Bus |
              Chennai To Madurai Bus | Chennai To Tirupathi Bus | Chandigarh To
              Manali Bus | Chandigarh To Shimla Bus | Chandigarh To Delhi Bus |
              Chandigarh To Dehradun Bus | Chandigarh To Amritsar Bus |
              Coimbatore To Chennai Bus | Coimbatore To Bangalore Bus |
              Coimbatore To Ooty Bus | Coimbatore To Tiruchendur Bus |
              Coimbatore To Madurai Bus | Agra to Bareilly Bus | Hisar to
              Chandigarh Bus | Hisar to Delhi Bus | Lucknow to Ballia Bus |
              Lucknow to Moradabad Bus | Rajkot to Dwarka Bus | Siliguri to
              Gangtok Bus | Ahmedabad to Goa Bus | Ahmedabad to Kanpur Bus |
              Akola to Pune Bus |
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Popular Cities
            </AccordionSummary>
            <AccordionDetails className="places">
              Hyderabad Bus Tickets | Bangalore Bus Tickets | Chennai Bus
              Tickets | Pune Bus Tickets | Delhi Bus Tickets | Mumbai Bus
              Tickets | Kolkata Bus Tickets | Ernakulam Bus Tickets | Ahmedabad
              Bus Tickets | Vijayawada Bus Tickets
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Popular Bus Operators
            </AccordionSummary>
            <AccordionDetails className="places">
              No 1 Air Travels | YBM Travels | Sri SMS Travels | Svkdt Travels |
              RKT Tours and Travels | Royal CarsRahul Travels | JBT Travels |
              Raj ExpressVaishali ExpressRahul Travels | IndoreDelhi Tours And
              Travels | Ashok Travels | Greenline Travels | Pawan Travels | Ravi
              Travels | VRL Travels | Dolphin Travels | Ganesh Travels | Kaveri
              Travels | National Travels | Bharathi Travels | City Land Travels
              | Citylink Travels | KKaveri Travels | KK Travels | Mahadev
              Travels | Maharaja Travels | M R Travels | New Payal Travels |
              Paras Travels | Shree Parshwanath Travels | Payal Travels | R K
              Travels | Shivam Travels | Shree Mahaveer Travels | SRS Travels |
              Tulsi Travels | Vaibhav Travels | Vikas Travels | Amarnath Travels
              | Anand Travels | Ashapura Travels | Ashok Bus ServiceAshoka
              Travels |
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
            <Row className="footRow">
                <Col xs={4} className="footPara">
                   <div>
                        <img src="../redBusImg/rb_bus.svg"/>
                   </div>
                   <p className="redBusPara">redBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. redBus offers bus ticket booking through its website, iOS and Android mobile apps for all major routes.</p>
                </Col>
                <Col xs={2} className="lists">
                    <h4>About redBus</h4>
                    <ul className="redBusPara">
                        <li>About us</li>
                        <li>Investor Relations</li>
                        <li>Contact us</li>
                        <li>Mobile Version</li>
                        <li>redBus on mobile</li>
                        <li>sitemap</li>
                        <li>Offers</li>
                        <li>Careers</li>
                        <li>Values</li>
                    </ul>
                </Col>
                <Col xs={2} className="lists">
                    <h4>Info</h4>
                    <ul  className="redBusPara">
                        <li>T&C</li>
                        <li>Privacy policy</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                        <li>Bus operator registration</li>
                        <li>Agent registration</li>
                        <li>Insurance Partner</li>
                        <li>User agreement</li>
                        <li>Primo Bus</li>
                        <li>Bus TimeTable</li>
                    </ul>
                </Col>
                <Col xs={2} className="lists">
                    <h4>Global Sites</h4>
                    <ul className="redBusPara">
                        <li>India</li>
                        <li>Singapore</li>
                        <li>Malaysia</li>
                        <li>Indonesia</li>
                        <li>Peru</li>
                        <li>Colombia</li>
                        <li>Cambodia</li>
                    </ul>
                </Col >
                <Col xs={2} className="lists">
                <h4>Our Partners</h4>
                <ul className="redBusPara">
                    <li>Goibibo Bus</li>
                    <li>Goibibo Hotels</li>
                    <li>Makemytrip Hotels</li>
                </ul>
                </Col>
            </Row>
            <hr/>
            <div className="redBusPara copyRight">
            <p><span><CopyrightIcon/></span>
                2024 Redbus India Pvt Ltd. All rights reserved</p>
                <div className="socialIcons">
                  <img src="../redBusImg/facebook.svg"/>
                  <img src="../redBusImg/linkedin.svg"/>
                  <img src="../redBusImg/twitter.svg"/>
                  <img src="../redBusImg/insta.svg"/>
                </div>
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
