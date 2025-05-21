import React from "react";
import InputLabel from "./components/inputLabel";
import "./login.css";

const Login: React.FC = () => {
  return (
    <div className="Container">
      <div className="ContentLogin">
        <form action="submit">
          <h1 className="">FAÇA LOGIN</h1>
          <div className="divInputs">
            <InputLabel name="User" type="text" placeholder="E-mail" />
            <InputLabel
              name="LockKeyhole"
              type="password"
              placeholder="Senha"
            />
          </div>
          <button className="butRecSenha">Esqueceu a senha?</button>
          <button className="butLogin">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
