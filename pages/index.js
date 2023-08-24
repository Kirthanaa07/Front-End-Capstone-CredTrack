import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import getSinglePhysician from '../api/physicianData';

function Home() {
  const [physician, setPhysician] = useState([]);

  const { user } = useAuth();

  const getPhysician = () => {
    getSinglePhysician(user.uid).then(setPhysician);
  };
  useEffect(() => {
    getPhysician();
  }, []);
  return (
    <div>
      <Button type="button" size="lg" className="copy-btn" onClick={addCred}>
        Add Cred
      </Button>
    </div>
  );
}

export default Home;
