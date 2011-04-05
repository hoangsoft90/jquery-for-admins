/*!
 * JScript Shell for jQuery for Administrators Project
 * http://code.google.com/p/jquery-for-admins/
 *
 * Copyright 2011, Michael Snead
 * Dual licensed under the MIT or GPL Version 2 licenses (just like jQuery).
 *
 * 4/3/2011
 *
 * This code is pre-alpha.
 */

//jsshell

//Make sure this is running in CSCRIPT in case the user double-clicked
var sName = String(WScript.Fullname);
if(sName.indexOf("\\") > 1) {
	sName = sName.substring(String(WScript.Fullname).lastIndexOf("\\") + 1);
}
if(sName.toUpperCase() != "CSCRIPT.EXE") {
	var WshShell = WScript.CreateObject("WScript.Shell");
	WshShell.Run("CSCRIPT.EXE /nologo " + WScript.ScriptFullName);
	WScript.Quit();
}

var jsshell = {};
jsshell.exit = {};
jsshell.exit.functionName = "EXIT,BYE";
jsshell.exit.execute = function() { WScript.Quit(); };
jsshell.cls = {};
jsshell.cls.functionName = "CLS";
jsshell.cls.execute = function() {
	WScript.StdOut.WriteBlankLines(100);
};

var reflectObject = function(obj) {
	var retStr = "";
	for(var x in obj) {
		retStr += x + ": " + obj[x] + "\r\n";
	}
	return retStr;
}

var cmd = "";
var core = "";
var cmdBuffer = "";

try {
eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile("jq4a.js",1).ReadAll());
} catch(e)
{
WScript.Echo("There was an error attempting to read 'jq4a.js'. jQuery for Admin functions will not be available to the shell.");
}

WScript.StdOut.Write("js>");

do {
	cmd = WScript.StdIn.ReadLine();
	if(cmd.length > 0 && cmd.substring(cmd.length - 1) === "\\") {
		cmdBuffer += cmd;
		WScript.StdOut.Write("more>");
	} else {
		if(cmdBuffer != "") {
			cmd = cmdBuffer + cmd;
			cmdBuffer = "";
		}
		var fCmd = false;
		for(var x in jsshell) {
			var funcNames = (jsshell[x].functionName+"").split(',');
			var uCmd = cmd.toUpperCase();
			for(var i=0;i<funcNames.length;i++){
				if(uCmd === funcNames[i]) { jsshell[x].execute(); fCmd = true; }
			}
		}
		if(!fCmd) {
			try{
				eval(cmd);
			}catch(e) {
				WScript.Echo('Error: ' + reflectObject(e));
			}
		}
		WScript.StdOut.Write("js>");
	}
	

} while(cmd.toUpperCase() != "EXIT");