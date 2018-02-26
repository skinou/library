var express = require('express');
var router = express.Router();
var Book = require('../db/book');

// var blobToBase64=function(blob, callback) {
//     var a = new FileReader();
//     a.onload = function(e) {
//         callback(e.target.result);
//     }
//     a.readAsDataURL(blob);
// };


router.get('/', function(req, res, next) {
    var book = new Book();
    book.all(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result.length === 1 ? result[0]:result);
    });
});

router.get('/book_literature', function(req, res, next) {
    var book = new Book();
    book.book_literature(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/book_nature', function(req, res, next) {
    var book = new Book();
    book.book_nature(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/book_novel', function(req, res, next) {
    var book = new Book();
    book.book_novel(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/book_science', function(req, res, next) {
    var book = new Book();
    book.book_science(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/in', function(req, res, next) {
    var book = new Book();
    book.in(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/out', function(req, res, next) {
    var book = new Book();
    book.out(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});


router.get('/getImg', function(req, res, next) {
    var book = new Book();
    book.selectImg(function(err,result){
        if(err){
            console.log(err)
        }

        var imgData = new Buffer( result[0].img).toString();
        console.log(imgData);
        console.log(result[0].img);

        // blobToBase64(result, function(data) {
        //     // $('#successimg img').attr('src', data);
        //     console.log(data);
        // });
        res.send(imgData);
    });
});


router.get('/borrow', function(req, res, next) {
    var book = new Book();
    book.borrow(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.send(result);
    });
});

router.post('/insert', function(req, res, next) {
    console.log(req.body.name)
    console.log(req.body.author)
    console.log(req.body.value)
    console.log(req.body.item)
    var book = new Book();
    book.insert(req.body.name,req.body.author,req.body.value, req.body.item,function(err,result){
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.send('true')
        }
    });
});

router.post('/insert_borrow', function(req, res, next) {
    console.log(req.body.name)
    console.log(req.body.reader)
    console.log(req.body.time)
    console.log(req.body.value)
    var book = new Book();
    book.insert_borrow(req.body.name,req.body.reader,req.body.time, req.body.value,function(err,result){
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.send('true')
        }
    });


});

router.post('/delete', function(req, res, next) {
    console.log(req.body.name)
    var book = new Book();
    book.delete(req.body.name, function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);;
    });
});

router.post('/imgUpload', function(req, res, next) {
    console.log(req.body.data)
    // var base64Data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
    // console.log(base64Data)
    var book = new Book();
    book.insertImg(req.body.data,function(err,result){
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.send('true')
        }
    });
});

router.post('/content', function(req, res, next) {
    console.log(req.body.data)
    console.log(req.body.data.length)
    var arr = req.body.data.split('\n')
    console.log(arr)
    var book = new Book();
    book.insertText(req.body.data,function(err,result){
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.send('true')
        }
    });

});

router.get('/getText', function(req, res, next) {
    var book = new Book();
    book.selectText(function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result);
        var arr = result[0].textContent.split('\n')
        console.log(arr)
        res.send(result);
    });

});


module.exports = router;
