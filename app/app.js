/**
 * Created by toddshelton on 2/9/16.
 */

//this will add click events to buttons that we put inside this function
function setBindings() {
    //this is a boolean for when the menu is displayed.
    var menuDisplayed = false;

    //this is the click listener for the menu to display
    $(".logo").click(function(e){
       if(menuDisplayed){
           $(".content-wrapper").animate({
               left: "0"
           }, 500, function(){
               menuDisplayed = false;
           });
       }else{
           $(".content-wrapper").animate({
               left: "20%"
           }, 500, function(){
                menuDisplayed = true;
           });
       }
    });

    $(".guide").click(function(){
        $(".guide").css("display", "none");
    });

    //this is for when the user logs in
    $(".login").click(function(){
        $(".signUpModal").css("display", "flex");
    });

    $(".close-modal").click(function(e){
        var currentModal = this.parentElement.parentElement.className;

        //$(".signUpModal").css("display", "none");
        $("." + currentModal).css("display", "none");
    });

    $(".submit").click(function(e){
        e.preventDefault();
        var un = $("#username").val();
        var pw = $("#password").val();

        if(pw != "" && un != ""){
            var isEmailValid = validateEmail(un);
            if(isEmailValid == true){
                //TODO:need to make a callback on the service
                Service.loginUser(un, function(result){
                    console.log("result ", result);
                });

                //now we make a call to database and check to see if they are a user
                $(".signUpModal").css("display", "none");
                $(".login .log").html("Log Out");

            }else{
                alert(isEmailValid);
            }
        }else {
            alert("you must fill out both input boxes");
        }

    });

    $(".signup").click(function(){
        $(".regModal").css("display", "flex");

    });

    $(".signupSubmit").click(function(e){
        e.preventDefault();
        var fName = $('#firstName').val(),
            lName = $('#lastName').val(),
            email = $('#email').val(),
            pWordOne = $('#signUpPassword').val(),
            pWordTwo = $('#signUpPasswordAgain').val();

            var pOneLength = pWordOne.length;
            var pTwoLength = pWordTwo.length;
        if(fName == ""){
            $('.fNameError').html("You must enter a first name");
            $('.fNameError').css("visibility", "visible");

        }else if(lName == ""){
            $('.fNameError').css("visibility", "hidden");

            $('.lNameError').html("You must enter a last name");
            $('.lNameError').css("visibility", "visible");
        }else if(validateEmail(email) == false){
            $('.fNameError').css("visibility", "hidden");
            $('.lNameError').css("visibility", "hidden");

            $('.emailError').html("You Must have a valid email");
            $('.emailError').css("visibility", "visible");
        }else if(pOneLength < 8){
            $('.fNameError').css("visibility", "hidden");
            $('.lNameError').css("visibility", "hidden");
            $('.emailError').css("visibility", "hidden");

            $('.pOneError').html("Minimum of 8 Characters");
            $('.pOneError').css("visibility", "visible");
        }else if(pTwoLength < 8){
            $('.fNameError').css("visibility", "hidden");
            $('.lNameError').css("visibility", "hidden");
            $('.emailError').css("visibility", "hidden");
            $('.pOneError').css("visibility", "hidden");

            $('.pOneError').css("visibility", "hidden");
            $('.pTwoError').html("Minimum of 8 Characters");
            $('.pTwoError').css("visibility", "visible");
        }else if(pWordOne !== pWordTwo){
            $('.fNameError').css("visibility", "hidden");
            $('.lNameError').css("visibility", "hidden");
            $('.emailError').css("visibility", "hidden");
            $('.pOneError').css("visibility", "hidden");
            $('.pTwoError').css("visibility", "hidden");

            $('.pOneError').html("Passwords Must Match");
            $('.pOneError').css("visibility", "visible");

            $('.pTwoError').html("Passwords Must Match");
            $('.pTwoError').css("visibility", "visible");
        }else{
            $('.fNameError').css("visibility", "hidden");
            $('.lNameError').css("visibility", "hidden");
            $('.emailError').css("visibility", "hidden");
            $('.pOneError').css("visibility", "hidden");
            $('.pTwoError').css("visibility", "hidden");

            $('.regForm input').val('');
            $('.signupSubmit').val("Submit");

            Service.addUser(fName, lName, email, pWordOne, function(flag){
                if(flag) {
                    sweetAlert("Oops... The email you used is already registered");
                }
                else {
                    swal({
                          title: "Good job!",
                          text: "You clicked the button"},
                        function()
                        {
                            //var name =
                        }
                    );
                }
                $(".regModal").css("display", "none");
            });

        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function(){

    setBindings();
});