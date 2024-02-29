import "./App.css";
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Table } from "./components/Table";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Grid,
  Box,
  FormGroup,
  FormControl,
  FormHelperText,
  Typography,
  TextField,
  Button,
  Modal,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [columns, setColumns] = useState([
    { field: "name", headerName: "Your TodoName", width: 400 },
    { field: "expireStateVar", headerName: "Expire Status", width: 200 },
    { field: "dateExpired", headerName: "Expire Date", width: 200 },
    { field: "completed", headerName: "Status", width: 100 },
    { field: "description", headerName: "Description", width: 450 },
  ]);
  const [dateTime, onChange] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState("");

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const response = await axios
      .get(`http://localhost:8080/api/todos`)
      .then((res) => setRows(res.data));
  };
  const handleOpenClose = () => {
    setOpen(!open);
  };
  const handleAdd = async (obj) => {
    await axios.post(
      `http://localhost:8080/api/postTodo`,
      obj
    );
  };

  const isIn = (value) => {
    rows.map((row) => (row.value === value ? true : ""));
  };
  return (
    <>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item lg={12} md={12} sm={12}>
          <Typography
            margin={5}
            style={{ textAlign: "center" }}
            variant="h4"
            component="h4"
          >
            Taskfy
            <Grid justifyContent={"center"} container spacing={5}>
              <Grid item lg={6} md={6} sm={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      name="TodosName"
                      variant="standard"
                      label="Your To Do"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    ></TextField>
                    <FormHelperText>Type here your To Do.</FormHelperText>
                  </FormControl>

                  <Modal
                    open={open}
                    onClose={handleOpenClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Grid item container margin={3} spacing={3}>
                        <Grid item>
                          {" "}
                          <TextField
                            name="Description"
                            variant="standard"
                            label="Description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          {" "}
                          <DateTimePicker
                            style={{ margin: 3 }}
                            onChange={onChange}
                            value={dateTime}
                          />
                        </Grid>
                      </Grid>

                      <Grid item>
                        {" "}
                        <Button variant="outlined" onClick={handleOpenClose}>
                          Ok
                        </Button>
                      </Grid>
                    </Box>
                  </Modal>
                </FormGroup>
              </Grid>

              <Grid item lg={1} md={3} sm={1}>
                {" "}
                <Button
                  startIcon={<CalendarMonthIcon />}
                  onClick={handleOpenClose}
                ></Button>
              </Grid>
              <Grid item lg={1} md={3} sm={1}>
                <Fab
                  size="medium"
                  color="success"
                  aria-label="add"
                  onClick={() => {
                    value &&
                      handleAdd({
                        name: value,
                        completed: false,
                        description: description,
                        dateExpired: dateTime,
                      });
                  }}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item lg={9}>
          <Table columns={columns} rows={rows} setRows={setRows} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;