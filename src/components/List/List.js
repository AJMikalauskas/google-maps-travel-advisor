import React, { useState } from "react";
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
  const handleChange = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  return (
    // Will display list of what someone is looking for whether it be restauraunts, hotels, etc...?
    // Do we have to make  --> 2-way binding with type as value and part of onCHange below in the <Select></Select>
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
        <FormControl className={styles.formControl} sx={{ minWidth: 150 }}>
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
        <Grid container spacing={3} sx={{ height: '75vh', overflow: 'auto' }}>
            {/* !We will display the places list here...! If places exist, show them... 
                .map() always expects a return value
            */}
            {places && places.map((place, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        {/* Place details component --> index param is similar to id like which is why it can be passed in as key param.*/}
                        <PlaceDetails place={place} key={index} />
                    </Grid>
                )
            })}
        </Grid>
        </>
      )}
    </div>
  );
};

export default List;
