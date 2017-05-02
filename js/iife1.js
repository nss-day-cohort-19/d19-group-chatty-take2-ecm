console.log("iife1");


var Chatty = (function(chatapp){

    var messagesArray = [];
    var newJSON = [];
    var newJSON2 = [];
    var datesArray = [];
    var usersArray = [];

    chatapp.xhrfunction = function (){
        var loadMessages = new XMLHttpRequest();
        var loadMessages2 = new XMLHttpRequest();
        loadMessages.open("GET", "startMessages.JSON");
        loadMessages2.open("GET", "startMessages2.JSON")
        loadMessages.send();
        loadMessages.addEventListener("load", function(event){
            loadMessages2.send();
        newJSON = JSON.parse(event.target.responseText).messages;
        for (var i=0; i< newJSON.length;i++){
            messagesArray.push(newJSON[i].text);
            datesArray.push(Chatty.setDate());
            usersArray.push(newJSON[i].user);
        }

        });
        loadMessages2.addEventListener("load", function(event) {
            newJSON2 = JSON.parse(event.target.responseText).messages;
            for (var i=0; i< newJSON.length;i++){
                messagesArray.push(newJSON2[i].text);
                datesArray.push(Chatty.setDate());
                usersArray.push(newJSON2[i].user);
            }
            Chatty.enterKeyPress();
            Chatty.writeToDom()
            Chatty.defaultListeners();
        });

    }


    //To get array - run Chatty.getMessages();
    chatapp.getMessages = function(){
        return messagesArray;
    };

    chatapp.getDate = function(){
        return datesArray;
    }

    chatapp.getUsers = function() {
        return usersArray;
    }

    chatapp.addMessages = function(message, user){
        messagesArray.push(message);
        usersArray.push(user);
        datesArray.push(Chatty.setDate())
        chatapp.messageLimit();

    }


    chatapp.deleteAllMessages = function() {
        messagesArray = [];
        datesArray = [];
        usersArray = [];
    }

    chatapp.deleteMessages = function(message, date, user){
        var indexMessage = messagesArray.indexOf(message);
        var indexDate = datesArray.indexOf(date);
        var indexUser = usersArray.indexOf(user);
        messagesArray.splice(indexMessage, 1);
        datesArray.splice(indexDate,1);
        usersArray.splice(indexUser, 1);
        console.log("messagesArray after splice", messagesArray);
        Chatty.writeToDom();
    }

    return chatapp;

})(Chatty || {});




