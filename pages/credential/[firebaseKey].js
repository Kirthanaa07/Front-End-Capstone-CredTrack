/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewCredentialDetails } from '../../api/mergedData';

export default function ViewCredential() {
  const [credentialDetails, setCredentialDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    viewCredentialDetails(firebaseKey).then(setCredentialDetails);
  }, [firebaseKey]);

  return (
    <div className="text-white ms-5 details d-flex flex-column">
      <h5>{credentialDetails.credType}</h5>
    </div>
  );
}
