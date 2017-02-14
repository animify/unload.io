var bugs = [
	{status: "Open", priority: "P1", owner: "alapenna", title:"That bug #1"},
	{status: "Open", priority: "P1", owner: "alapenna", title:"That bug #2"},
	{status: "Open", priority: "P2", owner: "alapenna", title:"That bug #3"},
]

var connection = new Mongo("localhost:27017")
var db = connection.getDB("bugtracker")

db.bugs.drop()
db.bugs.insert(bugs)
