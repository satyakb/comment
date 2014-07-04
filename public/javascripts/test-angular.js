var data = [
{
	"53b5a02a60409d00000b9cb9": {
		"_id": "53b5a02a60409d00000b9cb9",
		"path": "",
		"text": "parent",
		"resource_id": 1,
		"user_id": 99,
		"__v": 0,
		"_w": 0,
		"parentId": null,
		"flags": [],
		"votes": [],
		"date_posted": "2014-07-03T18:25:46.837Z",
		"depth": 0,
		"id": "53b5a02a60409d00000b9cb9",
		"children": {
			"53b5a05660409d00000b9cba": {
				"_id": "53b5a05660409d00000b9cba",
				"path": ",53b5a02a60409d00000b9cb9",
				"text": "child",
				"resource_id": 1,
				"user_id": 99,
				"__v": 0,
				"_w": 0,
				"parentId": "53b5a02a60409d00000b9cb9",
				"flags": [],
				"votes": [],
				"date_posted": "2014-07-03T18:26:30.121Z",
				"depth": 1,
				"id": "53b5a05660409d00000b9cba",
				"children": {
					"53b5a09f60409d00000b9cbc": {
						"_id": "53b5a09f60409d00000b9cbc",
						"path": ",53b5a02a60409d00000b9cb9,53b5a05660409d00000b9cba",
						"text": "child2",
						"resource_id": 1,
						"user_id": 99,
						"__v": 0,
						"_w": 0,
						"parentId": "53b5a05660409d00000b9cba",
						"flags": [],
						"votes": [],
						"date_posted": "2014-07-03T18:27:43.950Z",
						"depth": 2,
						"id": "53b5a09f60409d00000b9cbc"
					}
				}
			}
		}
	}
},
{
	"53b5a07d60409d00000b9cbb": {
		"_id": "53b5a07d60409d00000b9cbb",
		"path": "",
		"text": "parent2",
		"resource_id": 1,
		"user_id": 99,
		"__v": 0,
		"_w": 0,
		"parentId": null,
		"flags": [],
		"votes": [],
		"date_posted": "2014-07-03T18:27:09.048Z",
		"depth": 0,
		"id": "53b5a07d60409d00000b9cbb"
	}
}
]

var app = angular.module('myapp', ['ngRoute']);

app.controller('CommentController', function() {
	var dataArr = new Array();
	data.forEach(function(c) {
		for (key in c) {
			dataArr.push(c[key]);
		}
	});
	this.comments = dataArr;
	console.log(dataArr)
})