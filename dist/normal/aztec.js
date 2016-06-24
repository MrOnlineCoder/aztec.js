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
   var currentLanguage = "default";
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
	var lang = Aztec.getCurrentLanguage();

	for (var match in matches) {
		var key = matches[match].substring(2,matches[match].length-2);
		str = str.replace(startBracket+key+endBracket, lang[key]);
	}
	return str;
   }

   var Aztec = {
   	debug: false,
   	translateClass: "translatable",
   	addLanguage: function(name, keys) {
   		if (typeof(name) != "string") {
   			err("addLanguage() - <name> parameter is not a String!");
   			return false;
   		}

   		if (typeof(keys) != "object") {
   			err("addLanguage() - <keys> parameter is not an Object!");
   			return false;
   		}

   		languages[name] = keys;
   		log("Language <"+name+"> added.");
   		return true;
   	},
   	setCurrentLanguage: function(name) {
   		if (typeof(name) != "string") {
   			err("setCurrentLanguage() - <name> parameter is not a String!");
   			return false;
   		}

   		if (languages[name] === null) {
   			err("setCurrentLanguage() - Language with given <name> does not exists: "+name);
   			return false;
   		}

   		currentLanguage = name;
   		log("Language <"+name+"> activated.");
   		return true;
   	},
   	render: function(element) {
   		if (Aztec.debug) console.time("Elapsed time");
   		element = element || document.body;
   		if (element == document.body) {
   			log("render() - <element> is not specified or it is body, rendering whole page...");
   		}

   		var nodes = element.getElementsByClassName(this.translateClass);
   		for (var i = 0; i<nodes.length;i++) {
   			log("Rendering node: "+i);
   			nodes[i].innerHTML = parseString(nodes[i].innerHTML);
   		}
   		if (Aztec.debug) console.timeEnd("Elapsed time");
   	},
   	getCurrentLanguage: function() {
   		return languages[currentLanguage];
   	}
   };

   window.Aztec = Aztec;
}());