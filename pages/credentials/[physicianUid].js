/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllCredentialsForPhysician } from '../../api/credentialData';
import CredentialCard from '../../components/credentialCard';

export default function ViewCredential() {
  const [credentialDetails, setCredentialDetails] = useState([]);
  const router = useRouter();
  const { physicianUid } = router.query;

  function getAllPhysicianCredentials(uid) {
    getAllCredentialsForPhysician(uid).then(setCredentialDetails);
  }

  useEffect(() => {
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  return (
    <>
      <div className="d-flex flex-row flex-wrap">{credentialDetails.map((item) => (
        <CredentialCard key={item.credentialId} credentialObj={item} onUpdate={() => { getAllPhysicianCredentials(physicianUid); }} />
      ))}
      </div>
    </>
  );
}
