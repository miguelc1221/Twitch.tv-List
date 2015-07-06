$(document).ready(function() {

    var streamers = ["freecodecamp", "nightblue3", "terakilobyte", "habathcx", "sing_sing", "pobelter", "goodguygarry", "imaqtpie", "noobs2ninjas", "beohoff", "medrybw"];
    var user = "https://api.twitch.tv/kraken/users/";
    var stream = "https://api.twitch.tv/kraken/streams/";
    var twitch = "http://www.twitch.tv/";
    var all = [];
    var online = [];
    var offline = [];

    //stream info
    $.each(streamers, function(i, ele) {
        $.ajax({
            url: stream + ele,
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(data) {
            if (data.stream === null) {
                offline.push(data);
            } else {
                online.push(data);
            }
            template();
        });
    }); //end of each

    //user info
    $.each(streamers, function(i, ele) {
        $.ajax({
            url: user + ele,
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(data) {
            all.push(data);
            template();
        });
    }); //end of each

    var template = function() {
        var streamHTML = '<ul class="collection">';
        for (var prop in all) {
            streamHTML += '<li class="collection-item avatar">';
            streamHTML += '<a href =' + twitch + all[prop].display_name + '>';
            if (all[prop].logo === null) {
                streamHTML += '<img src="http://isigned.org/images/anonymous.png" alt="Streamer Logo" class="circle">';
            } else {
                streamHTML += '<img src="' + all[prop].logo + '"alt="Streamer Logo" class="circle">';
            }
            streamHTML += '<span class="title">' + all[prop].display_name + '</span>';
            for (var proper in online) {
                if (all[prop].display_name === online[proper].stream.channel.display_name) {
                    if (online[proper].stream.channel.status.length > 30) {
                        streamHTML += '<p>' + online[proper].stream.channel.status.slice(0, 31) + "..." + '</p>';
                    } else {
                        streamHTML += '<p>' + online[proper].stream.channel.status + '</p>';
                    }
                    streamHTML += '<a href="#!" class="secondary-content"><i class="material-icons">tv</i></a>';
                }
            }
            streamHTML += '</a></li>';
        }
        streamHTML += '</ul>';
        $('main#prime').html(streamHTML);
        $('#all').css("color", "#64ffda");
    };

    //Search box
    $('#search').on('keyup', function(event) {
        $('#search').keydown(function(e){
            if(e.keyCode == 13){
                return false;
            }
        });
        var searchField = $('#search').val();
        var myExp = new RegExp(searchField, "i");
        var streamHTML = '<ul class="collection">';
        for (var prop in all) {
            var eachName = all[prop].display_name;
            if (eachName.search(myExp) != -1) {
                streamHTML += '<li class="collection-item avatar">';
                streamHTML += '<a href =' + twitch + all[prop].display_name + '>';
                if (all[prop].logo === null) {
                    streamHTML += '<img src="http://isigned.org/images/anonymous.png" alt="Streamer Logo" class="circle">';
                } else {
                    streamHTML += '<img src="' + all[prop].logo + '"alt="Streamer Logo" class="circle">';
                }
                streamHTML += '<span class="title">' + all[prop].display_name + '</span>';
                for (var proper in online) {
                    if (all[prop].display_name === online[proper].stream.channel.display_name) {
                        if (online[proper].stream.channel.status.length > 30) {
                            streamHTML += '<p>' + online[proper].stream.channel.status.slice(0, 31) + "..." + '</p>';
                        } else {
                            streamHTML += '<p>' + online[proper].stream.channel.status + '</p>';
                        }
                        streamHTML += '<a href="#!" class="secondary-content"><i class="material-icons">tv</i></a>';
                    }
                }
                streamHTML += '</a></li>';
            }
        }
        streamHTML += '</ul>';
        $('main#prime').html(streamHTML);
    });

    /// all button
    $('#all').on("click", function() {
        $(".btn, .btn-large").css("color", "white");
        $(this).css("color", "#64ffda");
        $('section ul').empty();
        $('main').removeClass('hide');
        template();
    });

    //online button
    $('#online').on("click", function() {
        $(".btn, .btn-large").css("color", "white");
        $(this).css("color", "#64ffda");
        var list = $('main#prime li');
        $("#all").css("color", "white");
        list.removeClass('hide');
        list.each(function(i, ele) {
            if (ele.children.length === 1) {
                $(this).addClass('hide');
            }
        });
    });

    //offline
    $('#offline').on("click", function() {
        $(".btn, .btn-large").css("color", "white");
        $(this).css("color", "#64ffda");
        var list = $('main#prime li');
        list.removeClass('hide');
        list.each(function(i, ele) {
            if (ele.children.length === 2) {
                $(this).addClass('hide');
            }
        });
    });

}); // of document
