# STEP-04_Notes
DAN-IT. Full Stack course. Module 04. Ajax, Bootstrap 4, Node.js, MongoDB. STEP PROJECT 04 - Notes. 


Technology Stack:
- Styles: Bootstrap 4;
- HTML views: Pug;
- JS: Ajax - fetch, async;
- Node.js. Modules: Express, Router, Pug, MongoDB, Body-parser, Cors, Nodemon, Dotenv; 
- Database MongoDB: mlab/MongoDB Cloud;
- Deployment: Heroku server.


Contributors:
Julia Verchyonova & Oleksandr Shaporda & Oleksandr Savchenko


Tasks & Responsibilities:


Julia Verchyonova:

- Basic architecture of the project and app, frontend and backend;
- Backend modules deployment;
- Backend template for HTML (pug), common layout and main page;
- Routes for main page;
- GetHub management and Heroku deployment;
- Readme.md.


Olexandr Savchenko:

- Backend tempate for HTML (pug):
  - /lists :        form to create new list-note;
  - /lists/:{id} :  detailed view of particular list-note in edit mode.
- Backend routes and frontend fetch requests for: 
  - GET /lists;
  - GET /lists/${id};
  - GET /api/lists/${id};
  - POST /api/lists;
  - PUT /api/lists/${id};
  - DELETE /api/lists/${id};
  - routes for image uploads.
  

Olexandr Shaporda:

- Backend tempate for HTML (pug):
  - /notes :        form to create new regular-note;
  - /notes/:{id} :  detailed view of particular regular-note in edit mode.
- Backend routes and frontend fetch requests for: 
  - GET /notes;
  - GET /notes/${id};
  - GET /api/notes/${id};
  - POST /api/notes;
  - PUT /api/notes/${id};
  - DELETE /api/notes/${id}.


Web Preview link: https://step-04-notes.herokuapp.com/
