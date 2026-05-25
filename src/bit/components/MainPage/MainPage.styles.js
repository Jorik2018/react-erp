import styled from "styled-components";

export const Content = styled.div`
  backdrop-filter: blur(31px) saturate(160%);
  -webkit-backdrop-filter: blur(30px) saturate(160%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20px;
  height: 700px;
  padding: 0 30px;
  @media only screen and (max-width: 1748px) {
    & {
      width: 70%;
      margin: auto;
      margin-top: -300px;
    }
  }
  @media only screen and (max-width: 1166px) {
    & {
      width: 100%;
    }
  }
  @media only screen and (max-width: 695px) {
    max-width: 99%;
  }
  @media only screen and (max-width: 420px) {
    & {
      margin-top: -100px;
    }
  }
`;

export const Heading = styled.div`
  height: 700px;
  padding-top: 100px;
  font-size: 2rem;
  font-family: "vazir", sans-serif;
  color: white;
  text-align: center;
  direction: rtl;
  @media only screen and (max-width: 1748px) {
    & {
      padding-top: 0;
    }
  }
`;
