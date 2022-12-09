import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import styled from "styled-components";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <N.Header>
      <N.LogoLink to="/">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </N.LogoLink>
      <N.Nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>

        {user && user.isAdmin && (
          <Link to="/products/new">
            <BsFillPencilFill />
          </Link>
        )}

        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
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
