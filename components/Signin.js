import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100%',
        width: '100%',
        backgroundImage:
          'url("https://www.apaana.com/wp-content/uploads/2022/12/Untitled-design-22.jpg")',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h5>Welcome to CredTrack</h5>
      <div>
        <Button
          className=""
          variant="dark"
          type="button"
          size="sm"
          onClick={signIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
