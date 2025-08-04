import React from "react";

const BookModal = ({ book, onClose }) => {
  const { title, author_name, first_publish_year, publisher, cover_i } = book;
  const imgUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
    : "https://avatars.mds.yandex.net/i?id=6804ab44ee127010662098f6459b09b23dbfbfdb-3798236-images-thumbs&n=13";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={imgUrl} alt={title} />
        <h2>{title}</h2>
        <p><strong>Автор:</strong> {author_name?.join(", ") || "Неизвестно"}</p>
        <p><strong>Год издания:</strong> {first_publish_year || "Неизвестен"}</p>
        <p><strong>Издатель:</strong> {publisher?.join(", ") || "Неизвестен"}</p>
      </div>
    </div>
  );
};

export default BookModal;