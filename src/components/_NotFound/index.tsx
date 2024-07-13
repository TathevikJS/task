import { useNavigate } from 'react-router-dom';
import "./styles.scss";
import React from "react";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not_found_container">
      <div className="not_found_wrapper">
        <div className="not_found_title_container">
          <p className="not_found_title">{"PAGE NOT FOUND"}</p>
        </div>
        <div className="status_container">
          <p className="status">{"404"}</p>
        </div>
        <div className="description_container">
          <p className="description">
            {"This page you requested could not be found."}
          </p>
        </div>
        <div className="go_back_container">
          <button className="go_back" onClick={() => navigate(-1)}>
            <p className="go_back_text">{"Go back"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
