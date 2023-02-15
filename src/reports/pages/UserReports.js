import React, { Fragment, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import ReportList from "../components/ReportList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingEgg from "../../shared/components/UIElements/LoadingEgg";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./UserReports.css";

const UserReports = () => {
  const [loadedReports, setLoadedReports] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/reports/user/${userId}`
        );
        setLoadedReports(responseData.reports);
      } catch (err) {}
    };
    fetchReports();
  }, [sendRequest, userId]);

  const reportDeletedHandler = (deletedReportId) => {
    setLoadedReports((prevReports) =>
      prevReports.filter((report) => report.id !== deletedReportId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingEgg asOverlay />}
      {!isLoading && (
        <div className="user-reports">
          {!isLoading && loadedReports ? (
            <ReportList
              items={loadedReports}
              onDeleteReport={reportDeletedHandler}
            />
          ) : (
            <div className="no-reports">
              <h2>No reports found. Want to create one?</h2>
              <NavLink to="/reports/new">
                <Button>Add Report</Button>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UserReports;
