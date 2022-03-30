import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/utilityFunctions";

export default function AdminList({ admins, onSuccessApproveReject }) {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [responseMessage, setResponseMessage] = useState(false);

  console.log(admins);
  const { email, id, CV } = admins;
  const onAcceptOrReject = (statusTeacher) => {
    setIsSubmitting(true);
    console.log("hwere");

    const token = getToken();
    const baseEndPoint = process.env.REACT_APP_API_END_POINT;
    const apiEndPoint = baseEndPoint + "/api/checkCV/" + admins.id;
    const reqBody = {
      is_active_teacher: statusTeacher,
    };
    console.log(apiEndPoint);
    axios
      .patch(apiEndPoint, reqBody, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        console.log(res.data);
        if (res.data.data) {
          setResponseMessage("success");
        }

        setTimeout(() => {
          setResponseMessage("");
          onSuccessApproveReject();
        }, 3000);
      })
      .catch((err) => {
        setResponseMessage("error");
        console.log(err);
        setIsSubmitting(false);
        //setResponseData("Error")
      });
  };
  return (
    <div className="card p-2">
      <div className="row">
        <div className="col-sm">{email}</div>
        <div className="col-sm">
          {CV ? (
            <a
              className="btn btn-primary"
              target="_blank"
              href={process.env.REACT_APP_API_END_POINT + CV}
            >
              View CV
            </a>
          ) : (
            "No CV"
          )}
        </div>
        <div className="col-sm">
          <button
            onClick={() => onAcceptOrReject(true)}
            className="btn btn-success"
          >
            Accept
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
