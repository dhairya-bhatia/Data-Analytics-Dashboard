import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import makeApiCall from "../../helpers/apiCall";
import { getToken, setToken } from "../../utils/localstorage";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

const Dashboard = () => {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [isViewDashboard, setIsViewDashboard] = useState(false);
  let history = useHistory();

  const fetchDateRange = () => {
    let url = "https://sigviewauth.sigmoid.io/api/v1/getDateRange";

    const paramsObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getToken(),
      },
      body: JSON.stringify({
        organization: "DemoTest",
        view: "Auction",
      }),
    };
    let response = makeApiCall(url, paramsObj);
    response
      .then((data) => {
        if (data.status.statusCode === "200") {
          setDates(data.result);
        } else {
          alert("Error !");
        }
      })
      .catch((error) => alert(error));
  };
  const viewDashboard = () => {
    setIsViewDashboard(true);
    // ToDo: Call The Api's for Chart, Table, Bar
  };

  const logoutUser = () => {
    setToken(null);
    history.push("/login");
  };

  useEffect(() => {
    fetchDateRange();
  }, []);

  return dates.startDate ? (
    <div className="container-area">
      <Calendar
        next2Label={null}
        prev2Label={null}
        minDate={
          dates.startDate &&
          new Date(moment.unix(dates.startDate / 1000).format("MM-DD-YYYY"))
        }
        activeStartDate={
          dates.startDate &&
          new Date(moment.unix(dates.startDate / 1000).format("MM-DD-YYYY"))
        }
        maxDate={
          dates.startDate
            ? new Date(moment.unix(dates.endDate / 1000).format("MM-DD-YYYY"))
            : new Date()
        }
        onClickDay={viewDashboard}
      />
      <div className="btnContainer">
        <button type="reset" className="logout" onClick={logoutUser}>
          Logout
        </button>
        {isViewDashboard && (
          <button type="button" className="view">
            View Dashboard
          </button>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Dashboard;
