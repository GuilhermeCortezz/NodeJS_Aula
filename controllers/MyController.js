const { sequelize } = require('../config/database');
const bookModel = require('../models/books')(sequelize);



exports.showForm = (req, res) => {
    res.render("form", { layout: false });
}