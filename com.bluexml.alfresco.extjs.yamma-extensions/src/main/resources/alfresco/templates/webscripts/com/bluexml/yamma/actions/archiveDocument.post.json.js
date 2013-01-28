///<import resource="classpath:/alfresco/templates/webscripts/com/bluexml/yamma/actions/nodeaction.lib.js">
///<import resource="classpath:/alfresco/extension/com/bluexml/alfresco/yamma/common/yamma-env.js">

(function() {
	
	Yamma.Actions.ArchiveAction = Utils.Object.create(Yamma.Actions.DocumentNodeAction, {
		
		eventType : 'archive',
		
		isExecutable : function(node) {
			
			return ActionUtils.canArchive(node, this.fullyAuthenticatedUserName)
			
		},
		
		doExecute : function(node) {
			
			this.updateDocumentState(YammaModel.DOCUMENT_STATE_ARCHIVED);
			this.udpateSentByEmailDate();
			this.updateDocumentHistory('archiveDocument.comment');
			
			ArchivesUtils.moveToArchives(node);
			
		},
		
		udpateSentByEmailDate : function() {
			
			this.node.properties[YammaModel.SENT_BY_EMAIL_SENT_DATE_PROPNAME] = new Date();
			this.node.save();
			
		}
		
	});

	Yamma.Actions.ArchiveAction.execute();	
	
})();