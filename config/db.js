// config/db.js
// темплейт для создания объекта с базой
;

module.exports = {
    url : "mongodb+srv://MolenHS:danit111@cluster0-uianu.mongodb.net/test?retryWrites=true&w=majority",
    database: 'project_database',
    collections: ['notes', 'lists']
  };

