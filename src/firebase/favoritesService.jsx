import { getDatabase, ref, onValue, set, remove } from "firebase/database";

const db = getDatabase();

export const subscribeToFavorites = (uid, callback) => {
  const userRef = ref(db, "favorites/" + uid);
  const unsubscribe = onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    const books = data ? Object.values(data) : [];
    callback(books);
  });

  return () => unsubscribe();
};

export const addFavorite = (uid, book) => {
  const bookRef = ref(db, `favorites/${uid}/${book.key}`);
  return set(bookRef, book);
};

export const removeFavorite = (uid, bookKey) => {
  const bookRef = ref(db, `favorites/${uid}/${bookKey}`);
  return remove(bookRef);
};
