String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}

var Ass = { //Boy..  The possibilities of a class named "Ass"...
	rules: [],  
	
	parseCSS: function(css) {
	    var allCSS = "";
	    var lines = css.split("\n");
	    
	for(var i=0, max=lines.length; i < max; i++) {
		var line = lines[i].trim();
		
		var pieces = line.split(" ");
		
		if(pieces[0] === "rule") { //It's a new rule declaration
		       var newRuleLines = [line];
			var foundClose = (line.indexOf("}") !== -1) ? true : false;
	
			while(!foundClose) {
			       i++;
			       var curLine = lines[i].trim();
			       
			       newRuleLines.push(curLine);
			       
			       foundClose = (curLine.indexOf("}")) ? true : false;
			}
			i++;
	
		
			this.makeNewRule(newRuleLines);
			
		} else if(line.indexOf(":") !== -1) { //It's a regular CSS line, so we should parse it!
		    
		    if(line.indexOf("{") !== -1) { //If the open bracket is on the same line
			allCSS += line.split("{")[0] + "{\n";
			line = line.split("{")[1];
		    }

		    allCSS += this.parseLine(line); //Get the rules

		    allCSS += (line.indexOf("}") !== -1) ? "}\n" : ""; //If the close bracket is on the same line

		} else { //Nothing interesting here, move along.
		    allCSS += line + "\n";
		}

	    }

	return allCSS;
	},

	makeNewRule: function(lines) {
	    var openPos = lines[0].indexOf("{");
	    
	    var declaration = lines[0].substr(0, openPos);
	    var decPieces = declaration.split(" ");
	    
	    var rule = {
		name: decPieces[1]   
	    };
	    
	    lines[0] = lines[0].substr(openPos); //Get rid of the declaration, because it's not important now.
	    
	    rule.css = "";
	    for(var i=0, max=lines.length; i<max; i++) {
		   rule.css += this.parseLine(lines[i]) + "\n";
	    }
	    
	    rule.css = rule.css.trim();

	    this.rules.push(rule);
	},

	parseLine: function(line) {
	    var cssLine = "";
	    
	    line = line.replace(/[{}]/g, "");
	    
	    var rules = line.split(";"); //Because some people put tons of CSS rules on one line
	    
	    for(var i=0, max=rules.length - 1; i<max; i++) {
		   var pieces = rules[i].split(":");
		   var css;
		   
		   if(this.isCustomRule(pieces[0])) {
			css = this.ruleToCSS(pieces[0], pieces[1]);	
		   } else {
			css = pieces[0] + ":" + pieces[1] + ";";
		   }
		   
		   cssLine += css + "\n";
	    }
	    
	    return cssLine;
	},
	
	isCustomRule: function(rule) {
		for(var i=0, max=this.rules.length; i<max; i++) {
			if(this.rules[i].name === rule) return true;
		}
		
		return false;
	},
	
	ruleToCSS: function(ruleName, argLine) {
		var args = argLine.split(" ");

		var rule = false;
		var i=0;	
		while(!rule) {
			if(this.rules[i].name === ruleName) rule = this.rules[i];
		}
		
		var CSS = rule.css;
		
		for(var i=0, max=args.length; i<max; i++) {
			var delim = "%" + i
	
			CSS = CSS.replace(delim, args[i]);
		}
		
		return CSS;
	}
}

exports.Ass = Ass;
