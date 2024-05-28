const Sequelize = require('sequelize');
const fs = require('fs');
const sequelize = new Sequelize('expo_books', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+8:00', 
    define: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    dialectOptions: { 
        dateStrings: true,
        typeCast(field, next) {
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        }
    }
})
fs.readdir(__dirname, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach(file => {
        if (file.indexOf('index') == -1) {
            require(`./${file}`)(sequelize);
        }
    });
    sequelize.sync().then(() => {
        
    }).catch((err) => {
        console.log("err = ", err)
    });
});

module.exports = sequelize;