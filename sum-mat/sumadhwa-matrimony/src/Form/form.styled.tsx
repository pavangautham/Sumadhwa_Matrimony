import styled from "styled-components";

export const FormSection = styled.section`
    width: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #80b8db;
    padding: 30px 0;

    h1 {
      @media (width >= 320px) and (width <= 425px) {
        font-size: 2em;
        text-wrap: nowrap
      }
    }

    .logo-left,
  .logo-right {
    width: 75px;
    margin-right: 15px;
  }

  .logo-left {
    @media (width >= 320px) and (width <= 425px) {
      width: 50px;
      margin: 0;
    }
  }

  .logo-right {
    transform: scaleX(-1);
    margin-left: 15px;

    @media (width >= 320px) and (width <= 768px) {
      display: none;
    }
  }
`;

export const StyledForm = styled.form`
  max-width: 601px;
  height: auto;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebfbffe6;
  border: 1px solid black;
  //   box-shadow: 0px 0px 5px 2px #ebfbffe6;

  @media (width > 768px) {
    padding: 30px 100px;
  }

  @media (width > 425px) and (width <= 768px) {
    padding: 30px 85px;
  }
  @media (width > 319px) and (width <= 425px) {
    padding: 20px 10px;
  }

  .required-span {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 15px;
    color: #ff6447;
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }

  h1 {
    font-weight: 600;
    font-size: 39px;
    letter-spacing: 0.7px;
    margin: 0;
    text-align: center;
    text-transform: capitalize;

    @media (width > 425px) and (width <= 768px) {
      font-size: 30px;
      font-weight: 500;
    }
    @media (width > 319px) and (width <= 425px) {
      font-size: 33px;
      font-weight: 500;
    }
  }

  .two {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    @media (width >319px) and (width <= 425px) {
      display: block;
    }
    @media (width >425px) and (width <= 581px) {
      display: block;
    }
  }

  .last-input-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .water-mark {
      position: absolute;
      bottom: 10px;
      right: 20px;
      font-size: 20px;
      color: whitesmoke;
      text-shadow: 0 0 7px black;
      font-weight: 900;
    }
  }

  input {
    color: #000;
  }

  .input-holder {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    color: #000

    label {
      width: 100%;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 1px;
    }

    input {
      width: 100%;
      padding: 3px 5px;
      background-color: transparent;
      outline: unset;
      border-radius: 1px;
      border: 1px solid #141414;
      color: #000

      ::after, ::before {
        color: #000
      }

      &:focus {
        background-color: #dbf9ff;
        border: 1px solid #0b95ea;
        box-shadow: 0px 0px 2px black;
        color: #000
      }
    }

    textarea{
      color: #000;
    }

    .error-message {
      color: red;
      margin-left: 10px;
      font-size: 17px;
      letter-spacing: 1.5px;
      font-weight: 700;
    }

    .address-input {
      resize: unset;
      height: 120px;
      padding: 3px 5px;
      outline: unset;
      background-color: transparent;
      border-radius: 1px;
      border: 1px solid #141414;

      &:focus,
      &:active {
        background-color: #dbf9ff;
        border: 1px solid #0b95ea;
        box-shadow: 0px 0px 2px black;
      }
    }

    input::file-selector-button {
      background-color: gray;
      outline: unset;
      border: 1px solid gray;
      border-radius: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 0.5px;

      &:hover {
        background-color: #0b95ea;
        color: white;
      }
    }

    .preview-holder {
      margin-top: 20px;
      overflow: hidden;
      width: 90%;

      img {
        width: 100%;
      }
    }
  }

  .button-holder {
    margin-top: 10px;
    display: flex;
    aign-items: center;
    justify-content: center;
  }

  #submit {
    width: 200px;
    padding: 3px 50px;
    font-size: 1rem;
    background-color: transparent;
    outline: unset;
    border: 1px solid #0b95ea;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      background-color: #0b95ea;
      border: 1px solid transparent;
      color: white;
    }
  }

  .react-datepicker-wrapper {
    position: relative;
    z-index: 9999; /* Adjust as needed */
  }

  .react-datepicker__input-container {
    display: block;
    width: 100%;
  }

  .react-datepicker__day--selected {
    background-color: #fff;
    color: #fff;
  }

  .react-datepicker__time-container{
    width: 100%;
  }
  .react-datepicker--time-only{
    width: 150px;
  }
  .react-datepicker-popper {
    z-index: 99999;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
    font-size: large;
  }
`;