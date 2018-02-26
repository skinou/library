var db = require('./database');

var Book = function() {};

Book.prototype.find = function(id, callback) {
    var sql = "SELECT * FROM user_tb WHERE id =?";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });

        connection.release();
    });
};

Book.prototype.all = function(callback) {
    var sql = "SELECT * FROM book";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
        });

        connection.release();
    });
};

Book.prototype.borrow = function(callback) {
    var sql = "SELECT * FROM borrow";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
        });

        connection.release();

    });
};

Book.prototype.book_literature = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.item = '文学'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};

Book.prototype.book_nature = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.item = '自然'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};

Book.prototype.book_novel = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.item = '小说'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};

Book.prototype.book_science = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.item = '科学'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};

Book.prototype.in = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.state = '在库'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};

Book.prototype.out = function(callback) {
    var sql = "SELECT * FROM `table`.book where book.state = '外借'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, JSON.parse(JSON.stringify(results)));
            console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });

};

Book.prototype.insert = function(name,author,state,item,callback) {
    var sql = "insert into `table`.book (name,author,state,item) values (?,?,?,?)";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            return;
        }
        // make the query
        connection.query(sql,[name,author,state,item],function(err, results) {
            if (err) {
                callback('false');
            } else {
                callback('true');
            }
        });

        connection.release();

    });
};

Book.prototype.insert_borrow = function(name,reader,time,returned,callback) {
    var sql = "insert into `table`.borrow (name,reader,time,returned) values (?,?,?,?)";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            return;
        }
        // make the query
        connection.query(sql,[name,reader,time,returned],function(err, results) {
            if (err) {
                callback('false');
            } else {
                callback('true');
            }
        });

        connection.release();
    });
};

Book.prototype.delete = function(name,callback) {
    var sql = "DELETE FROM `table`.book WHERE name = ? ";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,[name],function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            console.log(results)
        });

        connection.release();
    });
};


Book.prototype.insertImg = function(image,callback) {
    var sql = "insert into `table`.img (id,img) values (null,?)";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            return;
        }
        // make the query
        connection.query(sql,[image],function(err, results) {
            if (err) {
                callback('false');
            } else {
                callback('true');
            }
        });

        connection.release();

    });
};

Book.prototype.selectImg = function(callback) {
    var sql = "SELECT * FROM `table`.img where img.id = '1'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
            // console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};


Book.prototype.insertText = function(textContent,callback) {
    var sql = "insert into `table`.texttable (id,textContent) values (null,?)";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            return;
        }
        // make the query
        connection.query(sql,[textContent],function(err, results) {
            if (err) {
                callback('false');
            } else {
                callback('true');
            }
        });

        connection.release();

    });
};



Book.prototype.selectText = function(callback) {
    var sql = "SELECT * FROM `table`.texttable where texttable.id = '1'"
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
            // console.log(JSON.parse(JSON.stringify(results)))
        });

        connection.release();
    });
};


module.exports = Book;