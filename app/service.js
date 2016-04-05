/**
 * Created by toddshelton on 2/23/16.
 */

var Service = (function (){

    var _dbURL = "https://api.mongolab.com/api/1/databases/dw-speaker-site/collections/Speakers?";
    var _apiKey = "apiKey=58cu-2QldVymMLNkPGww5JcERbEaotNr";
    var _queryDB = 'q={"email": "todd@todd.com"}&fo=true&';
    var _userData = {};
    //this is just a check for testing.
    var _loginUser = function(username, callback){

        //var deferred = $q.defer();

        $.ajax({
            url: _dbURL + 'q={"email": "' + username + '"}&fo=true&' + _apiKey,
            type: "GET",
            contentType: "application/json"
        }).done(function (data) {
           console.log('data ', data);
            callback(data);
            //return deferred.resolve(data);
        });


    };

    var _checkUser = function (email, checkUserCallback) {
        $.ajax({
            url: _dbURL + 'q={"email": "' + email + '"}&fo=false&c=true&' + _apiKey,
            type: "GET",
            contentType: "application/json"
        }).done(function (data) {
            var flag = false;
            console.log('data ', data);

            if(data == 0){
                flag = false;
            } else
            {
                flag = true
            }
            checkUserCallback(flag);
            //callback(data);
            //return deferred.resolve(data);
        });
    };

    var _addUser = function(firstName, lastName, emailAddress, psword, callback){
        var obj = {
            "f_name": firstName,
            "l_name": lastName,
            "email": emailAddress,
            "password": psword,
            "role": "user"
        };

        _checkUser(emailAddress, function(flag, result){
            if(flag) {

            } else {
                $.ajax({
                    url: _dbURL + _apiKey,
                    type: "POST",
                    data: JSON.stringify(obj),
                    contentType: "application/json"
                    }).done(function (data) {
                     _userData = data;
                 });
            }

            callback(flag);
        });


    };

    return {
        loginUser: _loginUser,
        addUser: _addUser
    }


})();