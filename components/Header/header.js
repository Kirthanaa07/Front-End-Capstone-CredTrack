// import React, {
//   useState, ProSidebar,
//   Menu,
//   Button,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
//   FaList, FaRegHeart,
//   FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, RiPencilLine, BiCog,
// } from 'react';
// import { useAuth } from '../../utils/context/authContext';

// export default function Header() {
//   const [menuCollapse, setMenuCollapse] = useState(false);
//   const { user } = useAuth();
//   let role;
//   if (user.isAdmin) {
//     role = 'Admin';
//   } else if (user.isPhysician) {
//     role = 'Physician';
//   } else {
//     role = 'Public';
//   }

//   // create a custom function that will change menucollapse state from false to true and true to false
//   const menuIconClick = () => {
//     // condition checking to change state from true to false and vice versa
//     if (menuCollapse === false) setMenuCollapse(false);
//     else setMenuCollapse(true);
//   };

//   return (
//     <>
//       <div id="header">
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader>
//             <div className="logotext">
//               {/* small and big change using menucollapse state */}
//               <p>{menuCollapse ? 'Logo' : 'Big Logo'}</p>
//             </div>
//             <div className="closemenu">
//               <Button type="button" onClick={menuIconClick} onKeyDown={menuIconClick} />
//               {/* changing menu collapse icon on click */}
//               {menuCollapse ? (
//                 <FiArrowRightCircle />
//               ) : (
//                 <FiArrowLeftCircle />
//               )}
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               <MenuItem active="true" icon={<FiHome />}>
//                 Home
//               </MenuItem>
//               <MenuItem icon={<FaList />}>Category</MenuItem>
//               <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
//               <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
//               <MenuItem icon={<BiCog />}>Settings</MenuItem>
//             </Menu>
//           </SidebarContent>
//           <SidebarFooter>
//             <Menu iconShape="square">
//               <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
//             </Menu>
//           </SidebarFooter>
//         </ProSidebar>
//       </div>
//     </>
//   );
// }
