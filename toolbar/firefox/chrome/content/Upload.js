/*
Copyright (C) 2004-2007  Phan Dac Anh Huy

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Contact: dachuy@gmail.com
*/
Upload = {    
	
	multipart_boundary : new Date().getTime(),
	alreadyLogged : false,
	getStreamData :	function(file_name)
	{
		return "\r\n-----------------------------" + this.multipart_boundary +  "\r\nContent-Disposition: form-data; name=\"file[]\"; filename=\"" + file_name + "\"\r\nContent-Type: image\r\n\r\n";
	},

	serializeFormData : function(formData) {
		var data = [];
		for (key in formData)
			data.push(encodeURI(key) + "=" + encodeURI(formData[key]));
			
		
		data = data.join('&');
		data = data.replace('%20', '+');
		
		return data;
	},

	login : function()
	{	
		var username = SGNsUtils.getStrPref('extensions.screengrab.username','');
		var password = SGNsUtils.getStrPref('extensions.screengrab.password','');

		var nsIStringInputStream_username = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_username.setData("\r\n-----------------------------" + this.multipart_boundary +  "\r\nContent-Disposition: form-data; name=\"nick\"\r\n",-1);
		
		var nsIStringInputStream_username_value = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_username_value.setData("\r\n"+username,-1);

		var nsIStringInputStream_pw = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_pw.setData("\r\n-----------------------------" + this.multipart_boundary +  "\r\nContent-Disposition: form-data; name=\"pw\"\r\n",-1);
		
		var nsIStringInputStream_pw_value = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_pw_value.setData("\r\n"+password,-1);

		var nsIStringInputStream_dologin = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_dologin.setData("\r\n-----------------------------" + this.multipart_boundary +  "\r\nContent-Disposition: form-data; name=\"dologin\"\r\n",-1);
		
		var nsIStringInputStream_dologin_value = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_dologin_value.setData("\r\ntrue",-1);
		
		var nsIMultiplexInputStream = Components.classes["@mozilla.org/io/multiplex-input-stream;1"].createInstance(Components.interfaces.nsIMultiplexInputStream);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_username);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_username_value);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_pw);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_pw_value);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_dologin);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_dologin_value);	
		var XMLHttpRequest_upload = new XMLHttpRequest();
		
		XMLHttpRequest_upload.open("POST", "http://www.imagebam.com/login", false);
		XMLHttpRequest_upload.setRequestHeader("Content-Type", "multipart/form-data; boundary=---------------------------" + this.multipart_boundary);
		XMLHttpRequest_upload.setRequestHeader('Referer', "http://www.imagebam.com/login");
		XMLHttpRequest_upload.send(nsIMultiplexInputStream);	
	
		return true;		
	},

	uploadfile : function(binaryInputStream,nsFile) {
			
		var content_type = SGNsUtils.getIntPref('extensions.screengrab.uploadType',0);
		
		var nsIStringInputStream_start = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_start.setData(this.getStreamData(nsFile), -1);

		var nsIStringInputStream_end = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_end.setData("\r\n" + "-----------------------------" + this.multipart_boundary + "--\r\n", -1);
		
		var nsIStringInputStream_content_type = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_content_type.setData("\r\n-----------------------------" + this.multipart_boundary +  "\r\nContent-Disposition: form-data; name=\"content_type\"\r\n",-1);
		
		var nsIStringInputStream_content_type_value = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
		nsIStringInputStream_content_type_value.setData("\r\n"+content_type,-1);
		
		var nsIMultiplexInputStream = Components.classes["@mozilla.org/io/multiplex-input-stream;1"].createInstance(Components.interfaces.nsIMultiplexInputStream);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_content_type);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_content_type_value);	
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_start);
		nsIMultiplexInputStream.appendStream(binaryInputStream);
		nsIMultiplexInputStream.appendStream(nsIStringInputStream_end);
		
		// Create a mime stream
		const MIME_STREAM_CID = "@mozilla.org/network/mime-input-stream;1";
		const nsIMIMEInputStream = Components.interfaces.nsIMIMEInputStream;
        var mis = Components.classes[MIME_STREAM_CID];
        var post = mis.createInstance(nsIMIMEInputStream);
        post.addHeader('Content-Type', "multipart/form-data; boundary=---------------------------" + this.multipart_boundary);
		post.addContentLength = true;
        post.setData(nsIMultiplexInputStream);
		
		var newTab = gBrowser.addTab('about:blank');
   		gBrowser.selectedTab = newTab;
		var browser = window.getWebNavigation();

		browser.loadURI("http://www.imagebam.com/nav/save",0,null,post,null);
//		browser.loadURI("http://localhost/freelancer/gallery/upload.php",0,null,post,null);		
		return true;
	},

	onerror : function(event)
	{
	
	},
	
	requestOnLoad : function (event)
	{

	}
}
