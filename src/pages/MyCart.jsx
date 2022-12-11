import React from "react";
import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import { getCart } from "../api/firebase";
import CartItem from "../components/CartItem";
import PriceCard from "../components/ui/PriceCard";
import { useAuthContext } from "../context/AuthContext";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";

const SHIPPING = 3000;

function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * (current.quantity, 0)
    );
  return (
    <My.Section>
      <My.Title>내 장바구니</My.Title>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </My.Section>
  );
}

//M은 Mycart
const My = {
  Section: styled.section``,

  Title: styled.p``,
};
export default MyCart;
