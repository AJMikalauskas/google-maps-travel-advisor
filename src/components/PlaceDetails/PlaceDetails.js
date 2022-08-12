import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

// ! FIX UI ON MUI SELECT AND THESE
const PlaceDetails = (props) => {
  const { place } = props;
  return (
    <Card elevation={8}>
      {/*  if image exists call and show it, else show base image; --> we could also do this ternary check on every property 
      acquired from place */}
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      ></CardMedia>
      <CardContent>
        {/* Bottom margin added if gutterBottom true. */}
        <Typography gutterBottom variant="h5">
            {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
            {/* Material ui  rating? --> Can only see rating of places into rate it themselves, may change for later optimization;
            Cast place.rating to Number() --> Rating and num of reviews*/}
            <Rating name="read-only" value={Number(place.rating)} readOnly/>
            <Typography>
                {place.num_reviews > 1 ? `${place.num_reviews} reviews` : `${place.num_reviews} review`} 
                {/* Similar Format: {place.num_reviews} review{place.num_reviews > 1 && "s"} */}
            </Typography>
        </Box>
        {/* If place.address exists, show it --> Do similar code for phone --> Fix UI look here? */}
        {place.address && (
            <Typography 
            gutterBottom
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10
            }}>
                {/* MUI Icon */}
                <LocationOnIcon />
                {place.address}
            </Typography>
        )}
        {place.phone && (
            <Typography 
            gutterBottom
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                {/* MUI Icon */}
                <PhoneIcon />
                {place.phone}
            </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
