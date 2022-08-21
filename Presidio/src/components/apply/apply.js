import React, { useState, useEffect } from "react";
import "./apply.css";
import { Modal, Fade } from "@mui/material";
import axios from "axios";

const Apply = () => {
  const [dataDB, setData] = useState([]);

  useEffect(() => {
    getData({});
  }, []);

  const getData = async () => {
    const response = axios
      .get("http://localhost:1337/api/list")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const [center, setCenter] = useState("Vaccination Centers");
  const [id, setId] = useState();

  const handleBtn = (id, address) => {
    setId(id);
    setCenter(address);
  };

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:1337/api/appointment", {
      cid: id,
      name,
      datetime: date,
    });
    const data = response.data;
    if (data.status == "ok") {
      alert("Appointment Created!");
      setId(undefined);
      setCenter("Vaccination Centers");
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="vaccination">
      <h2>
        Hover on the block below to see all the vaccination centers available
      </h2>
      <div className="dropdown">
        <div className="dropdown-name">{center}</div>
        <div className="dropdown-content">
          {dataDB.map((e, i) => (
            <div key={i}>
              <button
                style={{
                  border: "none",
                  minWidth: "200px",
                  background: "none",
                  color: "black",
                  fontWeight: "600",
                }}
                onClick={() => {
                  handleBtn(e._id, e.address);
                }}
              >
                {e.name} - {e.address}
              </button>
            </div>
          ))}
        </div>
      </div>

      {id ? (
        <div className="center-details">
          <h2>Center name: {dataDB.find((e) => e._id === id).name}</h2>
          <h2>Address: {dataDB.find((e) => e._id === id).address}</h2>
          <button onClick={handleOpen}>Apply</button>
          <Modal open={open} onClose={handleClose}>
            <Fade in={open}>
              <div className="appointment-form">
                <label>Name</label>
                <input
                  placeholder="Enter patient name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Date</label>
                <input
                  type="datetime-local"
                  onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handleSubmit}>Check Availability</button>
              </div>
            </Fade>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Apply;
