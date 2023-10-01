import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllPhysiciansRequestDb } from '../api/physicianRequestData';
import SubmittedApplicationsTable from '../components/applicationsTable';

export default function ApplicationSubmitted() {
  const [load, loading] = useState(true);
  const [request, setRequest] = useState();

  const { user } = useAuth();

  const getAllPhysiciansRequestApplications = () => {
    getAllPhysiciansRequestDb().then((application) => {
      setRequest(application);
      loading(false);
    });
  };

  useEffect(() => {
    getAllPhysiciansRequestApplications();
  });
  let returnHtml;
  if (!load && user.isAdmin) {
    returnHtml = (
      <div className="text-center my-4">
        <div className="m-4 d-flex flex-grow-1">
          <div className="d-flex flex-grow-1 flex-wrap">
            <SubmittedApplicationsTable applications={request} onDelete={getAllPhysiciansRequestApplications} />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
  return returnHtml;
}
