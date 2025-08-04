import React, {useState} from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            alert("Пароль должен содержать минимум 6 символов.");
            return;
        }
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate("/catalog");
        } catch (error) {
            console.log("Ошибка аутентификации", error);
            if (error.code === "auth/email-already-in-use") {
                alert("Этот email уже зарегистрирован");
            } else if (error.code === "auth/invalid-credential") {
                alert("Неверный пароль или email");
            }
        }
    };

    return (
        <div className="container">
            <h2>{isLogin ? "Войти" : "Регистрация"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className = "password-wrapper">
                    <input
                        type="password"
                        value={password}
                        placeholder="Пароль"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Создать аккаунт" : "Уже есть аккаунт?"}
            </button>
        </div>
    );
};

export default Auth;
