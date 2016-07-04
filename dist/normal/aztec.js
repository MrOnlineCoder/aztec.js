/*
	Aztec.js Library
	Author: MrOnlineCoder
	License: MIT

	https://github.com/MrOnlineCoder/aztec.js
	2016
*/


(function () {
	"use strict";

   var languages = {};
   var currentLocale = "default";
   var regex = /{%[a-zA-Z0-9_]+%}/igm;
   var startBracket = "{%";
   var endBracket = "%}";


   function log(msg) {
   	if (Aztec.debug) console.log("[Aztec.js Debug] "+msg);
   }

   function err(msg) {
   	console.err("[Aztec.js Error] "+msg);
   }

   function parseString(str) {
   
	var matches = str.match(regex);
	var lang = Aztec.getCurrentLocale();

	for (var match in matches) {
		var key = matches[match].substring(2,matches[match].length-2);
      if (!lang[key]) {
         str = str.replace(startBracket+key+endBracket, "");
         continue;
      }
		str = str.replace(startBracket+key+endBracket, lang[key]);
	}
	return str;
   }

   var Aztec = {
   	debug: false,
   	translateAttr: "render",
   	addLocale: function(name, keys) {
   		if (typeof(name) != "string") {
   			err("addLocale() - <name> parameter is not a String!");
   			return false;
   		}

   		if (typeof(keys) != "object") {
   			err("addLocale() - <keys> parameter is not an Object!");
   			return false;
   		}

   		languages[name] = keys;
   		log("Locale <"+name+"> added.");
   		return true;
   	},
   	setLocale: function(name) {
   		if (typeof(name) != "string") {
   			err("setLocale() - <name> parameter is not a String!");
   			return false;
   		}

   		if (languages[name] === null) {
   			err("setLocale() - Locale with given <name> does not exist: "+name);
   			return false;
   		}

   		currentLocale = name;
   		log("Locale <"+name+"> activated.");
   		return true;
   	},
   	render: function(element) {
   		if (Aztec.debug) console.time("Elapsed time");
   		element = element || document.body;
   		if (element == document.body) {
   			log("render() - <element> is not specified or it is body, rendering whole page...");
   		}

   		var nodes = element.querySelectorAll("["+this.translateAttr+"]");
   		for (var i = 0; i<nodes.length;i++) {
   			log("Rendering node: "+i);
   			nodes[i].innerHTML = parseString(nodes[i].getAttribute(this.translateAttr));
   		}
   		if (Aztec.debug) console.timeEnd("Elapsed time");
   	},
   	getCurrentLocale: function() {
   		return languages[currentLocale];
   	},
   	translate: function(name) {
   		if (typeof(name) != "string") {
   			err("translate() - <name> parameter is not a String!");
   			return false;
   		}

   		if (Aztec.getCurrentLocale()[name] === null) {
   			err("translate() - key with given name does not exist: "+name);
   			return false;
   		}

   		return Aztec.getCurrentLocale()[name];
   	}
   };

   window.Aztec = Aztec;
}());