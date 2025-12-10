import { Route, Routes } from "react-router";
import Layout from "./Layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Item from "./item/Item";
import ReviewsPage from "../Reviews/ReviewPage.jsx";
import ItemDetail from "./item/ItemDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/item/:id/reviews" element={<ReviewsPage />} />
      </Route>
    </Routes>
  );
}
