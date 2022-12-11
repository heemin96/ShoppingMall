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
      {/* 전체 컨테이너 */}
      <CartItemDetailContainer>
        {/*  */}

        {/* 디테일 정보 */}
        <CartItemDetail>
          <Title>{title}</Title>
          <Option>{option}</Option>
          <Price>{price}</Price>
        </CartItemDetail>
        {/*  */}

        {/* 계산 */}
        <CartItemCalCulateConatiner>
          <Minus onClick={handleMinus} />
          <span>{quantity}</span>
          <Plus onClick={handlePlus} />
          <Delete onclick={handleDelete} />
        </CartItemCalCulateConatiner>
      </CartItemDetailContainer>
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
  @media (max-width: 768px) {
    width: 6rem;
  }
`;

const CartItemDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 0%;
  margin-left: 1rem;
`;

const CartItemDetail = styled.div`
  flex-basis: 60%;
`;

const Title = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const Option = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: black; ;
`;

const Price = styled.p``;

const CartItemCalCulateConatiner = styled.div``;

const Minus = styled(AiOutlineMinusSquare)``;

const Plus = styled(AiOutlinePlusSquare)``;

const Delete = styled(RiDeleteBin5Fill)``;

export default CartItem;
