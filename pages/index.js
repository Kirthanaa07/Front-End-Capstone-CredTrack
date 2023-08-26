import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getSinglePhysician } from '../api/physicianData';
import PhysicianCard from '../components/physicianCard';

export default function Home() {
  const [physician, setPhysician] = useState([]);

  const { user } = useAuth();

  const getPhysician = () => {
    getSinglePhysician(user.uid).then(setPhysician);
  };
  useEffect(() => {
    getPhysician();
  });
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {physician.map((items) => (
          <PhysicianCard key={items.firebaseKey} physicianObj={items} onUpdate={getPhysician} />
        ))}
      </div>
    </div>
  );
}
