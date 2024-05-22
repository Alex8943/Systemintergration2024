//Resolver file works like CRUD (with all the operations), but also as a seed data file, becouse of of all the hard coded data inserted


const authors = [
    { id: '1', name: 'J.K. Rowling' },
    { id: '2', name: 'J.R.R. Tolkien' },
];

const books = [
    { id: '1', title: 'Harry Potter and the Sorcerer\'s Stone', releaseYear: 1997, authorId: '1' },
    { id: '2', title: 'Harry Potter and the Chamber of Secrets', releaseYear: 1998, authorId: '1' },
    { id: '3', title: 'The Hobbit', releaseYear: 1937, authorId: '2' },
    { id: '4', title: 'The Lord of the Rings', releaseYear: 1954, authorId: '2' },
];

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id === args.id),
        authors: () => authors,
        author: (parent, args) => authors.find(author => author.id === args.id),
    },
    Mutation: {
        createBook: (parent, args, { pubsub }) => {
            const newBook = { id: String(books.length + 1), ...args };
            books.push(newBook);
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
            return newBook;
        },
        updateBook: (parent, args) => {
            const bookIndex = books.findIndex(book => book.id === args.id);
            if (bookIndex === -1) return null;
            const updatedBook = { ...books[bookIndex], ...args };
            books[bookIndex] = updatedBook;
            return updatedBook;
        },
        deleteBook: (parent, args) => {
            const bookIndex = books.findIndex(book => book.id === args.id);
            if (bookIndex === -1) return { message: "Book not found" };
            books.splice(bookIndex, 1);
            return { message: "Book deleted successfully" };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(['BOOK_ADDED']),
        },
    },
    Book: {
        author: (parent) => authors.find(author => author.id === parent.authorId),
    },
    Author: {
        books: (parent) => books.filter(book => book.authorId === parent.id),
    },
};

export { resolvers };
