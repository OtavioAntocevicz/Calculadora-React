import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState(""); // Valor digitado no visor

  // Função para lidar com cliques e teclas
  const handleInput = (value) => {
    if (value === "=" || value === "Enter") {
      try {
        // Remove operadores no final antes de calcular
        const sanitizedInput = input.replace(/[\+\-\*\/]$/, "");
        setInput(eval(sanitizedInput).toString());
      } catch {
        setInput("Erro");
      }
    } else if (value === "C" || value === "Backspace") {
      setInput(""); // Limpa o visor
    } else if (/^[0-9]$/.test(value)) {
      setInput((prev) => prev + value); // Adiciona números
    } else if (/[\+\-\*\/]/.test(value)) {
      // Substitui o operador se já houver um no final
      setInput((prev) =>
        /[\+\-\*\/]$/.test(prev) ? prev.slice(0, -1) + value : prev + value
      );
    } else if (value === ".") {
      // Permite um único ponto decimal por número
      const lastNumber = input.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes(".")) {
        setInput((prev) => prev + value);
      }
    }
  };

  // Adiciona o evento de teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      const allowedKeys = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // Números
        "+", "-", "*", "/", ".", // Operadores e ponto decimal
        "Enter", "Backspace", // Ações
      ];

      // Impede caracteres inválidos
      if (allowedKeys.includes(event.key)) {
        handleInput(event.key);
        event.preventDefault(); // Evita comportamento padrão do navegador
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]); // Adicionado dependência de `input`

  // Definição dos botões da calculadora
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "+",
    "=",
  ];

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleInput(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
