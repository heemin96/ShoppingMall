import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthContext";

function CartStatus(props) {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  return (
    <div>
      <AiOutlineShoppingCart />
      {products && <p>{products.length}</p>}
    </div>
  );
}

export default CartStatus;
