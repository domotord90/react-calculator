import React, { useState } from "react";
import StyledCalculator from "./StyledCalculator";
import Top from "./Top";
import StyledInput from "./StyledInput";
import StyledButton from "./StyledButton";
import StyledButtonContainer from "./StyledButtonContainer";

const Calculator = () => {
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [symbol, setSymbol] = useState("+");

  const onChange = e => {
    if (/^[-]?[0-9]+[.]?([0-9]+)?([-+*/]+[-+]?[0-9]+)*$/.test(e.target.value)) {
      console.log(value);
      if (value === 0) {
        const tempValue = document
          .getElementById("calcInput")
          .value.replace(/\b(?:0*(0\.\d+)|0+)/g, "$1");
        console.log(tempValue);
        if (tempValue === ".") {
          document.getElementById("calcInput").value = "";
          document.getElementById("calcInput").value = "0.";
          setValue("0.");
        } else if (tempValue !== "") {
          document.getElementById("calcInput").value = "";
          document.getElementById("calcInput").value = tempValue;
          setValue(e.target.value);
        }
      } else if (
        document.getElementById("calcInput").value === "-0" &&
        value === "-"
      ) {
        document.getElementById("calcInput").value = "-";
        setValue("-");
      } else setValue(e.target.value);
    }
  };

  const onKeyDown = e => {
    const { keyCode } = e;
    console.log(keyCode);
    if (
      keyCode === 8 &&
      (value.length === 1 || (value.length === 2 && value < 0))
    ) {
      console.log(document.getElementById("calcInput").value);
      setValue(0);
    } else if (keyCode === 109 && value === 0) {
      setValue("-");
    } else if (
      (keyCode === 106 ||
        keyCode === 107 ||
        keyCode === 109 ||
        keyCode === 111) &&
      prevValue === 0
    ) {
      setSymbol(String.fromCharCode(keyCode - 64));
      setPrevValue(value);
      setValue(0);
    } else if (
      (keyCode === 106 ||
        keyCode === 107 ||
        keyCode === 109 ||
        keyCode === 111) &&
      prevValue !== 0
    ) {
      setPrevValue(eval(`${prevValue} ${symbol} ${value}`));
      setValue(0);
      setSymbol(String.fromCharCode(keyCode - 64));
    } else if (keyCode === 13) {
      setValue(eval(`${prevValue} ${symbol} ${value}`));
      setPrevValue(0);
      setSymbol("+");
    }
  };

  const buttonClick = e => {
    const buttonValue = e.target.value;
    if (buttonValue === "CE") {
      setValue(0);
      setPrevValue(0);
    } else if (buttonValue === "+/-" && value === 0) {
      setValue("-");
    } else if (buttonValue === "+/-") {
      setValue(value * -1);
    } else if (buttonValue === "DEL") {
      if (
        String(value).length === 1 ||
        (String(value).length === 2 && value < 0)
      ) {
        setValue(0);
      } else {
        setValue(String(value).substring(0, String(value).length - 1));
      }
    } else if (buttonValue === "." && String(value).indexOf(".") === -1) {
      setValue(value + buttonValue);
    } else if (buttonValue === "." && String(value).indexOf(".") !== -1) {
      setValue(value);
    } else if (
      (buttonValue === "+" ||
        buttonValue === "-" ||
        buttonValue === "*" ||
        buttonValue === "/") &&
      prevValue === 0
    ) {
      setSymbol(buttonValue);
      setPrevValue(value);
      setValue(0);
    } else if (
      (buttonValue === "+" ||
        buttonValue === "-" ||
        buttonValue === "*" ||
        buttonValue === "/") &&
      prevValue !== 0
    ) {
      setPrevValue(eval(`${prevValue} ${symbol} ${value}`));
      setValue(0);
      setSymbol(buttonValue);
    } else if (buttonValue === "=") {
      setValue(eval(`${prevValue} ${symbol} ${value}`));
      setPrevValue(0);
      setSymbol("+");
    } else {
      if (value === 0 && buttonValue !== 0 && buttonValue !== ".") {
        setValue(1 * (value + buttonValue));
      } else if (value !== 0) {
        setValue(value + buttonValue);
      }
    }
  };

  return (
    <StyledCalculator>
      <Top />
      <StyledInput
        id="calcInput"
        type="text"
        inputMode="numeric"
        maxLength="10"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <StyledButtonContainer>
        <StyledButton type="button" onClick={buttonClick} value="7" />
        <StyledButton type="button" onClick={buttonClick} value="8" />
        <StyledButton type="button" onClick={buttonClick} value="9" />
        <StyledButton type="button" onClick={buttonClick} value="+" />
        <StyledButton type="button" onClick={buttonClick} value="4" />
        <StyledButton type="button" onClick={buttonClick} value="5" />
        <StyledButton type="button" onClick={buttonClick} value="6" />
        <StyledButton type="button" onClick={buttonClick} value="-" />
        <StyledButton type="button" onClick={buttonClick} value="1" />
        <StyledButton type="button" onClick={buttonClick} value="2" />
        <StyledButton type="button" onClick={buttonClick} value="3" />
        <StyledButton type="button" onClick={buttonClick} value="*" />
        <StyledButton type="button" onClick={buttonClick} value="0" />
        <StyledButton type="button" onClick={buttonClick} value="." />
        <StyledButton type="button" onClick={buttonClick} value="=" />
        <StyledButton type="button" onClick={buttonClick} value="/" />
        <StyledButton type="button" onClick={buttonClick} value="+/-" />
        <StyledButton type="button" onClick={buttonClick} value="DEL" />
        <StyledButton type="button" onClick={buttonClick} value="CE" />
      </StyledButtonContainer>
    </StyledCalculator>
  );
};

export default Calculator;
