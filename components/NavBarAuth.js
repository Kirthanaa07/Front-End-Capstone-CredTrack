/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Image, Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth() {
  const { user } = useAuth();
  let role;
  if (user.isAdmin) {
    role = 'Admin';
  } else if (user.isPhysician) {
    role = 'Physician';
  } else {
    role = 'Public';
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-fixed-top">
      <Container>
        <Image src="/LOGO.png" alt="LOGO" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-bar" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex flex-grow-1 justify-content-between align-items-center">
            {
              user.isAdmin ? (
                <>
                  <Link passHref href="/">
                    <Navbar.Brand>Physicians</Navbar.Brand>
                  </Link>
                  <Link passHref href="/">
                    <Nav.Link>Approved Credentials</Nav.Link>
                  </Link>
                  <Link passHref href="/">
                    <Nav.Link>Declined Credentials</Nav.Link>
                  </Link>
                  <Link passHref href="/components/applicationsTable">
                    <Nav.Link>Applications</Nav.Link>
                  </Link>
                </>
              ) : <></>
            }
            {
              user.isPhysician ? (
                <>
                  <Link passHref href="/">
                    <Navbar.Brand>Profile</Navbar.Brand>
                  </Link>
                  <Link passHref href="/credentials/new">
                    <Nav.Link>Add Credential</Nav.Link>
                  </Link>
                </>
              ) : <></>
            }
            {
              !user.isPhysician && !user.isAdmin ? (
                <>
                  <Link passHref href="/">
                    <Navbar.Brand>Physicians</Navbar.Brand>
                  </Link>
                  <Link passHref href="/application-form/new">
                    <Nav.Link>Apply For Physician</Nav.Link>
                  </Link>
                </>
              ) : <></>
            }
            <div className="d-flex flex-row gap-3">
              <Navbar.Text>{role}</Navbar.Text>
              <Button variant="danger" onClick={signOut}>Sign Out</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
