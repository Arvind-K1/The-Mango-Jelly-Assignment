# Comic Book E-commerce Store Backend

This is the backend implementation for a React-based e-commerce store where comic books are the main inventory items. The backend allows store managers to perform CRUD operations (Create, Read, Update, Delete) on comic book items and provides APIs for pagination, filtering, and sorting the comic book inventory.

## Features

### Comic Book Management API
1. **Create a Comic Book**  
   - Add a new comic book to the inventory by providing details such as:
     - Book Name
     - Author Name
     - Year of Publication
     - Price
     - Discount (optional)
     - Number of Pages
     - Condition (e.g., new, used)
     - Description (optional)
2. **Edit a Comic Book**  
   - Update any of the comic book's attributes (e.g., price, condition, or discount).
3. **Delete a Comic Book**  
   - Remove a comic book from the inventory.

### Comic Book List API
1. **Fetch Inventory List**  
   - Retrieve all available comic books in the inventory with the following features:
     - **Pagination**: For large datasets.
     - **Filtering**: Filter books based on author, year of publication, price, condition, etc.
     - **Sorting**: Sort results by price, year, or alphabetically by name.

### Comic Book Details API
1. **Get Comic Book Details**  
   - Fetch full details of a specific comic book based on its ID.

## Projet SetUp

### NodeJS Initialization
``` 
npm install
```
### Creating .env Variables
```
PORT=5000
MONGODB_URI= mongodb_connection_URL
```

### npm packeges used
```
npm install express nodemon mongoose
```

### To start server
```
npm start
```



This `README.md` file gives a clear overview of the project and helps other developers understand how to use and run the application.
