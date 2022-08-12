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
  const [childClicked, setChildClicked] = useState(null);
  

  //  Use Travel Advisor API by API Dojo from RapidAPI --> https://rapidapi.com/apidojo/api/travel-advisor
    // in the api folder in src. --> when changing API keys and variables in .env, need to restart app fully to see effects.
  let numOfTimesPageLoads = 0;

  // How to have this stop from running on loading of page, only run after, may have to create my own hook sort of???
   useEffect(() => {
    // Loading state --> Progess Bar if loading, else show content in List.js
    setIsLoading(true);
    // pass in type to see what we get back from the API which includes restauraunts, hotels, and attractions; type param in getPlacesData
      // change request based on type handled both in the API file and here via .then()?
    getPlacesData(type).then((data) => {
      // filter places to only if they have a name and if there reviews is greater than 0, 
        // need for setPlaces useState setting function to be a dependency
        try {
      setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
        } catch(err) {
          //console.log(err) => for fail cases or onload case, will hopefully refactor to create something smilar to useEffect
      setIsLoading(false);
        }
        setIsLoading(false);
    });
  }, [type]);

  
  return (
  <>
    <CssBaseline/>
    <Header/>
    <Grid container style={{width: "100%" }}>
      {/* md and xs are for screen size, 12 is total length, 4 is 1/3 size of screen, 8 is 2/3 size of screen */}
      <Grid xs={12} md={4} item>
        {/* May just put this in the list ocmponent, may not see the full picture so not understanding why we have to use this globally. */}
        {/* type={type} setType={(type) => setType(type)} */}
        <List type={type} setType={(type) => setType(type)} childClicked={childClicked}  places={places} isLoading={isLoading} />
      </Grid>
      <Grid xs={12} md={8} item>
        <Map />
      </Grid>
    </Grid>
  </>
  );
}

export default App;
