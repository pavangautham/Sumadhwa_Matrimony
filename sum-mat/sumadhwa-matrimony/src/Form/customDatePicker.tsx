import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";

interface CustomDatePickerProps {
    onDateChange: (date: Date | null) => void;
  }

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const currentYear = getYear(new Date());
  const years = Array.from(
    { length: currentYear - 1959 },
    (_, index) => currentYear - index
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DatePicker
      dateFormat="dd/MMMM/yyyy"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={decreaseMonth}
            style={{ width: "20px", border: "none" }}
            disabled={prevMonthButtonDisabled}
          >
            <span style={{ fontSize: "20px" }}>{"<"}</span>
          </button>
          <select
            value={getYear(date!)} // Use the non-null assertion operator (!) here
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option: number) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date!)]} // Use the non-null assertion operator (!) here
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={increaseMonth}
            style={{ width: "20px", border: "none" }}
            disabled={nextMonthButtonDisabled}
          >
            <span style={{ fontSize: "20px" }}>{">"}</span>
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        onDateChange(date); // Call the prop function to update the date in the parent component
      }}
    />
  );
};

export default CustomDatePicker;
