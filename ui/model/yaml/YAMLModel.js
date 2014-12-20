jQuery.sap.declare("qmacro.ui.model.yaml.YAMLModel");
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("qmacro.ui.model.yaml.YAMLModel", {

	loadData : function(sURL, oParameters, bAsync, sType, bMerge, bCache, mHeaders){
		var that = this;

		bAsync = (bAsync !== false);
		sType = sType || "GET";
		bCache = bCache === undefined ? this.bCache : bCache;

		this.fireRequestSent({url : sURL, type : sType, async : bAsync, headers: mHeaders,
			info : "cache="+bCache+";bMerge=" + bMerge, infoObject: {cache : bCache, merge : bMerge}});
		this._ajax({
		  url: sURL,
		  async: bAsync,
		  dataType: 'text',
		  cache: bCache,
		  data: oParameters,
		  headers: mHeaders,
		  type: sType,
		  success: function(oData) {
			if (!oData) {
				jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + sURL);
			}
			that.setYAML(oData, bMerge);
			that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, headers: mHeaders,
				info : "cache="+bCache+";bMerge=" + bMerge, infoObject: {cache : bCache, merge : bMerge}, success: true});
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown){
	        var oError = { message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText};
			jQuery.sap.log.fatal("The following problem occurred: " + textStatus, XMLHttpRequest.responseText + ","
						+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);

			that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, headers: mHeaders,
				info : "cache="+bCache+";bMerge=" + bMerge, infoObject: {cache : bCache, merge : bMerge}, success: false, errorobject: oError});
			that.fireRequestFailed(oError);
		  }
		});
	},

	parseYAML : function(sData) {
		var oJSONData;
		try {
			oJSONData = jsyaml.load(sData);
		} catch (e) {
			jQuery.sap.log.fatal("Failed to parse YAML: " + e);
			this.fireParseError({url : "", errorCode : -1,
			reason : "", srcText : e, line : -1, linepos : -1, filepos : -1});
		}
		return oJSONData;
	},

	setYAML : function(sData, bMerge) {
		var oData = this.parseYAML(sData);
		this.setData(oData, bMerge);
	},

	getYAML : function() {
		return jsyaml.dump(this.oData);
	}

});
