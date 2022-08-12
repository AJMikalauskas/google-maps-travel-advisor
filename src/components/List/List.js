import React, { createRef, useEffect, useState } from "react";
import styles from "./List.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CircularProgress, Grid } from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

//  Can only override MUI classes and default mui CSS styles by writing in sx or by mui theme.
const List = (props) => {
  // Passes in isLoading, childClicked, places states from the App.js parent component; Object destructure all these from props.
  const { type, setType, isLoading, childClicked, places } = props;
  //const [type, setType] = useState("");
 // console.log(childClicked);
  const handleChange = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };

// Store refs of each item in the list using the useState() hook
  const [elementRefs, setElementRefs] = useState([]);
  // dependency of places because places will change when going to a different location on the map
  useEffect(() => {
    //  This anonymous arow function is how to add to a setState while also retaining old state, mostly done for arrays?
    //setElementRefs((elRefs) => [...elRefs, elementRefs]);
        // Rarely seen Array() cast interface and fill() method, map, not care about element but its index --> connect reference to index
        // I've also not rarely ever seen the createRef() hook, very interesting
        // need to return in order to use these refs externally outside of this useEffect(); return out of anonymous arrow function
            // for accessing values in setElementRefs
    setElementRefs((refs) =>{
     return Array(places.length).fill().map((_, index) => refs[index] || createRef())
    })
  }, [places]);
  return (
    // Will display list of what someone is looking for whether it be restauraunts, hotels, etc...?
    // Do we have to make  --> 2-way binding with type as value and part of onCHange below in the <Select></Select>
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
        <FormControl variant="standard" className={styles.formControl} sx={{ minWidth: 150, paddingBottom: "40px" }}>
          <InputLabel id="type-simple-select-label">Type: </InputLabel>
          <Select
            labelId="type-simple-select-label"
            id="type-simple-select"
            // Maybe change starting value from type to something else so the start value isn't restauraunts but an empty string
            value={type}
            onChange={handleChange}
            label="Type"
            //input={<OutlinedInput label="Type:" />}
          >
            {/* <MenuItem value=""> <em>None</em></MenuItem> */}
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} sx={{ height: '80vh', overflow: 'auto' }}>
            {/* !We will display the places list here...! If places exist, show them... 
                .map() always expects a return value
            */}
            {places && places.map((place, index) => {
                return (
                    //  ref is used to navigate to position in grid of the clicked place? 
                    <Grid ref={elementRefs[index]}item xs={12} key={index}>
                        {/* Place details component --> index param is similar to id like which is why it can be passed in as key param. -->
                        passed ref as a prop done before but to have the prop name as ref is interesting*/}
                        {/* Select this place or scroll down to it if the childClicked is equal to the  index? */}
                        <PlaceDetails selected={Number(childClicked) === index} placeRef={elementRefs[index]} place={place} key={index} />
                    </Grid>
                )
            })}
        </Grid>
        </div>
      )}
    </div>
  );
};

export default List;
