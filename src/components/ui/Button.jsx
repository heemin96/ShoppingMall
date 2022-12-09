import React from "react";
import styled from "styled-components";

function Button({ text, onClick }) {
  return <AppButton onClick={onClick}>{text}</AppButton>;
}

const AppButton = styled.button`
  background-color: #f96162;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;

  &:hover {
    filter: brightness(1.1);
  }
`;

export default Button;
