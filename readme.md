node-ass
========
***
About
-----
A node parser for :

**A**dvanced  
**S**tyle  
**S**heets  

***
Why
---
With the world of CSS3 stuck in the never-ending status of "not officially supported", I spend a lot of time writing CSS with browser-specific rules.  Wouldn't it be SO much faster if we could write a custom rule once, and reuse it over and over again in our stylesheets?  Yes, it would.  That's why I did this.
***
How
---
Just embed CSS rules in your file.  You can put them anywhere in the file you like, but they MUST be declared before they are used.  (this also applies if you are using rules across multiple css files).  Embed them like this:  
  

	/* These are your CSS rules */

	rule all-box-shadow {
		-moz-box-shadow: %1 %2 %3 %4;
		-webkit-box-shadow: %1 %2 %3 %3;
		box-shadow: %1 %2 %3 %4;
	}

	/*  And then your regular CSS layout */

	#shadowed_box {
		all-box-shadow: 5px 5px 5px #eee;
	}
  

As you can see, you can send custom variables into your custom rules, using the `%1` notation.  You can put an infinite number of variables into your custom rules, just keeping counting up.  If you did not put any custom variables into your rule, just put `null` as the placeholder after you use the rule.  That would look like this:


	/* These are your CSS rules */

	rule all-box-shadow {
		-moz-box-shadow: 5px 5px 5px #eee;
		-webkit-box-shadow: 5px 5px 5px #eee;
		box-shadow: 5px 5px 5px #eee;
	}

	/*  And then your regular CSS layout */

	#shadowed_box {
		all-box-shadow: null;
	}


Then, you'll need to activate and call node-ass so it can parse your CSS.  So, do this:  

	var ass = require('node-ass.js').Ass;

	/* Do some stuff to get your CSS, and store it in the variable myCSS */

	var parsedCSS = ass.parseCSS(myCSS);


tadah!
***
Who
---
Joe Wegner, that's who!	
