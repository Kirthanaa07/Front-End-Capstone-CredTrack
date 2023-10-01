/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import {
  Button,
} from 'react-bootstrap';
// import SidebarMenu from 'react-bootstrap-sidebar-menu';
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
    <SidebarMenu className="sidebar-menu">
      <SidebarMenu.Header>
        <SidebarMenu.Text className="d-flex justify-content-center p-3">
          <h1 className="app-name"> CRED TRACK </h1>
        </SidebarMenu.Text>
      </SidebarMenu.Header>
      <SidebarMenu.Collapse className="d-flex flex-grow-1">
        <SidebarMenu className="d-flex flex-column flex-grow-1 justify-content-between align-items-center">
          <div className="d-flex flex-grow-1 flex-column gap-5">
            <div className="d-flex flex-column gap-1">
              <h5><em>{user.displayName}</em></h5>
              <SidebarMenu.Text><em>{role}</em></SidebarMenu.Text>
            </div>
            {
              user.isAdmin ? (
                <>
                  <Link passHref href="/">
                    <SidebarMenu.Nav.Link>Physicians</SidebarMenu.Nav.Link>
                  </Link>
                  <Link passHref href="/physician-applications">
                    <SidebarMenu.Nav.Link>Applications</SidebarMenu.Nav.Link>
                  </Link>
                </>
              ) : <></>
            }
            {
              user.isPhysician ? (
                <>
                  <Link passHref href="/">
                    <SidebarMenu.Nav.Link>Profile</SidebarMenu.Nav.Link>
                  </Link>
                </>

              ) : <></>
            }
            {
              !user.isPhysician && !user.isAdmin ? (
                <>
                  <Link passHref href="/">
                    <SidebarMenu.Nav.Link>Physicians</SidebarMenu.Nav.Link>
                  </Link>
                  <Link passHref href="/application-form/new">
                    <SidebarMenu.Nav.Link>Apply For Physician</SidebarMenu.Nav.Link>
                  </Link>
                </>
              ) : <></>
            }
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </div>
        </SidebarMenu>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
}
