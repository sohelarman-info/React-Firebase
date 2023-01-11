import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import {
  TextField,
  Grid,
  Button,
  Icon,
  SvgIcon,
  IconButton,
} from "@mui/material";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  // input field validation
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [todo, setTodo] = useState([]);
  // UseState
  const [info, setInfo] = useState({
    fName: "",
    email: "",
    deg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setNameError("");
    setEmailError("");
    setDesignationError("");
  };

  const validationSchema = () => {
    if (!info.fName) {
      setNameError("Please input your Name!");
    } else if (!info.email) {
      setEmailError("Please input your Email!");
    } else if (!info.deg) {
      setDesignationError("Please input your Designation!");
    }
  };

  // Write data in database
  const db = getDatabase();
  const handleSubmit = () => {
    validationSchema();
    if (info.fName && info.email && info.deg) {
      set(push(ref(db, "users")), {
        fName: info.fName,
        email: info.email,
        deg: info.deg,
      }).then(() => {
        setInfo({
          fName: "",
          email: "",
          deg: "",
        });
      });
    }
  };

  // get all data

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((e) => {
        arr.push({ ...e.val(), id: e.key });
      });
      setTodo(arr);
    });
  }, []);

  // Delete Data

  const hanleDelete = (id) => {
    remove(ref(db, "users/" + id));
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
                value={info.fName}
              />
              {nameError ? <p className="user-error">{nameError}</p> : ""}
              <TextField
                onChange={handleChange}
                type={"email"}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                value={info.email}
              />
              {emailError ? <p className="user-error">{emailError}</p> : ""}
              <TextField
                onChange={handleChange}
                type={"text"}
                id="outlined-basic"
                label="Designation"
                variant="outlined"
                margin="normal"
                fullWidth
                name="deg"
                value={info.deg}
              />
              {designationError ? (
                <p className="user-error">{designationError}</p>
              ) : (
                ""
              )}
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                className="button"
                fullWidth
                size="large"
              >
                Submit
              </Button>

              <div className="box">
                {todo.map((item, key) => (
                  <div className="widths" key={key}>
                    <h4 className="user-name">{item.fName}</h4>
                    <h5 className="user-email">{item.email}</h5>
                    <p className="user-deg">{item.deg}</p>
                    <span className="db-id">{item.id}</span>
                    <IconButton
                      onClick={() => hanleDelete(item.id)}
                      aria-label="delete"
                      size="large"
                      className="Delete-btn"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
