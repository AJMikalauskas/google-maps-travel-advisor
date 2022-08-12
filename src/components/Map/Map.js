import { Box, Paper, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleMapReact from "google-map-react";
//import { Map, GoogleApiWrapper } from "google-maps-react";
import styles from "./Map.module.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

// const useStyles = makeStyles((theme) => ({
//     mapContainer: {
//         height: "100vh",
//         width: "100%"
//     }
// }));

const Map = (props) => {
  // Stylesheet, can call classes from theme above.
  //const classes = useStyles();

  // Plot places onto map
    // show dynamic latitude and longitude as part of map of current location, how will putting it in here affect the travelAdvisor API js file?
  const { places, coords, setBounds, setCoords, setChildClicked } = props;
  return (
    <Box className={styles.mapContainer}>
      {/* This requires an API KEY from the google developer console after enabling the JS google maps API and creating credentials of
            the API key --> https://console.cloud.google.com/google/maps-apis/credentials?project=travel-advisor-359113&supportedpurview=project  */}
            {/* There are still 2 GET requests blocked by the google maps client, has to do with this, even with the API_KEY,
            fine though as it only shows in console, no UI problem */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        //defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(event) => {
            // Pull all information from event param
                // set new coordinates while also setting enw bounds. helps keep track of where user is currently at with google maps
                setCoords({lat: event.center.lat, lng: event.center.lng})
                // pull northeast and southwest boundaries every time the map is moved or changes from original position
                console.log(`ne: ${event.marginBounds.ne.lat}, ${event.marginBounds.ne.lng}, sw: ${event.marginBounds.sw.lat}, ${event.marginBounds.sw.lng}`);
                setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw})
        }}
        //  For when a child marker is clicked? --> how to expand or not limit it to only clicking on icon, but the whole paper?
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length > 0 && places.map((place, index) => {
            return (
                // div uses these and will place a location outlined icon that is blue on each longitude and latitude pair from 
                    // restaurants, hotels, and attractions --> show user's GPS data and map bounds of current location 
                <div 
                lat={place.latitude}
                lng={place.longitude}
                key={index}
                //onClick={(child) => setChildClicked(child)}
                >
                    <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                    {/* Small card describing each place on the map top right? */}
                    {/*  Maybe add functionality to whereo only if you click on the locationonoutlinedicon to show this, useState of toggle;
                    if click on this show in list.js */}
                    <Paper sx={{width:120, display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px", textAlign:"center", alignItems: "center" }} elevation="12"
                     >
                        <Typography >{place.name}</Typography>
                        <img className={styles.cardImg} src={place.photo 
                        ? place.photo.images.large.url 
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"} 
                        alt="place-img"/>
                        <br/>
                    <Rating name="read-only" readOnly size={"small"} value={Number(place.rating)}/>
                    </Paper>
                </div>
            )
        })}
      </GoogleMapReact>

      {/* For using google-maps-react --> https://www.youtube.com/watch?v=wfH-W7oXEo8 */}
    </Box>
  );
};

export default Map;

