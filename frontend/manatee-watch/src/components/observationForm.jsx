import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


function ObservationForm({ onSubmit }) {
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfCalves, setNumberOfCalves] = useState(0);
  const [activity, setActivity] = useState("");
  const [comments, setComments] = useState("");


  const handleChangeNumberOfAdults = (event) => {
    setNumberOfAdults(event.target.value);
  };

  const handleChangeNumberOfCalves = (event) => {
    setNumberOfCalves(event.target.value);
  };

  const handleChangeActivity = (event) => {
    setActivity(event.target.value);
  };

  const handleChangeComments = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      numberOfAdults,
      numberOfCalves,
      activity,
      comments,
    });
    const formData = {
      numberOfAdults,
      numberOfCalves,
      activity,
      comments,
    };
    onSubmit(formData);
  };

  return (
    <div className="formbox">
      <Box
        component="form"
        onSubmit={handleSubmit} // Call handleSubmit when form is submitted
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="numberOfAdults"
            label="Number of Adults"
            type="number"
            value={numberOfAdults}
            onChange={handleChangeNumberOfAdults}
          />
          <TextField
            required
            id="numberOfCalves"
            label="Number of Calves"
            type="number"
            value={numberOfCalves}
            onChange={handleChangeNumberOfCalves}
          />
        </div>
        <div>
          <FormControl style={{ width: "80%", marginLeft: "5" , minWidth:"251px" }}>
            <InputLabel id="activity-label">Activity</InputLabel>
            <Select
              labelId="activity-label"
              id="activity"
              value={activity}
              label="Activity"
              onChange={handleChangeActivity}
            >
              <MenuItem value={"Swimming"}>Swimming</MenuItem>
              <MenuItem value={"Eating"}>Eating</MenuItem>
              <MenuItem value={"Resting"}>Resting</MenuItem>
              <MenuItem value={"Mating"}>Mating</MenuItem>
              <MenuItem value={"Dead/Injured"}>Dead/Injured</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {activity === "Other" ? (
            <TextField
              style={{ width: "80%", marginLeft: "5", minWidth:"251px" }}
              required
              id="comments-required"
              label="Comments"
              type="text"
              value={comments}
              onChange={handleChangeComments}
              multiline
              rows={4}
              placeholder="Describe manatee activity"
            />
          ) : (
            <TextField
              style={{ width: "80%", marginLeft: "5", minWidth:"251px" }}
              id="comments-not-required"
              label="Comments"
              type="text"
              value={comments}
              onChange={handleChangeComments}
              multiline
              rows={4}
              placeholder="Comments"
            />
          )}
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default ObservationForm;
