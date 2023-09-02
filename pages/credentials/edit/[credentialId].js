import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCredentialDb } from '../../../api/credentialData';
import CredentialForm from '../../../components/form/addCredForm';

function EditCredential() {
  const [isLoading, setIsLoading] = useState(true);
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { credentialId } = router.query;
  useEffect(() => {
    getSingleCredentialDb(credentialId).then((data) => {
      setEditItem(data);
      setIsLoading(false);
    });
  }, [credentialId]);

  if (!isLoading) {
    return (<CredentialForm credentialObj={editItem} />);
  }
  return <></>;
}

export default EditCredential;
