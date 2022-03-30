import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminList from "./AdminList";
import { getToken } from "../../utils/utilityFunctions";

export default function AdminPage() {
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allTutors, setAllTutorResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [cv, setCV] = useState("");
  const [responseMessage, setResponseMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = () => {
    const token = getToken();
    const baseEndPoint = process.env.REACT_APP_API_END_POINT;
    const apiEndPoint = baseEndPoint + "/api/checkCV";
    setIsLoading(true);
    axios
      .get(apiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data) {
          setAllTutorResults(res.data.data);
        }
      })
      .catch((err) => {
        setErrMsg("Error");
        setIsLoading(false);
      });
  };
  return (
      
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-sm btn-secondary">
        Back
      </button>
      <div>
        <div className="mt-4">
          <div className="row">
            {allTutors.length > 0
              ? allTutors.map((item, index) => {
                  return (
                    <div className="col-12">
                      <div key={item.id} className="col-md-12 well">
                        <AdminList
                          admins={item}
                          onSuccessApproveReject={() => fetchTableData()}
                        />
                        {console.log(item)}
                      </div>
                    </div>
                  );
                })
              : "No Result"}
          </div>
        </div>
      </div>
    </div>
  );
}
