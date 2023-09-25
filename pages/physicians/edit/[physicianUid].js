import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePhysicianDb } from '../../../api/physicianData';
import PhysicianForm from '../../../components/form/addPhysicianForm';

function EditPhysician() {
  const [isLoading, setIsLoading] = useState(true);
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { physicianUid } = router.query;
  useEffect(() => {
    getSinglePhysicianDb(physicianUid).then((data) => {
      setEditItem(data);
      setIsLoading(false);
    });
  }, [physicianUid]);

  if (!isLoading) {
    return (<PhysicianForm physicianObj={editItem} />);
  }
  return <></>;
}

export default EditPhysician;
