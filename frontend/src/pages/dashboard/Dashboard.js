import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductLists from "../../components/product/productList/ProductLists";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
      console.log("we loggedIn");
    }
    console.log(products);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <h2>Dashboard</h2>
      <ProductLists products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
