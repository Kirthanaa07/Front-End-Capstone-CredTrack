/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import {
  Image, Button,
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
        <SidebarMenu.Text className="d-flex gap-4">
          <Image src="/LOGO.png" alt="LOGO" />
        </SidebarMenu.Text>
      </SidebarMenu.Header>
      <SidebarMenu.Collapse>
        <SidebarMenu className="me-auto d-flex flex-column flex-grow-1 justify-content-between align-items-center">
          <div className="d-flex flex-column gap-3">
            {
              user.isAdmin ? (
                <>
                  <div className="d-flex flex-row align-items-center">
                    <i className="bi bi-clipboard-plus-fill white-icon" />
                    <Link passHref href="/">
                      <SidebarMenu.Nav.Link>Physicians</SidebarMenu.Nav.Link>
                    </Link>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <i className="bi bi-menu-button-wide-fill white-icon" />
                    <Link passHref href="/physician-applications">
                      <SidebarMenu.Nav.Link>Applications</SidebarMenu.Nav.Link>
                    </Link>
                  </div>
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
            <div className="d-flex flex-row gap-3">
              <SidebarMenu.Text>{role}</SidebarMenu.Text>
            </div>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </div>
        </SidebarMenu>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
}
