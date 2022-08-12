// Call to travel advisor API  and retrieve data, export data to be used elsewhere in the app
// interesting way to use RAPIDAPI, as it only is used by the API KEY in the .env file
import axios from "axios";
// sw is southwest coordinates, ne is northeast coordinates

// Axios.request() seems to be more helpful when you have as many options as seen above; Could also do with axios.get9) but then you'd have 
    // to provide the URL differently and the options as the 3rd param.
export const getPlacesData = async (type, bounds) => {
  try {
    const options = {
        method: "GET",
        url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        params: {
            // Need to change these based on where someone currently is in the actual map --> Lesson 46, get user data and map bounds
                // of current location--> sw and ne location passed in. --> latitudes and longitudes in the nw and se params passed in
          bl_latitude: bounds.sw.lat,
          tr_latitude: bounds.ne.lat,
          bl_longitude: bounds.sw.lng,
          tr_longitude: bounds.ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_TRAVEL_ADVISOR_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
    const response = await axios.request(options);
    // Use this console log for testing --> can return response.data.data which includes restaurants 
        // near the current latitudes and longitudes provided
    console.log(response);
    // restaurants, hotels, and attractions will give 10 values each time they're called --> return so it can be hanlded by .then() in App.js
    console.log(response.data.data);

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
