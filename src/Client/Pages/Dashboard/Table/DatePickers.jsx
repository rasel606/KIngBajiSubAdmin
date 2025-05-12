import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default ({ items }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select Date"
      showYearDropdown
      showMonthDropdown
      dateFormatCalendar="dd"
      yearDropdownItemNumber={15}
      scrollableYearDropdown
      className="form-control  border border-0 d-flex align-items-center justify-content-center"
    />
  );
};
