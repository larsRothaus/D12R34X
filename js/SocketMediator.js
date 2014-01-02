var window;
var document;

(function(window,document){
    window      = window;
    document    = document;
}(document, window));

SocketMediator = function(){

    var self = this;
    /* SocketMediator */

    /** PUBLIC **/


    /** PRIVATE **/
    var isConnection = false;
    var messages = [];
    var socket;

    /** STATIC **/



    function SocketMediator()
    {
        injecter();
        initSocket();

    }

    function injecter()
    {

    }
    function initSocket()
    {
        socket = io.connect("http://10.44.10.236:3700");
        socket.on('message', onMessage);
    }


    function onMessage(data) {

        if(data)
        {
            console.log("Gotdata");
            console.log(data);
            SocketMediator.dispatchEvent(SocketMediator.EVENT_SOCKET_CONNECTED);
        }
    }



    /** EXECUTER **/
    SocketMediator();
};



/*
 SocketMediator.prototype.initialize = function(socketURL)
 {
 if(socketURL != "")
 {
 alert("SocketMediator init");
 socket = io.connect();
 }else{
 alert("missing socketURL");
 }
 }
 */
/*socket.on('message', function (data) {

 alert("socket.on init");
 if(!isConnection)
 {
 isConnection = true;
 SocketMediator.dispatchEvent(SocketMediator.EVENT_SOCKET_CONNECTED);
 }

 if(data.message) {
 messages.push(data.message);
 var html = '';
 for(var i=0; i<messages.length; i++) {
 html += messages[i] + '<br />';
 }
 content.innerHTML = html;

 if(data.message == "show")
 {
 //content.innerHTML = "SHOW";
 //$("#fuu").css( { marginLeft : "0px"} );

 TweenLite.to(content, 1, {marginLeft:"0px", ease:Expo.easeOut});

 }else if(data.message == "hide")
 {
 //$("#fuu").css( { marginLeft : "-300px"} );
 TweenLite.to(content, 1, {marginLeft:"-300px", ease:Expo.easeOut});
 //content.innerHTML = "HIDE";
 }

 if(data.message == "play")
 {
 if(player)
 {
 player.play();
 }

 }else if(data.message == "pause")
 {
 if(player)
 {
 player.pause();
 }
 }

 } else {
 console.log("There is a problem:", data);
 }
 });
 */