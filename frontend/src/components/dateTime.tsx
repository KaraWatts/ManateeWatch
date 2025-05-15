import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function BasicDateTimePicker({
  onDateChange
}: any) {
  const [value, setValue] = useState(new Date()); 
  const currentTime = new Date()

  const handleDateChange = (newValue: any) => {
    setValue(newValue.toDate()); // Update the local state with the new value
  };
  useEffect(() => {
    onDateChange({
        "sighting_date": value,
        "created_date":currentTime})
  },[value])


  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Sighting Date - Time"
        value={dayjs(value)}
        onChange={handleDateChange} // Pass dateTime up to form
      />
    </LocalizationProvider>
    </div>
  );
}