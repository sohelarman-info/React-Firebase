import React, { useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { TextField, Grid, Button } from "@mui/material";

function App() {
  const [info, setinfo] = useState({
    fName: "",
    email: "",
    deg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={6} className="forms">
              <TextField
                onChange={handleChange}
                type={"text"}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                name="fName"
              />
              <TextField
                onChange={handleChange}
                type={"email"}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
              />
              <TextField
                onChange={handleChange}
                type={"text"}
                id="outlined-basic"
                label="Designation"
                variant="outlined"
                margin="normal"
                fullWidth
                name="deg"
              />
              <Button
                variant="contained"
                color="primary"
                className="button"
                fullWidth
                size="large"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
