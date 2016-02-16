window.addEventListener('DOMContentLoaded', function() {
	var links = document.links, l = links.length;
	/* Detecting Google's website and if replace redirections with straight links */
	var isGoogleWebSearchSite = false;
	var isGoogleImagesSite=false;
	
	if (window.location.href.indexOf('google.')!=-1 && window.location.href.indexOf('/search?')!=-1) {
		if (window.location.href.indexOf('&tbm=isch')!=-1) {
			isGoogleImagesSite=true;
		}
		else {
			isGoogleWebSearchSite=true;
		} 
	}
	if (!isGoogleImagesSite) {
		for (var i = 0; i < l; i++) {
			/* Work on Google's site  - due to the redirections */
			if (isGoogleWebSearchSite && links[i].href.indexOf('/url')>-1) {
				/* PC & Mobile versions */
				links[i].href=links[i].href.substr(links[i].href.indexOf('=http')+1);
				links[i].href=links[i].href.substr(0, links[i].href.indexOf('&sa'));
				/* Only Mobile version fix */
				var limit=links[i].href.indexOf('&rct=');
				if (limit!=-1) {
					links[i].href=links[i].href.substr(0, limit);
					limit=-1;
				}
				links[i].href=decodeURIComponent(links[i].href);
			}
			/* Both Google Docs & Samurajdata Viewer support */
			/* pdf|doc */
			if (links[i].href.match(/\.(pdf|doc)$/i) || links[i].href.match(/\.(pdf|doc)\?/i) || links[i].href.match(/\.(pdf|doc)\&/i)) {
				links[i].onclick = (function() {
					var href = links[i].href;
					return function() {
						if (confirm("Preview file or download?")) {
							if (confirm("Preview file in Google Docs or in Samurajdata Viewer?")) {
								popitup('http://docs.google.com/viewer?url=' + href);
								return false;
							}
							else {
								popitup('http://view.samurajdata.se/ps.php?url=' + href);
								return false;
							}	
						}	
						return true;
					}
				})();
			}
			/* both Google Docs & Zoho Sheet Viewer */
			/* xls|xlsx */
			if (links[i].href.match(/\.(xls|xlsx)$/i) || links[i].href.match(/\.(xls|xlsx)\?/i) || links[i].href.match(/\.(xls|xlsx)\&/i)) {
				links[i].onclick = (function() {
					var href = links[i].href;
					return function() {
						if (confirm("Preview file or download?")) {
							if (confirm("Preview file in Google Docs or in Zoho Sheet Viewer?")) {
								popitup('http://docs.google.com/viewer?url=' + href);
								return false;
							}
							else {
								popitup('https://sheet.zoho.com/sheet/view.do?url=' + href);
								return false;
							}
						}
						return true;
					}
				})();
			}
			
			/* Only Google Docs support */
			/* docx|odt|pps|ppt|pptx|xls|xlsx|pages|ai|psd|dxf|svg|eps|ps|ttf|xps*/
			if (links[i].href.match(/\.(docx|odt|pps|ppt|pptx|pages|ai|psd|dxf|svg|eps|ps|ttf|xps)$/i) || links[i].href.match(/\.(docx|odt|pps|ppt|pptx|pages|ai|psd|dxf|svg|eps|ps|ttf|xps)\?/i) || links[i].href.match(/\.(docx|odt|pps|ppt|pptx|pages|ai|psd|dxf|svg|eps|ps|ttf|xps)\&/i)) {
				links[i].onclick = (function() {
					var href = links[i].href;
                	return function() {
                    	if (confirm("Preview file in Google Docs?")) {
                    	    window.location = 'http://docs.google.com/viewer?url=' + href;
                    	    return false;
                    	}
                    	return true;
                	}
            	})();
        	}
        	/* Only Samurajdata support */
			/* ps|ps.gz */
        	if (links[i].href.match(/\.(ps|ps.gz|)$/i) || links[i].href.match(/\.(ps|ps.gz|)\?/i) || links[i].href.match(/\.(ps|ps.gz|)\&/i)) {
            	links[i].onclick = (function() {
            	    var href = links[i].href;
            	    return function() {
            	        if (confirm("Preview file in Samurajdata Viewer?")) {
            	            window.location = 'http://view.samurajdata.se/ps.php?url=' + href;
            	            return false;
            	        }
            	        return true;
            	    }
            	})();
        	}
    	}
	}

}, false);

function popitup(url) {
	newwindow=window.open(url,'name');
	newwindow.focus();
	return false;
}

String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}
