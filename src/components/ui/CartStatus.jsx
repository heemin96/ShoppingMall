import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";

import { AiOutlineShoppingCart } from "react-icons/ai";

function CartStatus(props) {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  return (
    <CartStatusContainer>
      <CartIcon />
      {products && <ProductsLength>{products.length}</ProductsLength>}
    </CartStatusContainer>
  );
}

const CartStatusContainer = styled.div`
  position: relative;
  text-align: -webkit-center;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 2.25rem;
  font-height: 2.5rem;
`;

const ProductsLength = styled.p`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  font-weight: bold;
  background-color: black;
  border-radius: 100%;
  text-align: center;
`;

export default CartStatus;
