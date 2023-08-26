import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSingleCredential } from '../api/credentialData';
import CredentialCard from '../components/credentialCard';

export default function Home() {
  const [credential, setCredential] = useState([]);

  const { user } = useAuth();

  const getCredential = () => {
    getSingleCredential(user.uid).then(setCredential);
  };
  useEffect(() => {
    getCredential();
  }, []);
  return (
    <div className="text-center my-4">
      <Link href="/credential/new" passHref>
        <Button>Add Credential</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {credential.map((items) => (
          <CredentialCard key={items.firebaseKey} physicianObj={items} onUpdate={getCredential} />
        ))}
      </div>
    </div>
  );
}
