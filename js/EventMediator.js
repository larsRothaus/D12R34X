var EventMediator = function() {

    if(false === (this instanceof EventMediator)) {
        return new EventMediator();
    }

///////////////////////////////////////////////////////////
// PUBLIC VAR
///////////////////////////////////////////////////////////
    var eventDispatcher = new EventDispatcher();
    var isConnection = false;

    var messages = [];
    var socket;
    var delay = 0;

///////////////////////////////////////////////////////////
// PRIVATE VAR
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// PUBLIC FUNCTION
///////////////////////////////////////////////////////////
    var initialize = function() {

        initSocket();
        console.log("initSocket");
    };

///////////////////////////////////////////////////////////
// PRIVATE FUNCTION
///////////////////////////////////////////////////////////
    function initSocket()
    {
        var clientHelper = new PresenterEvents.ClientHelper(presentationUniqueId);
        clientHelper.init();


        clientHelper.getNotifyObject().on("presenterEvents", function (e, paramObj)
        {
            if (paramObj.name === 'onReceivedNewEvents')
            {

                console.log("/////////////////////////////////////////////////////");
                console.log(paramObj.data[0].EventName);
                console.log(paramObj.data[0].EventData);
                console.log("/////////////////////////////////////////////////////");
                onData(paramObj.data[0]);
            } else if (paramObj.name === 'onConnectionStateChanged')
            {

            } else if (paramObj.name === 'onError')
            {

            }

            //returnValue

        });
    }
    function onData(data)
    {

        if(data.EventName == "boxControl")
        {
            dispatch(Events.BOX_EVENT,data);
        }
        if(data.type == "playerControl")
        {
            dispatch(Events.PLAYER_EVENT,data);
        }
        isConnection = true;
    }

    function dispatch(evnet,data)
    {
        if(delay > -1 && isConnection)
        {
            setTimeout(fire,delay);
        }else{
            fire();
        }


        function fire()
        {
            console.log("FIRE");
            eventDispatcher.dispatchEvent(evnet,data);
        }
    }

///////////////////////////////////////////////////////////
// GETTER  & SETTER
///////////////////////////////////////////////////////////

    function setDelay(delayNum)
    {
        if(delayNum > -1 && delayNum != null && delayNum != "")
        {
            delay = delayNum;
        }

    }

    return {
        initialize: initialize,
        eventDispatcher: eventDispatcher,
        setDelay: setDelay

    };
};


/*
* events.fireEvent(Events.SOCKET_DATA);
* */