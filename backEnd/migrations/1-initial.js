'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "comments", deps: []
 * createTable "posts", deps: []
 * createTable "statuses", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2021-12-06T01:00:55.946Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "comments",
            {
                "commentId": {
                    "type": Sequelize.INTEGER,
                    "field": "commentId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.STRING,
                    "field": "UserId"
                },
                "CommentBody": {
                    "type": Sequelize.STRING,
                    "field": "CommentBody"
                },
                "Username": {
                    "type": Sequelize.INTEGER,
                    "field": "Username"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "posts",
            {
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username"
                },
                "PostBody": {
                    "type": Sequelize.STRING,
                    "field": "PostBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "statuses",
            {
                "statusId": {
                    "type": Sequelize.INTEGER,
                    "field": "statusId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username"
                },
                "StatusBody": {
                    "type": Sequelize.STRING,
                    "field": "StatusBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Admin"
                },
                "ProfilePic": {
                    "type": Sequelize.STRING,
                    "field": "ProfilePic"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
