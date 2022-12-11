import React from "react";
import styled from "styled-components";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeFromCart(uid, id);
  };
  return (
    <Li>
      <Img src={image} alt={title}></Img>
      <Title>{title}</Title>
      <Option>{option}</Option>
      <div>
        <Minus onClick={handleMinus} />
        <span>{quantity}</span>
        <Plus onClick={handlePlus} />
        <Delete onclick={handleDelete} />
      </div>
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  align-items: center;
`;

const Img = styled.img`
  width: 12rem;
  border-radius: 0.5rem;
  @media (man-width: 768px) {
    width: 6rem;
  }
`;

const Title = styled.p``;

const Option = styled.p``;

const Minus = styled(AiOutlineMinusSquare)``;

const Plus = styled(AiOutlinePlusSquare)``;

const Delete = styled(RiDeleteBin5Fill)``;

export default CartItem;
