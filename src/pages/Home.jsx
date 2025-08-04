import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">📚 Добро пожаловать в онлайн-библиотеку</h1>
      <p className="home-description">
        Исследуйте тысячи книг по программированию, дизайну, разработке и другим темам.  
        Добавляйте любимые книги в избранное, ищите по каталогу и получайте максимум от чтения!
      </p>
      <div className="home-features">
        <div className="feature-card">
          <h3>🔍 Умный поиск</h3>
          <p>Быстро находите нужные книги с помощью фильтров и ключевых слов.</p>
        </div>
        <div className="feature-card">
          <h3>⭐ Избранное</h3>
          <p>Сохраняйте книги, чтобы читать их позже в один клик.</p>
        </div>
        <div className="feature-card">
          <h3>👤 Вход в аккаунт</h3>
          <p>Регистрируйтесь и управляйте своей коллекцией книг.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
