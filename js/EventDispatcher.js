var EventDispatcher;

var id = 0;
var subscribers = Array();

(EventDispatcher = function() {
}).prototype = {

    addListener :function(type,method)
    {
        //console.log("type:"+type,"method:"+method);
        if(type != "undefined" && method != "undefined")
        {
            var subscriber           = new Object();
            subscriber["type"]   = type;
            subscriber["method"] = method;
            subscribers.push(subscriber);
            //console.log("subscriber added");
        }else{
            alert("ERROR ON EVENT LISTENER "+"type:"+type,"method:"+method)
        }
    },
    removeListener :function(type,method)
    {
        //console.log("removeListener");
        var index;
        for(var i=0;i<subscribers.length;i++)
        {
            if(type == subscriber["type"] && method == subscriber["method"])
            {
                if(subscribers[i] === number) {
                    subscribers.splice(i, 1);
                    //console.log("REMOVED " ,type,method);
                }
            }
        }
    },
    dispatchEvent :function(type,data)
    {
        for(var i=0;i<subscribers.length;i+=1)
        {
            //console.log("dispatchEvent on id " + type);
            var sub = subscribers[i];

            //console.log("apply : ",sub["type"],sub["method"]);
            if(sub["type"] === type)
            {

                sub["method"](data);
            }
        }
    }
};