const db = require('../../config/dbConfig');

module.exports = {
    createUser: (data, callBack) => {
        db.query (
            'insert into registration(username, email, password) values(?,?,?)',
            [
                data.username,
                data.email,
                data.password
            ], 
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        db.query (
            'select id,username,email from registration',
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        db.query (
            'select id,username,email from registration where id = ?',
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        db.query (
            'update registration set username=?, password=?, email=? where id = ?',
            [
                data.username,
                data.password,
                data.email,
                data.id
            ], 
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (id, callBack) => {
        db.query (
            'delete from registration where id = ?',
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        db.query (
            'select * from registration where email = ?',
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};