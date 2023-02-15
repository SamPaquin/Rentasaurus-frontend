import React, { Fragment, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingEgg from "../../shared/components/UIElements/LoadingEgg";
import { AuthContext } from "../../shared/context/AuthContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ReportItem.css";

const ReportItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = (event) => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/reports/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Delete Report"
        footerClass="report-item__modal-actions"
        footer={
          <Fragment>
            <Button onClick={cancelDeleteHandler}>ABORT</Button>
            <Button onClick={confirmDeleteHandler}>DELETE</Button>
          </Fragment>
        }
      >
        <p>Are you sure you want to delete this report?</p>
        <p className="danger">This action is permanent and cannot be undone.</p>
      </Modal>
      {auth.isLoggedIn && (
        <li className="report-item">
          {isLoading && <LoadingEgg asOverlay />}
          <div className="report-item__content">
            <NavLink to={`/reports/report/${props.id}`}>
              <div className="report-item__image">
                <img src={props.image} alt={props.title} />
              </div>
              <div className="report-item__info">
                <h2>{props.title}</h2>
                <h3>{props.street}</h3>
              </div>
            </NavLink>
            <div className="report-item__actions">
              <Button inverse to={`/reports/edit/${props.id}`}>
                EDIT
              </Button>
              <Button inverse onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            </div>
          </div>
        </li>
      )}
    </Fragment>
  );
};

export default ReportItem;
