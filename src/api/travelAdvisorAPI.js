// Call to travel advisor API  and retrieve data, export data to be used elsewhere in the app
// interesting way to use RAPIDAPI, as it only is used by the API KEY in the .env file
import axios from "axios";
// sw is southwest coordinates, ne is northeast coordinates

// Axios.request() seems to be more helpful when you have as many options as seen above; Could also do with axios.get9) but then you'd have 
    // to provide the URL differently and the options as the 3rd param.
export const getPlacesData = async (type, sw, ne) => {
  try {
    const options = {
        method: "GET",
        url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        params: {
            // Need to change these based on where someone currently is in the actual map
          bl_latitude: "11.847676",
          tr_latitude: "12.838442",
          bl_longitude: "109.095887",
          tr_longitude: "109.149359",
        },
        headers: {
          "X-RapidAPI-Key": "3fb132f0a4msh01884afa74b3096p1653c7jsnd2db1dce89cf",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
    const response = await axios.request(options);
    // Use this console log for testing --> can return response.data.data which includes restauraunts 
        // near the current latitudes and longitudes provided
    console.log(response);
    // restauraunts, hotels, and attractions will give 10 values each time they're called
    console.log(response.data.data);
  } catch (err) {
    console.log(err);
  }
};
