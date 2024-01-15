# Personal blog page

Developed as part of my web development coursework, this blog application allows users to manage articles: adding, modifying, and deleting—via an admin interface post-login. 
The UI is simple yet modern, with responsive design as a key focus. Articles are paginated and can be filtered by their titles for a straightforward user experience.

## Used technologies

### Backend:
- Express
- Bcrypt.js
- JWT (jsonwebtoken)
- Mongoose (for intreacting with MongoDB)
- Other dependencies:
    - cookie-parser (reading cookies coming from a client)
    - multer (image saving)
    - cors
    - express-async-handler
    - dotenv (env vars)

### Frontend:
- Next.js
- TailwindCSS
- Other dependencies:
    - react-icons
    - use-debounce

## Features
- simple yet modern UI with responsive design
- project optimized for SEO thanks to Next.js
- login/register endpoints with encrypted passwords and token as authentication method
- adding/updating/removing articles from built in admin interface
- usage of static fetching with path revalidation (Next.js)
- article search and pagination using `searchParams`
- storing images uploaded by the author on hard drive
- working contact form
- search optimizations using debouncing (in order to limit number of request to the server)

## Getting started
1. Create `.env` files in both backend and frontend dir and fill them in using provided `.env.example` files
2. Install required dependencies in both (backend and frontend) directories using your favourite package manager:
```sh
npm install
```
3. Run Express server (in backend dir) using `dev` script from `package.json`:
```sh
npm run dev
```
4. Build production version of the frontend using (in frontend dir):
```sh
npm run build
```
5. Run production build of the frontent:
```sh
npm run start
```

## Licence 
This project is licensed under the AGPL3 License - see the LICENSE.md file for details
