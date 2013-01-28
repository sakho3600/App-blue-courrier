///<import resource="classpath:/alfresco/extension/com/bluexml/alfresco/yamma/common/yamma-env.js">
///<import resource="classpath:/alfresco/templates/webscripts/com/bluexml/yamma/actions/nodeaction.lib.js">
///<import resource="classpath:/alfresco/extension/com/bluexml/alfresco/yamma/common/copy-utils.js">

(function() {
	
	
	Yamma.Actions.CopyDocumentToAction = Utils.Object.create(Yamma.Actions.NodeAction, {

		destination : null,
		typeShort : null,
		operation : null,
		
		wsArguments : [
			{ name : 'destination', mandatory : true},
			{ name : 'typeShort' },
			{ name : 'filename' },
			{ name : 'operation', defaultValue : 'copy' }
		],
						
		prepare : function() {
			
			Yamma.Actions.NodeAction.prepare.call(this);
			
			var 
				destination_ = Utils.asString(this.parseArgs['destination'])
			;
			
			this.destination = this.extractNode(destination_); 
			this.typeShort = Utils.asString(this.parseArgs['typeShort']);
			this.operation = Utils.asString(this.parseArgs['operation']);
			this.filename = Utils.asString(this.parseArgs['filename']);
			
		},		
		
//		isExecutable : function(node) {
//			
//			// TODO: Should check read/write rights
//			
//		},
		
		doExecute : function(node) {
			
			var newDocumentNode = this.node;

			if ('move' == this.operation) {
				var success = this.node.move(this.destination);
				if (success) return;
				
				logger.warn(
					"Cannot move node '" + this.node.nodeRef + "'" +
					" to desintation '" + this.desination.nodeRef + "'." +
					" Performs a copy instead."
				);
			}
			
			newDocumentNode = CopyUtils.copyToDestination(this.node, this.destination, this.filename);
			if (this.typeShort) {
				newDocumentNode.specializeType(this.typeShort);
			}
			
			return ({
				targetRef : Utils.asString(newDocumentNode.nodeRef)
			}); // outcome
			
		}		
		
		
	});

	Yamma.Actions.CopyDocumentToAction.execute();
	
})();