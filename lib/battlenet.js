var client = (function () {
  var http, scopedClient, get;

  http = require("scoped-http-client");

  scopedClient = function (url) {
    return http.create(url);
  };

  get = function (options, callback) {
    scopedClient(options.host)
    .header('accept', 'application/json')
    .path(options.path)
    .query(options.query)
    .get()(function (err, resp, body) {
      if (resp.statusCode === 200) {
        callback(JSON.parse(body));
      }
    });
  };

  return {
    data: {
      // Not ideal for arena team sizes
      arenaTeamSizes: {
        twovtwo: "2v2",
        threevthree: "3v3",
        fivevfive: "5v5"
      },

      battlegroups: function (region, callback) {
        var options = {
          host: "http://" + region + ".battle.net",
          query: {},
          path: "api/wow/data/battlegroups"
        };
        get(options, function (data) {
          callback(data);
        });
      },

      classes: function (region, callback) {
        var options = {
          host: "http://" + region + ".battle.net",
          query: {},
          path: "api/wow/data/character/classes"
        };
        get(options, function (data) {
          callback(data.classes);
        });
      }
    },

    character: function (char, callback) {
      var options = {
        host: "http://" + char.region + ".battle.net",
        query: {
          fields: char.fields
        },
        path: "api/wow/character/" + encodeURIComponent(char.realm) + "/" + encodeURIComponent(char.name)
      };
      get(options, function (data) {
        callback(data);
      });
    },

    guild: function (guild, callback) {  
      var options = {
        host: "http://" + guild.region + ".battle.net",
        query: {
          fields: guild.fields
        },
        path: "api/wow/guild/" + encodeURIComponent(guild.realm) + "/" + encodeURIComponent(guild.name)
      };
      get(options, function (data) {
        callback(data);
      });
    },

    realm: function (realm, callback) {
      var options = {
        host: "http://" + realm.region + ".battle.net",
        // TODO: Figure out why realms with special characters and whitespace are not being returned even when encoded
        query: {
          realms: realm.realms
        },
        path: "api/wow/realm/status"
      };
      get(options, function (data) {
        callback(data);
      });
    },

    auctions: function (auct, callback) {
      var options = {
        host: "http://" + auct.region + ".battle.net",
        query: {},
        path: "api/wow/auction/data/" + encodeURIComponent(auct.realm)
      };
      get(options, function (data) {
        callback(data);
      });
    },

    item: function (item, callback) {
      var options = {
        host: "http://" + item.region + ".battle.net",
        query: {},
        path: "api/wow/item/" + item.id 
      };
      get(options, function (data) {
        callback(data);
      });
    },

    arenaTeam: function (arenaTeam, callback) {
      var options = {
        host: "http://" + arenaTeam.region + ".battle.net",
        query: {},
        path: "api/wow/arena/" + encodeURIComponent(arenaTeam.realm) + "/" + arenaTeam.teamSize + "/" + encodeURIComponent(arenaTeam.name)
      };
      get(options, function (data) {
        callback(data);
      });
    },

    arenaLadder: function (arenaLadder, callback) {
      var options = {
        host: "http://" + arenaLadder.region + ".battle.net",
        query: {
          page: arenaLadder.fields.page || 1,
          size: arenaLadder.fields.size || 50,
          asc: arenaLadder.fields.asc || true
        },
        path: "api/wow/pvp/arena/" + encodeURIComponent(arenaLadder.battlegroup) + "/" + arenaLadder.teamSize
      };
      get(options, function (data) {
        callback(data);
      });
    },

    ratedBG: function (bgLadder, callback) {
      var options = {
        host: "http://" + bgLadder.region + ".battle.net",
        query: {
          page: bgLadder.page || 1,
          size: bgLadder.size || 50,
          asc: bgLadder.asc || true
        },
        path: "/api/wow/pvp/ratedbg/ladder"
      };
      get(options, function (data) {
        callback(data);
      });
    },

    quest: function (quest, callback) {
      var options = {
        host: "http://" + quest.region + ".battle.net",
        query: {},
        path: "/api/wow/quest/" + quest.id
      };
      get(options, function (data) {
        callback(data);
      });
    }
  };

}());

module.exports = client;

