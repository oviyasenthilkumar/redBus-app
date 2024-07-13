import React from "react";

// Material UI
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";


// bootstrap
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <>
      <Container fluid>
        <div className="header">
          <div className="logo">
            <img src="../redBusImg/rdc-redbus-logo.svg" title="red Bus" />
          </div>
          <span> | </span>
          <ul className="header_ul">
            <li className="header_ul_li1 busTicket">
              <div className="headImg1">
                <img src="../redBusImg/rb_bus.svg" />
              </div>
              <span>Bus Tickets</span>
            </li>
            <li className="header_ul_li1 trainTicket">
              <Stack
                spacing={7}
                direction="row"
                sx={{ color: "action.active" }}
              >
                <Badge
                  color="success"
                  badgeContent={"₹80 off"}
                  style={{ width: "100%" }}
                  className="headImg2"
                >
                  <img src="../redBusImg/rail.svg" className="trainImg" />
                </Badge>
              </Stack>
              <span>Train Tickets</span>
            </li>
          </ul>
          <ul className="header_ul header_ul2">
            <li className="header_ul_li2">
              <HeadsetMicIcon /> <span>Help</span>
            </li>
            <li className="header_ul_li2">
              <AccountCircleOutlinedIcon />
              <span>Logout </span>
            </li>
            
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Header;
