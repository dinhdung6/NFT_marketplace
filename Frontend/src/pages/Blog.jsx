import React, { useState, useEffect }  from 'react';
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import Button from '@mui/material/Button';
import axios from 'axios';


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

function Blog() {
  // State variable for storing loaded data
  const [data, setData] = useState({
    student_id: 1,
    first_name: 'Dinh',
    last_name: 'Dung',
    date_of_birth: "0200-01-15",
    phone_number: "123-456-789"
  });


  const handleButtonClick = () => {
    axios.get('http://127.0.0.1:8000/students/')
    .then(response => {
      console.log(response.data);
      // set the data in React
      setData(response.data);
    })
    .catch(error => {
      console.error('error here: ', error);
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff"
      }}
    >
       <Button
         onClick={handleButtonClick}
        >
          Click me
        </Button>
      <Grid container spacing={2}>
        <Grid item >
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              alt="img text"
              src="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            />
          </ButtonBase>
        </Grid>


        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
              student_id: {data.student_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
              first_name: {data.first_name}
              </Typography>
              <Typography variant="body2" color="success.main">
              last_name:  {data.last_name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            date_of_birth: {data.date_of_birth}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Blog;
