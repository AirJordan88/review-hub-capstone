import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Item from "./item/Item";
import ItemDetail from "./item/ItemDetail.jsx";
import CreateItem from "./item/CreateItem.jsx";
import HomePage from "./Layout/HomePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/new" element={<CreateItem />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Route>
    </Routes>
  );
}
