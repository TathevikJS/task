import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFound";

const ListItemsPage = lazy(() => import('../pages/ListItemsPage'));
const DetailedListItemPage = lazy(() => import('../pages/DetailedListItemPage'));

const RoutesPages = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to="/items" />} 
      />
      <Route 
        path="/items" 
        element={<ListItemsPage />} 
      />
      <Route 
        path="/items/:id" 
        element={<DetailedListItemPage />} 
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesPages;