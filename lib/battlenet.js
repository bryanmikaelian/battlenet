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
    region: "us",

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

    arenaTeam: function(realm, teamsize, teamname, callback) {
      // TODO: Use an object instead of a string for the team size
      var r = encodeURIComponent(realm);
      var t = encodeURIComponent(teamname);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/arena/" + r + "/" + teamsize + "/" + t
      }

      get(options, function(data) {
        callback(data);
      })
    },

    arenaLadder: function(battlegroup, teamsize, callback) {
      var b = encodeURIComponent(battlegroup);
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "api/wow/pvp/arena/" + b + "/" + teamsize
      }
      get(options, function(data) {
        callback(data);
      })
    },

    ratedBG: function(callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "/api/wow/pvp/ratedbg/ladder"
      }
      get(options, function(data) {
        callback(data);
      })
    },

    quest: function(questID, callback) {
      var options = {
        host: "http://" + this.region + ".battle.net",
        query: {},
        path: "/api/wow/quest/" + questID
      }
      get(options, function(data) {
        callback(data);
      })
    }
  }

})();

module.exports = client;

