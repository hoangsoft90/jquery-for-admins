/*!
 * jQuery for Administrators Core
 * http://code.google.com/p/jquery-for-admins/
 *
 * Copyright 2011, Michael Snead
 * Dual licensed under the MIT or GPL Version 2 licenses (just like jQuery).
 *
 * 4/3/2011
 *
 * This code is pre-alpha.
 */

 (function(context) {
	var $ = $ || {};
	$.tee = function(cmdStr, itFunc, echoIt) {
		var shell = new ActiveXObject("WScript.Shell");
		var exec = shell.Exec(cmdStr);
		var stdout = exec.StdOut;
		while(!stdout.AtEndOfStream) {
			if(echoIt === undefined || echoIt === true) { 
				var buff = stdout.ReadLine();
				WScript.Echo(buff);
				if(itFunc) { itFunc(buff); }
			} else {
				var buff = stdout.ReadLine();
				if(itFunc) { itFunc(buff); }
			}
		}
	}
		
	$.each = function(axObj, itFunc) {
		var itemCount = 0;
		if(Object.prototype.toString.call(axObj)==='[object Array]'){
			for(var i=0;i<axObj.length;i++){ //It's an array, loop through it
				itFunc(axObj[i],i);
			}
		} else {
			if(!(axObj instanceof Object)) { //It's not a JS object, probably ActiveX
				var e = new Enumerator(axObj);
				e.moveFirst();
				while(e.atEnd() == false) {
					itFunc(e.item(),itemCount);
					e.moveNext();
					itemCount++;
				}
			} else {
				for(var x in axObj) {
					itFunc(x,itemCount);
					itemCount++;
				}
			}
		}
	};
	
	$.getCmdObject = function(cmdStr) {
		var cmdObj = {};
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var patt = /[A-Z0-9a-z]*/g;
		var cmds = cmdStr.match(patt)[0];
		var isFile = false;
		try{
			if(fso.FileExists(cmds)) {
				cmdObj.shell = new ActiveXObject("WScript.Shell");
				cmdObj.exec = cmdObj.shell.Exec(cmdStr);
				cmdObj.stdout = cmdObj.exec.StdOut;
				isFile = true;
			}
		}catch(e){}
		if(!isFile) {
		//Maybe it's a command
			cmdObj.shell = new ActiveXObject("WScript.Shell");
			cmdObj.exec = cmdObj.shell.Exec('%comspec% /c ' + cmdStr);
			cmdObj.stdout = cmdObj.exec.StdOut;
		}
		return cmdObj;
	}
	
	$.echoCmd = function(cmdStr) {
		var cmdObj = $.getCmdObject(cmdStr);
		while(!cmdObj.stdout.AtEndOfStream) {
			WScript.Echo(cmdObj.stdout.ReadLine());
		}
	};
	
	context.$ = $;
 })(this);
 function StringWriter(){};
StringWriter.prototype.Write = function(wobj) {
	this.axObject = this.axObject || new ActiveXObject("System.IO.StringWriter");
	this.axObject.Write_13(wobj);
}
StringWriter.prototype.WriteLine = function(wobj) {
	this.axObject = this.axObject || new ActiveXObject("System.IO.StringWriter");
	this.axObject.WriteLine_13(wobj);
}
StringWriter.prototype.ToString = function(wargs) {
	this.axObject = this.axObject || new ActiveXObject("System.IO.StringWriter");
	return wargs ? this.axObject.ToString(wargs) : this.axObject.ToString();
}
//System.Collections.ArrayList <-- use $.each to enumerate
// Add,Sort,Reverse,Remove
