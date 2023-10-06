# Library_Management_System

# Docker Hub Link
docker pull punitj123/librarymanagementsystem:latest

### To run docker images
docker run -p 4500:4500 punitj123/librarymanagementsystem

## Schema

### user

```
    {
        name: String,
        email: String,
        password: String,
    }
```

### Books

```
    {
        userID:objectID
        ISBN: String,
        title: String,
        author: String,
        genre: String,
        publishedYear: Date,
        quantity: Number,
    }
```

### Category

```
    {
        userID: objectID,
        bookID: objectID,
        status: ["borrowed", "returned"]
    }
```

# Routes :-

- ### Users Routes

| METHOD | ENDPOINT        | WHAT IT DOES                                                                          |
| ------ | --------------- | ------------------------------------------------------------------------------------- |
| POST   | /user/register  | -> Register New User (Requires user details in req.body)                              |
| POST   | /user/login     | -> Login existing user (Requires email and passwords, returns token if login success) |
| PATCH  | /user/:id/reset | -> Reset password                                                                     |

- ### Book Routes

| METHOD | ENDPOINT            | WHAT IT DOES                                                                        |
| ------ | ------------------- | ----------------------------------------------------------------------------------- |
| GET    | /book               | -> get all books listed                                                             |
| GET    | /book/:id           | -> get detail of a book by its objectID                                             |
| GET    | /book/search/:query | -> search functionality                                                             |
| POST   | /book/add           | -> add new book (by providing ISBN, title, author, genre, publishedYear, quantity ) |
| UPDATE | /book/:id/update    | -> update details of a book                                                         |
| DELETE | /book/:id/delete    | -> delete book from list                                                            |

- ### borrowed Routes

| METHOD | ENDPOINT            | WHAT IT DOES                                   |
| ------ | ------------------- | ---------------------------------------------- |
| POST   | /borrow/:bookID     | -> borrow a book by providing bookID in params |
| POST   | /return/:id         | -> Return a book                               |
| GET    | /product/:productID | -> getting products by id                      |

- ### recommend Routes

| METHOD | ENDPOINT                         | WHAT IT DOES                                             |
| ------ | -------------------------------- | -------------------------------------------------------- |
| GET    | /recommendations                           | -> get recommendations of books by book that was borrowed by user|                              |

