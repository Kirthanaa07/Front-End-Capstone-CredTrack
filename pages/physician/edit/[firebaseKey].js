import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePhysician } from '../../../api/physicianData';
import PhysicianForm from '../../../components/form/addPhysicianForm';

function EditPhysician() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePhysician(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<PhysicianForm obj={editItem} />);
}

export default EditPhysician;
