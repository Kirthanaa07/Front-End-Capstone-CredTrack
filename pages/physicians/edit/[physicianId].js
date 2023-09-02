import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePhysicianDb } from '../../../api/physicianData';
import PhysicianForm from '../../../components/form/addPhysicianForm';

function EditPhysician() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { physicianId } = router.query;
  useEffect(() => {
    getSinglePhysicianDb(physicianId).then(setEditItem);
  }, [physicianId]);
  return (<PhysicianForm obj={editItem} />);
}

export default EditPhysician;
