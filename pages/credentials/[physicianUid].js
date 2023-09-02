/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllCredentialsForPhysicianDb } from '../../api/credentialData';
import CredentialCard from '../../components/credentialCard';
import getAllCredentialTypes from '../../api/credentialTypeData';

export default function ViewCredential() {
  const [credentialDetails, setCredentialDetails] = useState([]);
  const [credentialTypes, setCredentialTypes] = useState([]);
  const router = useRouter();
  const { physicianUid } = router.query;

  const getAllCredentialTypesList = () => {
    getAllCredentialTypes().then(setCredentialTypes);
  };

  const getAllPhysicianCredentials = (uid) => {
    getAllCredentialsForPhysicianDb(uid).then(setCredentialDetails);
  };

  useEffect(() => {
    getAllCredentialTypesList();
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  return (
    <>
      {
        credentialTypes.map((credentialType) => (
          <div>{credentialType.name}</div>
        ))
      }
      <div className="d-flex flex-row flex-wrap">{credentialDetails.map((item) => (
        <CredentialCard key={item.credentialId} credentialObj={item} onUpdate={() => { getAllPhysicianCredentials(physicianUid); }} />
      ))}
      </div>
    </>
  );
}
