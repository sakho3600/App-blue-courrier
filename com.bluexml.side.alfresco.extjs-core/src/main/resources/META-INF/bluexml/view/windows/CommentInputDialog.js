Ext.define('Bluexml.view.windows.CommentInputDialog', {

	singleton : true,
	
	defaultConfig : {
		title : 'Saisie',
		buttons : Ext.Msg.OKCANCEL,
		multiline : true,
		modal : false,
		msg : 'Entrez un commentaire pour cette opération.'		
	},
	
	askForComment : function(onCommentAvailable, overrideConfig) {
		
		if (!onCommentAvailable || !Ext.isFunction(onCommentAvailable)) {
			throw new Error('IllegalArgumentException! The callback function onCommentAvailable is mandatory');
		}
		
		overrideConfig = overrideConfig || {};
		
		var messageBoxConfig = Ext.apply(
			{
				fn : function(buttonId, commentText, opt) {
					if ('ok' != buttonId) return; // canceled the operation
					onCommentAvailable(commentText);
				}
			
			},
			overrideConfig,
			this.defaultConfig
		);
		
		Ext.MessageBox.show(messageBoxConfig);
		
	}
	
});