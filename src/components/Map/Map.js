import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleMapReact from "google-map-react";
//import { Map, GoogleApiWrapper } from "google-maps-react";
import styles from "./Map.module.css";

// const useStyles = makeStyles((theme) => ({
//     mapContainer: {
//         height: "100vh",
//         width: "100%"
//     }
// }));

const Map = (props) => {
  // Stylesheet, can call classes from theme above.
  //const classes = useStyles();
  return (
    <Box className={styles.mapContainer}>
      {/* This requires an API KEY from the google developer console after enabling the JS google maps API and creating credentials of
            the API key --> https://console.cloud.google.com/google/maps-apis/credentials?project=travel-advisor-359113&supportedpurview=project  */}
            {/* There are still 2 GET requests blocked by the google maps client, has to do with this, even with the API_KEY,
            fine though as it only shows in console, no UI problem */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 32.777963, lng: -96.79622 }}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
      </GoogleMapReact>

      {/* For using google-maps-react --> https://www.youtube.com/watch?v=wfH-W7oXEo8 */}
    </Box>
  );
};

export default Map;

