import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCredential } from '../../../api/credentialData';
import CredentialForm from '../../../components/form/addCredForm';

function EditCredential() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleCredential(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<CredentialForm obj={editItem} />);
}

export default EditCredential;
