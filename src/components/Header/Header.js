// import React from 'react'
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "./Header.module.css";
// Theming Documentation --> https://mui.com/material-ui/customization/theming/ 
// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontSize: 24
//     }
// }));

const Header = () => {
   // const classes = useStyles();
    return (
        <AppBar position="static"> 
            <Toolbar>
                <Typography className={styles.title}> 
                    Travel Advisor 
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;