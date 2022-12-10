import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import styled from "styled-components";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./ui/CartStatus";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <N.Header>
      <N.LogoLink to="/">
        {/* <FiShoppingBag /> */}
        <h1> A.S.P </h1>
      </N.LogoLink>
      <N.Nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">
          <CartStatus />
        </Link>

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
    padding: 0.5rem;
  `,

  LogoLink: styled(Link)`
    display: flex;
    align-items: center;
    color: gray;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-family: cursive;
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
