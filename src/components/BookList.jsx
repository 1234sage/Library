import React from "react";
import BookCard from "./BookCard";

const BookList = ({books, onBookClick, onAddFavorite,favorites}) => {
    return (
        <div className = "book-list">
            {books.map((book,index) => (
                <BookCard key = {index} book = {book} onClick = {() => onBookClick(book)}  onAddFavorite={()=> onAddFavorite(book)} 
                isFavorite={favorites.some(e => e.key===book.key)}
                />
            ))}
        </div>
    )
}

export default BookList;