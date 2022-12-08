import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import styled from "styled-components";
import { login } from "../api/firebase";

export default function Navbar() {
  return (
    <N.Header>
      <N.LogoLink to="/">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </N.LogoLink>
      <N.Nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <BsFillPencilFill />
        </Link>
        <button onClick={() => login()}>Login</button>
      </N.Nav>
    </N.Header>
  );
}

//N은 Navbar
const N = {
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    padding: 0.5rem;
  `,

  LogoLink: styled(Link)`
    display: flex;
    align-items: center;
    color: #f96162;
    font-size: 2.25rem;
    line-height: 2.5rem;
  `,

  Nav: styled.nav`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
  `,

  PancilLink: styled(Link)`
    font-size: 1.5rem;
    line-height: 2rem;
  `,
};
