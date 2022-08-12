import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import {useEffect, useState} from 'react';
import { getPlacesData } from "./api/travelAdvisorAPI";

function App() {
  //  Like why do we make these part of the parent App component when they can be handled in the child perfectly fine?
  const [type,setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  // North and southwest boundaries on the google map is the bounds
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  

// It makes you go back to original location everytime I edit the code myay not matter in the long run as it only applies to dev?

  //  Use Travel Advisor API by API Dojo from RapidAPI --> https://rapidapi.com/apidojo/api/travel-advisor
    // in the api folder in src. --> when changing API keys and variables in .env, need to restart app fully to see effects.
// let numOfTimesPageLoads = 0;

  // How to have this stop from running on loading of page, only run after, may have to create my own hook sort of
    // Just create an if inside the useEffect, can't put hook inside an if statement
   useEffect(() => {
    if(bounds && !(type === "")) {
    // Loading state --> Progess Bar if loading, else show content in List.js
    setIsLoading(true);
    // pass in type to see what we get back from the API which includes restauraunts, hotels, and attractions; type param in getPlacesData
      // change request based on type handled both in the API file and here via .then()?
    getPlacesData(type, bounds).then((data) => {
      // filter places to only if they have a name and if there reviews is greater than 0, 
        // need for setPlaces useState setting function to be a dependency
        //try {
      setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
        //} catch(err) {
          //console.log(err) => for fail cases or onload case, will hopefully refactor to create something smilar to useEffect
      setIsLoading(false);
        //}
       // setIsLoading(false);
        });
    }
  }, [bounds, type]);


useEffect(() => {
  // success callback is the first parameter but it's weird to see an anonymous arrow function with an object within an object as its
    // parameter 
  navigator.geolocation.getCurrentPosition(({coords: {latitude , longitude}}) => {
    // getCurrentPosition is a method that will give the latitude and longitude as part of the coords object?
      // Set property of lat to latitude of current position, Set next property of lng to the longitude. -->
        // defaultCenter and center property in Map.js
    setCoords({lat: latitude, lng: longitude})
  })
},[])
  
  return (
  <>
    <CssBaseline/>
    <Header/>
    <Grid container style={{width: "100%" }}>
      {/* md and xs are for screen size, 12 is total length, 4 is 1/3 size of screen, 8 is 2/3 size of screen */}
      <Grid xs={12} md={4} item>
        {/* May just put this in the list ocmponent, may not see the full picture so not understanding why we have to use this globally. */}
        {/* type={type} setType={(type) => setType(type)} */}
        {/*  Pass in childClicked to list, console.log in List to see hwhat it returns and how to use what it returns, returns number */}
        <List type={type} setType={(type) => setType(type)} childClicked={childClicked}  places={places} isLoading={isLoading} />
      </Grid>
      <Grid xs={12} md={8} item>
        {/* Plot the places(attractions,hotels,restaurants) onto map by passing in places; Pass in coords and places */}
        {/*  It's funny how the way we pass in the setBounds prop and acts really as what the setBounds() useState does */}
        {/* Finally using childClicked for knowing what was clicked and where to show on map*/}
        <Map coords={coords} places={places} setBounds={(bounds) => setBounds(bounds)} setCoords={(coordinates) => setCoords(coordinates)}
          setChildClicked={(child) => setChildClicked(child)}/>
      </Grid>
    </Grid>
  </>
  );
}

export default App;
