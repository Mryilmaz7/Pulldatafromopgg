const cheerio = require("cheerio");
var request = require('request');
var rq =require('request-promise');
const Discord=require("discord.js");
const client=new Discord.Client();

// Bot TOKEN
client.login("*");


async function start() {

    while (true) {
        var lastlist;
        var lasttime;
        console.log(lastlist);
        console.log(lasttime);

        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'https://tr.op.gg/summoner/ajax/renew.json/',
            //summonerId here
            body:    "summonerId=*"

        }, function(error, response, body){
            console.log(body);
        });

        await new Promise(resolve => setTimeout(resolve, 10000));
        // opGG Summoner Link HERE
        var url = '*'
        rq(url).then((html) => {
            var $ = cheerio.load(html);
            var list = $(".GameItemList").find(".GameResult").first().text();
            var time = $(".GameItemList").find(".GameLength").first().text();

            if(lasttime==undefined){

                lasttime=time.trim();
                lastlist=list.trim();
            }
            else if(lastlist==list.trim() && lasttime==time.trim() ){

                lastlist = list.trim();
                lasttime = time.trim();
            }
            else if ( list.trim() == "Victory" && lastlist != list && lasttime != time){
                lastlist = list.trim();
                lasttime = time.trim();
            }
            else {

                //channel ID HERE
                const channel= client.channels.cache.get('*');


                // Tag the user ID HERE
                channel.send(`https://tenor.com/view/laughing-chimp-giggle-silly-haha-gif-12637844  <@*>`);
                lastlist = list.trim();
                lasttime = time.trim();
                console.log(list);
                console.log(time);

            }

        })
        await new Promise(resolve => setTimeout(resolve, 900000));
    }

}

 start();