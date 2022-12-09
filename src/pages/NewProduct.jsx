import React, { useState } from "react";
import styled from "styled-components";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            setSuccess("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <N.Section>
      {success && <p className="my-2">✅ {success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <N.Form onSubmit={handleSubmit}>
        <N.ImgInput onChange={handleChange} />
        <N.TitleInput
          vlaue={product.title ?? ""} //
          onchange={handleChange}
        />
        <N.PriceInput
          vlaue={product.price ?? ""} //
          onchange={handleChange}
        />
        <N.CategoryInput
          vlaue={product.category ?? ""}
          onchange={handleChange}
        />
        <N.DescriptionInput
          vlaue={product.description ?? ""}
          onchange={handleChange}
        />
        <N.OptionsInput vlaue={product.options ?? ""} onchange={handleChange} />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </N.Form>
    </N.Section>
  );
}

const N = {
  Section: styled.section``,

  Form: styled.form``,

  ImgInput: styled.input.attrs((props) => ({
    type: "file",
    accept: "image/*",
    name: "file",
    required: true,
  }))``,

  TitleInput: styled.input.attrs((props) => ({
    type: "text",
    name: "title",
    placeholder: "제품명",
    required: true,
  }))``,

  PriceInput: styled.input.attrs((props) => ({
    type: "number",
    name: "price",
    placeholder: "가격",
    required: true,
  }))``,

  CategoryInput: styled.input.attrs((props) => ({
    type: "text",
    name: "category",
    placeholder: "카테고리",
    required: true,
  }))``,

  DescriptionInput: styled.input.attrs((props) => ({
    type: "text",
    name: "description",
    placeholder: "제품 설명",
    required: true,
  }))``,

  OptionsInput: styled.input.attrs((props) => ({
    type: "text",
    name: "options",
    placeholder: "옵션들(콤마(,)로 구분)",
    required: true,
  }))``,
};

export default NewProduct;
