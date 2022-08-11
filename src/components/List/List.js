import React, { useState } from "react";
import styles from "./List.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//  Can only override MUI classes and default mui CSS styles by writing in sx or by mui theme.
const List = (props) => {
    // Passes in isLoading, childClicked, places states from the App.js parent component; Object destructure all these from props.
        const { type, setType, isLoading, childClicked, places} = props;
    //const [type, setType] = useState("");
    const handleChange = (event) => {
        console.log(event.target.value);
        setType(event.target.value);
    }
    return (
        // Will display list of what someone is looking for whether it be restauraunts, hotels, etc...? 
            // Do we have to make  --> 2-way binding with type as value and part of onCHange below in the <Select></Select>
        <div className={styles.container}>
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
        </div>
    );
};

export default List;