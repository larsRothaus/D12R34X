// assembly name
var PresenterEvents = PresenterEvents || {};

// constructor
PresenterEvents.SimplyClient = function (clientHelper) {
    // private members
    this.videoH5 = document.getElementById("VideoPlayer1"),
        this.serverTime = 0;
    this.serviceEvent = {};
    this.presentationTime = 0;
    this.delayTime = 0;
    this.videoState = 'pause';
    this.receivedTimestamp = false;
    this.flag = true;
    this.countingTimer = null;
    this.guiTimer = null;
    this.presentationAndroidTimer = null;
    this.clientLoop = null;
    this.clientHelper = clientHelper;

    // qbrick demo 17.12.2013
    this.mainVideo = document.getElementById("mainvideo");
    this.coffee = document.getElementById("coffee");
    this.commercial = document.getElementById("commercial");
    this.volume = 1;
    this.voteId = 0;
    this.votionQuestion = '';
    this.isStarted = false;
};

PresenterEvents.SimplyClient.prototype = function () {
    // private functions
    var htmlEncode = function (value) {
            if (value == null) return '';
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }

        , toHhmmss = function (secNum) {
            var hours = Math.floor(secNum / 3600);
            var minutes = Math.floor((secNum - (hours * 3600)) / 60);
            var seconds = secNum - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        , onMessage = function (event) {
            var recArray = null;

            if (event.data.indexOf('time:') > -1) {
                recArray = event.data.split(':');
                if (recArray && recArray.length > 1) {
                    this.presentationTime = parseInt(recArray[1]);
                    $('#currentPresentationTime').html(toHhmmss(this.presentationTime));
                    $('#currentPresentationTimeSeconds').html(this.presentationTime);
                    if (!this.receivedTimestamp) {
                        this.receivedTimestamp = true;
                    }
                }
            } else if (event.data.indexOf('playbackEvent:') > -1) {
                recArray = event.data.split(':');
                if (recArray && recArray.length > 1) {
                    if (recArray[1] === 'play') this.videoState = 'play';
                    else if (recArray[1] === 'pause') this.videoState = 'pause';
                    else if (recArray[1] === 'stalled') this.videoState = 'stalled';
                }
                $('#discussion').append('<li>' + event.data + '</li>');
            }
        }

        , startCountingServerTime = function (thisObj) {
            thisObj.serverTime++;
        }

        , startUpdatingGuiTime = function (thisObj) {
            $('#currentTime').html(toHhmmss(thisObj.serverTime));
            $('#currentTimeSeconds').html(thisObj.serverTime);

            if (thisObj.videoH5) {
                if (thisObj.videoH5.currentTime && thisObj.videoH5.paused == false) {
                    if (!thisObj.delayTime) {
                        thisObj.delayTime = 39;
                        thisObj.presentationTime = thisObj.serverTime - thisObj.delayTime;
                        thisObj.presentationAndroidTimer = setInterval(function () { startCountingPresentationTimeOnAndroid(thisObj) }, 1000);
                    }
                    $('#currentPresentationTime').html(toHhmmss(presentationTime));
                    $('#currentPresentationTimeSeconds').html(presentationTime);
                }
            }
        }

        , startCountingPresentationTimeOnAndroid = function (thisObj) {
            thisObj.presentationTime++;
        }

        , startClientMessageLoop = function () {
            var thisObj = this;
            thisObj.clientHelper.getNotifyObject().on("presenterEvents", function (e, paramObj) {
                if (paramObj.name === 'onReceivedNewEvents') {
                    clientMessageLoop.call(thisObj, paramObj.data);
                    $('#discussion').append('<li><strong>event presenterEvents'
                        + '</strong>: ' + paramObj.name + ' '
                        + paramObj.data + '</li>');
                } else if (paramObj.name === 'onConnectionStateChanged') {
                    $('#discussion').append('<li><strong>event presenterEvents'
                        + '</strong>: ' + paramObj.name + ' '
                        + paramObj.data + '</li>');
                } else if (paramObj.name === 'onError') {
                    $('#discussion').append('<li><strong>event presenterEvents'
                        + '</strong>: ' + paramObj.name + ' '
                        + paramObj.data + '</li>');
                }
            });
            //this.clientLoop = setInterval(function () { clientMessageLoop(thisObj) }, 1000);
        }

        , clientMessageLoop = function (messageQueue) {
            //var messageQueue = thisObj.clientHelper.getEvents(thisObj.presentationTime);
            //var messageQueue = this.clientHelper.getNewEvents();

            while (messageQueue && messageQueue.length > 0) {
                var serviceEventTmp = messageQueue[0];

                if (serviceEventTmp && serviceEventTmp.EventTime != null) {
                    switch (serviceEventTmp.EventName) {
                        case 'coffe':
                            if (serviceEventTmp.EventData === 'on') {
                                showCoffeeBreak.call(this)
                            } else if (serviceEventTmp.EventData == 'off') {
                                hideCoffeeBreak.call(this);
                            }
                            break;
                        case 'commercial':
                            if (serviceEventTmp.EventData === 'on') {
                                showCommercial.call(this);
                            } else if (serviceEventTmp.EventData == 'off') {
                                hideCommercial.call(this);
                            }
                            break;
                        case 'notify':
                            parseNotification.call(this, serviceEventTmp.EventData);
                            break;
                        case 'voting':
                            parseVotation.call(this, serviceEventTmp.EventData, serviceEventTmp.EventId);
                            break;
                        case 'demo':
                            if (serviceEventTmp.EventData === 'on') {
                                this.isStarted = true;
                                startDemo.call(this, 0.9);
                            } else if (serviceEventTmp.EventData == 'off') {
                                this.isStarted = false;
                                endDemo.call(this);
                            }
                            break;
                        case 'votingResults':
                            showChart.call(this, serviceEventTmp.EventData)
                        default:
                            break;
                    }
                    messageQueue.shift();
                }
            }
        }

    // Qbrick demo 17.12.2013
        , hidePlayer = function () {
            //volume = Qbrick.Publisher.widgets('qbrick_professional_qbrick1').volume();
            Qbrick.Publisher.widgets('qbrick_professional_qbrick1').volume(0);
            this.mainVideo.style.zIndex = 1;
        }

        , showPlayer = function () {
            this.mainVideo.style.zIndex = 2;
            Qbrick.Publisher.widgets('qbrick_professional_qbrick1').volume(this.volume);
        }

        , showCoffeeBreak = function () {
            hidePlayer.call(this);
            this.coffee.style.zIndex = 2;
        }

        , hideCoffeeBreak = function () {
            this.coffee.style.zIndex = 1;
            showPlayer.call(this);
        }

        , showCommercial = function () {
            hidePlayer.call(this);
            this.commercial.style.zIndex = 2;
            Qbrick.Publisher.widgets('qbrick_professional_qbrick2').play();
        }

        , hideCommercial = function () {
            Qbrick.Publisher.widgets('qbrick_professional_qbrick2').position(0.01);
            Qbrick.Publisher.widgets('qbrick_professional_qbrick2').pause();
            this.commercial.style.zIndex = 1;
            showPlayer.call(this);
        }

        , parseNotification = function (eventData) {
            var eveArray = eventData.split(':');
            if (eveArray && eveArray.length > 1) {
                displayNotification.call(this, eveArray[0], eveArray[1]);
            }
        }

        , displayNotification = function (note, time) {
            document.getElementById("noteContainer").innerHTML = note;
            if (Number(time) !== -1)
                setTimeout(function () { displayNotification('', -1) }, time * 1000);
        }

        , parseVotation = function (eventData, eventId) {
            var eveArray = eventData.split('|');
            if (eveArray && eveArray.length > 1) {
                var altArray = eveArray[1].split(':');
                if (altArray && altArray.length > 0) {
                    votation.call(this, eveArray[0], altArray, eventId);
                }
            }
        }

        , votingDone = function (votingId, selectedAlt) {
            document.getElementById(votingId).innerHTML = '<h3 style="color:black">You voted <span style="color:green">'
                + selectedAlt + '</span></h3>Result will show up shortly...';
            var varray = votingId.split(':');
            if (varray && varray.length > 1) {
                var eventId = varray[1];
                sendMetadata.call(this, eventId, selectedAlt);
            }
        }

        , votation = function (question, alternatives, id) {
            $('#votations').css('display', 'block');
            $('#chartContainer').css('display', 'none');

            this.votionQuestion = question;
            var vId = 'voting:' + id;

            var blob = '<div id="' + vId + '"><h3>' + question + '</h3>';
            for (alternative in alternatives) {
                blob += '<input type="button" onClick="simplyClient.votingDone(\'' + vId + '\', \'' + alternatives[alternative] + '\')" value="'
                    + alternatives[alternative] + '"/>';
            }
            blob += '</div>';

            document.getElementById("votations").innerHTML = blob;
        }

        , startDemo = function (opacity) {
            var thisObj = this;
            if (thisObj.isStarted) {
                document.getElementById('pre-roll').style.opacity = opacity;
                $('#questionArea').css('visibility', 'visible');
                $('#votations').css('visibility', 'visible');
                showPlayer.call(thisObj);
                if (opacity <= 0) {
                    document.getElementById('pre-roll').style.zIndex = 0;
                    document.getElementById('pre-roll').style.opacity = 1;
                    Qbrick.Publisher.widgets('qbrick_professional_qbrick1').play();
                }
                else {
                    setTimeout(function () { startDemo.call(thisObj, opacity - 0.1) }, 100);
                }
            }
        }

        , endDemo = function () {
            document.getElementById('beforeDemo').style.display = "none";
            document.getElementById('afterDemo').style.display = "inherit";
            document.getElementById('pre-roll').style.zIndex=100;
            Qbrick.Publisher.widgets('qbrick_professional_qbrick1').pause();
            $('#questionArea').css('visibility', 'hidden');
            $('#votations').css('visibility', 'hidden');
            $('#chartContainer').css('display', 'none');
        }

        , showChart = function (chartData) {
            $('#votations').css('display', 'none');
            $('#chartContainer').css('display', 'block');
            var jData = eval(chartData);
            $('#chartContainer').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.votingQuestion
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        'Answers'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of responses'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: jData
            });
        }

        , sendMetadata = function (eventType, data) {
            this.clientHelper.sendMetadata(eventType, data);
        }

        , sendEvent = function (eventType, data) {
            this.clientHelper.sendEvent(eventType, data);
        };

    // public functions
    return {
        startClientMessageLoop: startClientMessageLoop,
        onMessage: onMessage,
        votingDone: votingDone,
        sendEvent: sendEvent
    };
}();



