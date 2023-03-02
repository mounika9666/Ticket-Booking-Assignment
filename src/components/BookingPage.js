import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import UserRepository from '../utils/users'
import SeatRepository from '../utils/seats'
import "./BookingPage.css";

const seatRepository = new SeatRepository(7)

function App() {

  const agent = UserRepository.getLoggedInUser()

  const [form, setForm] = useState([]);
  const [bookingCount, setBookingCount] = useState(0)

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.name === "" || item.age === "" || item.gender === ""
    );

    if (someEmpty) {
      form.forEach(() => {
        const allPrev = [...form];
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const bookTickets = (event) => {
    event.preventDefault();

    const passengers = [...form];
    seatRepository.allocateSeats(passengers, agent.email)
    setBookingCount(0)
    setForm([])
  };

  const handleAddLink = (e) => {
    e.preventDefault();

    const inputState = {
      name: "",
      age: "",
      gender: "",
    };

    // if (prevIsValid()) {
    if (bookingCount < agent.maxSeats) {
      if (prevIsValid()) {
        setForm((prev) => [...prev, inputState]);
        setBookingCount(bookingCount + 1);
      } else {
        toast.error("Complete previous passenger details")
      }
    } else {
      // add a warning dialog
      toast.error("You have reached your maximum booking capacity");
    }
  };

  const onChange = (index, name, value) => {
    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [name]: value,
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();
    setBookingCount(bookingCount - 1)
    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  const seats = seatRepository.getSeats()

  return (
    <div className="container mt-5 py-5">
      <h1>Add Passenger Details</h1>
      <p>Maximum tickets you can book: {agent.maxSeats}</p>
      <form>
        {form.map((item, index) => (
          <div className="d-flex, row mt-3" key={`item-${index}`}>
            <div className="col">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={item.Name}
                onChange={(e) => onChange(index, "name", e.target.value)}
              />
            </div>

            <div className="col">
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={item.Username}
                onChange={(e) => onChange(index, "age", parseInt(e.target.value))}
              />
            </div>

            <div className="col">
              <select name="gender" id="gender" onChange={(e) => onChange(index, "gender", e.target.value)} value={form[index].gender}>
                <option value=""></option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </div>

            <div className="col">
              <button
                className="btn btn-warning"
                onClick={(e) => handleRemoveField(e, index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="button_Container mb-3">
          <button className="btn btn-primary mt-2" onClick={handleAddLink}>
            Add Passenger
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-primary mt-2 ml-10" onClick={bookTickets}>
            Book Tickets
          </button>
        </div>
      </form>

      <div className="seat-layout">
        {seats.map((row) => (
          <div className="seat-row">
            {
              [...Array(3).keys()].map((colIndex) => {
                const seat = row[colIndex]
                return (<div className={"cell seat " + (seat.passenger ? "occupied" : "")}>{seat.number}</div>)
              })
            }
            <div className="cell"></div>
            {
              [...Array(3).keys()].map((colIndex) => {
                const seat = row[colIndex + 3]
                return (<div className={"cell seat " + (seat.passenger ? "occupied" : "")}>{seat.number}</div>)
              })
            }
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
