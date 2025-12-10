import { Outlet, useParams } from "react-router";

import Navbar from "./Navbar";

export default function Layout() {
  const { id } = useParams;
  return (
    <>
      <Navbar id={id} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
