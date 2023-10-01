import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllPhysiciansDb, getSinglePhysicianDb } from '../api/physicianData';
import PhysicianProfile from '../components/physicianProfile';
import PhysiciansTable from '../components/physiciansTable';

export default function Home() {
  // https://stackoverflow.com/questions/62920277/why-the-initial-loading-state-is-set-to-true-while-using-usestate
  const [isLoading, setLoading] = useState(true);
  const [physician, setPhysician] = useState();
  const [physicians, setPhysicians] = useState();

  const { user } = useAuth();

  const getAllPhysicians = () => {
    getAllPhysiciansDb()
      .then((result) => {
        setPhysicians(result);
        setLoading(false);
      });
  };

  const getSinglePhysician = () => {
    getSinglePhysicianDb(user.uid)
      .then((data) => {
        setPhysician(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user.isPhysician) {
      getSinglePhysician();
    } else {
      getAllPhysicians();
    }
  }, []);

  let returnHtml;
  if (!isLoading && user.isPhysician) {
    returnHtml = (
      <div className="m-4 d-flex flex-grow-1">
        <div className="d-flex flex-grow-1 flex-wrap">
          <PhysicianProfile key={physician.physicianId} physicianObj={JSON.parse(JSON.stringify(physician))} onUpdate={getSinglePhysician} />
        </div>
      </div>
    );
  } else if (!isLoading) {
    returnHtml = (
      <div className="m-4 d-flex flex-grow-1">
        <div className="d-flex flex-grow-1 flex-wrap">
          <PhysiciansTable physicians={physicians} onUpdate={getAllPhysicians} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }

  return returnHtml;
}
