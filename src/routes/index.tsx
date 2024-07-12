import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFound";

const ListItems = lazy(() => import('../pages/ListItems'));
const DetailedListItem = lazy(() => import('../pages/DetailedListItem'));

export const RoutesPages = () => {
  return (
    <Routes>
      <Route 
        path="/items" 
        element={<ListItems />} 
      />
      <Route 
        path="/items/:id" 
        element={<DetailedListItem />} 
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
