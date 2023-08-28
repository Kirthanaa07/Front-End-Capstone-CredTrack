import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getSinglePhysician } from '../api/physicianData';
import PhysicianProfile from '../components/physicianProfile';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [physician, setPhysician] = useState();

  const { user } = useAuth();

  const getPhysician = () => {
    getSinglePhysician(user.uid)
      .then((data) => {
        setPhysician(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPhysician();
  }, []);

  if (!isLoading) {
    return (
      <div className="my-4">
        <div className="d-flex flex-wrap">
          <PhysicianProfile key={physician.physicianId} physicianObj={physician} onUpdate={getPhysician} />
        </div>
      </div>
    );
  }
  return <></>;
}
