Ext.define('Yamma.utils.button.UploadButton', {

	extend : 'Ext.button.Button',
	alias : 'widget.uploadbutton',
	
	requires : [
		'Yamma.view.windows.ServiceUploadWindow'
	],
	
	defaultLabel : 'Charger',
	
	scale : 'large',
	iconCls : 'icon-cloud_up',
	
	tooltip : 'Charger un document',
	text : '&nbsp;',
	
	initComponent : function() {
		
		var me = this;
		
		this.on('click', function() {
			var serviceUploadWindow = me._getServiceUploadWindow();
			serviceUploadWindow.show();
		});
		
		this.callParent(arguments);
		
	},
	
	_getServiceUploadWindow : function() {
		if (null == this._serviceUploadWindow) {
			this._serviceUploadWindow = Ext.create('Yamma.view.windows.ServiceUploadWindow', {
				closeAction : 'hide'
			});
		}
		return this._serviceUploadWindow;
	},
	
	config : {
		/**
		 * @cfg {Boolean} showTrayLabel Whether the label should be displayed on the
		 *      button or not
		 */
		showTrayLabel : false
	},
	
	/**
	 * The current target context
	 * 
	 * @private
	 * @type Object 
	 */
	targetContext : null,	

	/**
	 * 
	 * @param {Object}
	 *            trayContextDefinition the new context definition
	 * @return {Boolean} true if the context was updated successfully
	 */
    updateTrayContext : function(trayContextDefinition) {
    	
    	if (!trayContextDefinition) return false;
    	
    	var trayNodeRef = trayContextDefinition.nodeRef;
    	if (!trayNodeRef) return false;
    	
    	this.targetContext = trayContextDefinition;
    	
    	var trayLabel =  trayContextDefinition.label || '';
    	this._updateTrayLabel(trayLabel);
    	
    	return true;
    	
    },
    
    /**
     * Reset the current tray context
     */
    resetTrayContext : function() {
    	
    	this.targetContext = null;
    	this._updateTrayLabel();
    	
    },
    
    /**
	 * Update the button label. If none is provided then reset to the
	 * #defaultLabel.
	 * 
	 * @private
	 * @param {String}
	 *            trayLabel
	 */
    _updateTrayLabel : function(trayLabel) {
    	if (! this.getShowTrayLabel()) return;
    	this.setText(trayLabel || this.defaultLabel);
    },
	
    /**
	 * Get the current destination bound to the button.
	 * 
	 * @return {String} The destination as a nodeRef if a context is bound to
	 *         the button, `null` otherwise
	 */
	getDestination : function() {
		var targetContext = this.targetContext;
		if (!targetContext) return null;
		
		return targetContext.nodeRef || null;
	}

});