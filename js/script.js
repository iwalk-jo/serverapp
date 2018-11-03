var myApp = new Framework7({
    modalTitle: 'Android Advance ',
    material: true,
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {});


//bit.ly/serverformobileapp
myApp.onPageInit('inputdata', function(page) {
    $$("#submit").on("click", function() {
        var name = $$("#name").val();
        var phone = $$("#phone").val();
        var address = $$("#address").val();
        $$.post('http://localhost:8080/serverapp/serverside/insert_app.php', { x: name, y: phone, z: address }, function(response) {
            if (response == 1) {
                myApp.alert("Successfully Insert", function() {
                    mainView.router.loadPage('data.html');
                });
            } else {
                myApp.alert("Failed to Insert");
            }
        });
    });
});


//View data
myApp.onPageInit('data', function(page) {
    $$.getJSON('http://localhost:8080/serverapp/serverside/jsondata.php', { par: 'val' }, function(data) {
        $$.each(data, function(index, element) {
            $$("#datalist").append(
                '<li>' +
                '<a href="datadetail.html?id=' + element.id + '" class="item-link item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title"> ' + element.name + ' </div>' +
                '</div>' +
                '</a>' +
                '</li> '
            )
        });
    });
});




//Detail Data
myApp.onPageInit('datadetail', function(page) {

    //see detail
    $$.getJSON('http://localhost:8080/serverapp/serverside/jsondetail.php', { id: page.query.id }, function(data) {
        $$.each(data, function(index, element) {
            $$("#iddata").val(element.id);
            $$("#name").val(element.name);
            $$("#phone").val(element.phone);
            $$("#address").val(element.address);
        });
    });

    //delete data
    $$(".delete").on("click", function() {
        var iddata = $$("#iddata").val();
        $$.post('http://localhost:8080/serverapp/serverside/delete_app.php', { id: iddata }, function(response) {
            myApp.alert(response, function() {
                mainView.router.loadPage('data.html');
            });
        });
    });

    //edit data
    $$(".edit").on("click", function() {
        var iddata = $$("#iddata").val();
        var name = $$("#name").val();
        var phone = $$("#phone").val();
        var address = $$("#address").val();
        $$.post('http://localhost:8080/serverapp/serverside/edit_app.php', { id: iddata, x: name, y: phone, z: address }, function(response) {
            if (response == 1) {
                myApp.alert("Successfully update", function() {
                    mainView.router.loadPage('data.html');
                });
            } else {
                myApp.alert("Failed to edit");
            }
        });
    });

}); //End Data detail


myApp.onPageInit('login', function(page) {

    $$("#login").on("click", function() {

        var username = $$("#username").val();
        var password = $$("#password").val();

        $$.post('http://localhost:8080/serverapp/serverside/login.php', { x: username, y: password }, function(response) {

            if (response != 0) {
                //save to localstorage
                var db = window.openDatabase("login", "1.0", "Login", 10000);
                db.transaction(insertData, onError, onSuccess);

                function insertData(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS memberlogin (idmember INTEGER PRIMARY KEY, username VARCHAR, status VARCHAR)');

                    var username = $$("#username").val();
                    tx.executeSql('INSERT INTO memberlogin VALUES (null,"' + username + '", "' + response + '")');
                }

                function onSuccess() {
                    myApp.alert('Successfully Login', function() {
                        mainView.router.loadPage('index.html');
                    });
                }

                function onError(tx, err) {
                    alert("Error" + err);
                }
            } else {
                myApp.alert("Failed to Login");
            }

        });

    });

});


///// CEK LOGIN
/////HOw to open database : https://cordova.apache.org/docs/en/1.7.0/cordova/storage/storage.opendatabase.html
/////10000 : login time limit, or number of seconds to wait when trying to connect before
var db = window.openDatabase("login", "1.0", "Login", 10000);
db.transaction(queryData, onError);

function queryData(tx) {
    tx.executeSql('SELECT * FROM memberlogin', [], onSuccess, onError);
}

function onSuccess(tx, result) {
    var jml = result.rows.length;

    if (jml > 0) {
        //myApp.alert("Welcome");
        setTimeout(function() {
            mainView.router.loadPage('index.html');
        }, 2000);

    } else {
        //myApp.alert("Login");
        //setTimeout(function() {
        mainView.router.loadPage('login.html');
        //}, 2000);
    }
}

function onError(tx, err) {
    myApp.alert("Please Login");
    setTimeout(function() {
        mainView.router.loadPage('login.html');
    }, 2000);
}


$$(document).on('click', '#logout', function() {
    var db = window.openDatabase("login", "1.0", "Login", 10000);
    db.transaction(deleteDb, onError);

    function deleteDb(tx) {
        tx.executeSql('DELETE FROM memberlogin', [], onSuccess, onError);
    }

    function onSuccess(tx) {
        myApp.alert('Successfully Logout', function() {
            mainView.router.loadPage('login.html');
        });
    }

    function onError(tx, err) {
        alert("Error");
    }
});