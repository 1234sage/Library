import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./App.css";

const App = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <Router>
            <div className="navbar">
                <h2>Библиотека</h2>
                <nav>
                    <Link to="/">Главная</Link>
                    <Link to="/catalog">Каталог</Link>
                    <Link to="/favorites">Избранные</Link>

                    {!user ? (
                        <Link to="/account">Войти/Зарегистрироваться</Link>
                    ) : (
                        <span onClick = {handleLogout}>
                          <Link to = "/">Выйти</Link>
                        </span>
                    )}
                </nav>
                {user && <p style={{ marginTop: "10px" }}>Вы вошли как {user.email}</p>}
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/account" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;
