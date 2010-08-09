/*
Copyright (C) 2004-2007  Andy Mutton

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

Contact: andy@5263.org
*/
Screengrab = {
    nsGrab : new SGNsGrab.NsGrab(false),
    nsCbGrab : new SGNsGrab.NsGrab(true),
    javaGrab : new SGJavaGrab.JavaGrab(),
    isUpload : false,
	
    grabber : function() {
        if (nsPreferences.getIntPref(SGPrefs.captureMethod) == 0) {
            return this.javaGrab;
        } else {
            return this.nsGrab;
        }
    },
    
    format : function() {
        if (nsPreferences.getIntPref(SGPrefs.imageFormat) == 0) {
            return "png";
        } else {
            return "jpeg";
        }
    },
    
    defaultFileName : function() {
        filename = window.content.document.title;
        if (nsPreferences.getBoolPref(SGPrefs.includeTimeStampInFilename)) {
            dt = new Date();
            filename = filename + "_" + dt.getTime();    
        }
        return filename;
    },
    
    grabCompleteDocument : function() {
		this.grabber().setUpload(false);
        this.grabber().grabPage();
    },

    grabVisibleDocument : function() {
		this.grabber().setUpload(false);
        this.grabber().grabVisiblePage();
    },

    grabDocumentPortion : function(offsetX, offsetY, width, height) {
		this.grabber().setUpload(false);
        this.grabber().grabSelection(new SGDimensions.Box(offsetX, offsetY, width, height));
    },
    
    grabBrowserWindow : function() {
		this.grabber().setUpload(false);
        this.grabber().grabBrowser();
    },
    
    copyCompleteDocument : function() {
        this.nsCbGrab.grabPage(false);
    },

    copyVisibleDocument : function() {
        this.nsCbGrab.grabVisiblePage()
    },

    copyDocumentPortion : function(offsetX, offsetY, width, height) {
        this.nsCbGrab.grabSelection(new SGDimensions.Box(offsetX, offsetY, width, height))
    },
    
    copyBrowserWindow : function() {
        this.nsCbGrab.grabBrowser();
    },
	    
    uploadCompleteDocument : function() {
		this.nsGrab.setUpload(true);		
    	this.nsGrab.grabPage();	
    },
	
	uploadVisibleDocument : function() {
		this.nsGrab.setUpload(true);
        this.nsGrab.grabVisiblePage();
    },

    uploadDocumentPortion : function(offsetX, offsetY, width, height) {
		this.nsGrab.setUpload(true);
        this.nsGrab.grabSelection(new SGDimensions.Box(offsetX, offsetY, width, height))
    },
    
    uploadBrowserWindow : function() {
		this.nsGrab.setUpload(true);
        this.nsGrab.grabBrowser();
    },
	
	openOptions : function()
  	{
		window.openDialog('chrome://screengrab/content/preferences.xul');
  	},
}