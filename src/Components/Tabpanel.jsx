import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
let states = [];
let cities = [];
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function ControllableStates(props) {
  const [value, setValue] = useState(props.name);
  // const [city,setCity]=useState(cities[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.arr}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.name} />}
      />
    </div>
  );
}

function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ position: "relative", left: "60%" }}>
      <SortOutlinedIcon sx={{ position: "relative", top: "15%" }} />
      <Button
        id="basic-button"
        sx={{ color: "white" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Filter
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <ControllableStates arr={states} name="State" />
        </MenuItem>
        <MenuItem>
          <ControllableStates arr={cities} name="city" />
        </MenuItem>
      </Menu>
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState([]);
  const oldRides = [];
  const futureRides = [];

  const getData = () => {
    axios.get("https://assessment.api.vweb.app/rides").then((response) => {
      // console.log(response);
      const myData = response.data;
      setData(myData);
    });
  };
  const [userData, setUserData] = useState();
  const getuserData = () => {
    axios.get("https://assessment.api.vweb.app/user").then((response) => {
      // console.log(response);
      const data = response.data;
      setUserData(data);
    });
  };

  data.forEach((ride) => {
    states.push(ride.state);
    cities.push(ride.city);
    var distance = ride.station_path[0];
    ride.station_path.forEach((dis) => {
      if (distance > Math.abs(dis - userData?.station_code))
        distance = Math.abs(dis - userData?.station_code);
    });
    ride.distance=distance;
    const apiDate = new Date(ride.date);
    var currentDate = new Date();
    if (currentDate > apiDate) {
      oldRides.push(ride);
    } else futureRides.push(ride);
  });
  useEffect(
    () => {
      getData();
    },
    [],
    [data]
  );
  useEffect(
    () => {
      getuserData();
    },
    [],
    [userData]
  );
  data.sort((a,b)=>a.distance-b.distance)
  states = removeDuplicates(states);
  cities = removeDuplicates(cities);
  var Label2 = "Upcoming rides (" + futureRides.length + ")";
  var Label3 = "Past rides (" + oldRides.length + ")";
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="white"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
          sx={{ color: "white" }}
        >
          <Tab label="Nearest rides" {...a11yProps(0)} />
          <Tab label={Label2} {...a11yProps(1)} />
          <Tab label={Label3} {...a11yProps(2)} />
          <BasicMenu />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {data.map((currElement) => (
          <Card
            id={currElement.id}
            origin={currElement.origin_station_code}
            path={currElement.station_path}
            map={currElement.map_url}
            date={currElement.date}
            city={currElement.city}
            state={currElement.state}
            distance={currElement.distance}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {futureRides.map((currElement) => (
          <Card
            id={currElement.id}
            origin={currElement.origin_station_code}
            path={currElement.station_path}
            map={currElement.map_url}
            date={currElement.date}
            city={currElement.city}
            state={currElement.state}
            distance={currElement.distance}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {oldRides.map((currElement) => (
          <Card
            id={currElement.id}
            origin={currElement.origin_station_code}
            path={currElement.station_path}
            map={currElement.map_url}
            date={currElement.date}
            city={currElement.city}
            state={currElement.state}
            distance={currElement.distance}
          />
        ))}
      </TabPanel>
    </Box>
  );
}
