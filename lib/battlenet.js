var client = (function() {
  var http = require("scoped-http-client");

  var scopedClient = function(url) {
    return http.create(url);
  }

  var get = function(options, callback) {
    scopedClient(options.host)
    .header('accept', 'application/json')
    .path(options.path)
    .query(options.query)
    .get()(function(err, resp, body) {
      if(resp.statusCode === 200) {
        callback(JSON.parse(body));
      }
    });
  }

  return {

    arenaTeamSizes: {
      twovtwo: "2v2",
      threevthree: "3v3",
      fivevfive: "5v5"
    },

    character: function(char, callback) {
      var realm = encodeURIComponent(char.realm);
      var name = encodeURIComponent(char.name);
      var options = {
        host: "http://" + char.region + ".battle.net",
        query: {
          fields: char.fields
        },
        path: "api/wow/character/" + realm + "/" + name
      }
      get(options, function(data) {
        callback(data);
      });
    },

    guild: function(guild, callback) {  
      var r = encodeURIComponent(guild.realm);
      var g = encodeURIComponent(guild.name);
      var options = {
        host: "http://" + guild.region + ".battle.net",
        query: {
          fields: guild.fields
        },
        path: "api/wow/guild/" + r + "/" + g
      }
      get(options, function(data) {
        callback(data);
      });
    },

    realm: function(realm, callback) {
      var options = {
        host: "http://" + realm.region + ".battle.net",
        // TODO: Figure out why realms with special characters and whitespace are not being returned even when encoded
        query: {
          realms: realm.realms
        },
        path: "api/wow/realm/status"
      }
      get(options, function(data) {
        callback(data);
      });
    },

    auctions: function(auct, callback) {
      var r = encodeURIComponent(auct.realm);
      var options = {
        host: "http://" + auct.region + ".battle.net",
        query: {},
        path: "api/wow/auction/data/" + r
      }
      get(options, function(data) {
        callback(data);
      });
    },

    item: function(item, callback) {
      var options = {
        host: "http://" + item.region + ".battle.net",
        query: {},
        path: "api/wow/item/" + item.id 
      }

      get(options, function(data) {
        callback(data);
      });
    },

    arenaTeam: function(arenaTeam, callback) {
      var r = encodeURIComponent(arenaTeam.realm);
      var t = encodeURIComponent(arenaTeam.name);
      var options = {
        host: "http://" + arenaTeam.region + ".battle.net",
        query: {},
        path: "api/wow/arena/" + r + "/" + arenaTeam.teamSize + "/" + t
      }

      get(options, function(data) {
        callback(data);
      })
    },

    arenaLadder: function(arenaLadder, callback) {
      var b = encodeURIComponent(arenaLadder.battlegroup);
      var options = {
        host: "http://" + arenaLadder.region + ".battle.net",
        query: {
          page: arenaLadder.fields.page || 1,
          size: arenaLadder.fields.size || 50,
          asc: arenaLadder.fields.asc || true
        },
        path: "api/wow/pvp/arena/" + b + "/" + arenaLadder.teamSize
      }
      get(options, function(data) {
        callback(data);
      })
    },

    ratedBG: function(bgLadder, callback) {
      var options = {
        host: "http://" + bgLadder.region + ".battle.net",
        query: {
          page: bgLadder.page || 1,
          size: bgLadder.size || 50,
          asc: bgLadder.asc || true
        },
        path: "/api/wow/pvp/ratedbg/ladder"
      }
      get(options, function(data) {
        callback(data);
      })
    },

    quest: function(quest, callback) {
      var options = {
        host: "http://" + quest.region + ".battle.net",
        query: {},
        path: "/api/wow/quest/" + quest.id
      }
      get(options, function(data) {
        callback(data);
      })
    }
  }

})();

module.exports = client;

