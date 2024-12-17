- [x] User Authentication and Authorization:
    Implement user accounts so users can log in, track their reading progress, and manage their books.
    - [x] JWT Authentication: Use JSON Web Tokens (JWT) for secure authentication.
    - [x] User Roles: Implement roles like admin and user to manage different access levels.
    - Note: Need to add 'admin' role, DELETE and PUT request not tested yet

- [ ] Enhanced Book Metadata:
    Add more metadata to books to provide richer information and better filtering options.
    - [ ] Genres: Allow books to have multiple genres.
    - [ ] Ratings and Reviews: Enable users to rate and review books.
    - [ ] ISBN and Pages: Include International Standard Book Number (ISBN) and page count for books.

- [ ] Reading Progress and History:
    Track the reading progress and history for users.
    - [ ] Reading Status: Allow users to mark books as "Currently Reading", "Finished", or "Want to Read".
    - [ ] Last Read Page: Store the last read page for each book for each user.
    - [ ] Reading History: Keep a history of books read with timestamps.

- [ ] Recommendations:
    Provide book recommendations based on users reading history and preferences.
    - [ ] Similar Books: Suggest books similar to the ones users have read.
    - [ ] Popular Books: Recommend books that are highly rated or frequently read by other users.

- [ ] API Rate Limiting and Security:
    Ensure your API is secure and can handle high traffic.
    - [ ] Rate Limiting: Limit the number of requests a user can make in a certain timeframe.
    - [ ] Input Sanitization: Sanitize all inputs to prevent SQL injection and other attacks.
    - [ ] HTTPS: Serve your API over HTTPS for secure communication.

- [x] Data Validation with express-validator