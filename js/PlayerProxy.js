var PlayerProxy = function() {

    if(false === (this instanceof PlayerProxy)) {
        return new PlayerProxy();
    }



///////////////////////////////////////////////////////////
// PUBLIC VAR
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// PRIVATE VAR
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
// PUBLIC FUNCTION
///////////////////////////////////////////////////////////

    this.html5Player = null;
    this.flashPlayer = null;
    /*
    if(hasHPlayer)
    {
        hPlayer.somethitng();
    }else if(hasFPlayer)
    {
        hasFPlayer.somethitng();
    }else{
        console.log("missing player instances");

    }
*/
    this.initialize = function()
    {

    };
    this.play = function()
    {
        if(this.html5Player != null)
        {
            this.html5Player.play();
        }
        if(this.flashPlayer != null)
        {
            this.flashPlayer.play();
        }

    }
    this.pause = function()
    {
        if(this.html5Player != null)
        {
            this.html5Player.pause();
        }
        if(this.flashPlayer != null)
        {
            this.flashPlayer.pause();
        }

    }

    this.volume = function(volume)
    {
        if(this.html5Player != null)
        {
            this.html5Player.volume = volume;
        }
        if(this.flashPlayer != null)
        {
            this.flashPlayer.setVolume(volume);
        }

    }

    this.setSource = function(source)
    {
        if(this.html5Player != null)
        {
            this.html5Player.setAttribute("src",source);
        }
        if(this.flashPlayer != null)
        {
            this.flashPlayer.setSource(source);
        }





    }


///////////////////////////////////////////////////////////
// PRIVATE FUNCTION
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// GETTER  & SETTER
///////////////////////////////////////////////////////////


};
