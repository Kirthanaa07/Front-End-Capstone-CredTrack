import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
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
  }, []);
  return (
    <div className="text-center my-4">
      <Link href="/physician/new" passHref>
        <Button>Add A Physician</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {physician.map((items) => (
          <PhysicianCard key={items.firebaseKey} physicianObj={items} onUpdate={getPhysician} />
        ))}
      </div>
    </div>
  );
}
