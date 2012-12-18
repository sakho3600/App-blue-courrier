/**
 * The controller associated to the MainMenu.
 */
Ext.define('Yamma.controller.menus.MainMenuController', {

	extend : 'Ext.app.Controller',

	uses : [
		'Yamma.utils.Context'
	],	
	
	refs : [
	
	    {
	    	ref : 'mainMenu',
	    	selector : 'mainmenu'
	    }
	    
	],
	
	onItemClick : function(view, node, item, index, event, eOpts) {

		if (!node.isLeaf()) {
			node.expand();
		}
		var context = this.extractContext(node, item);
		if (!context) return;
		
		this.application.fireEvent('contextChanged', context);
		this.closeMenu();
		
	},
	
	extractContext : function(record, item) {
		return null;
	},
	
	closeMenu : function() {
		
		var mainMenu = this.getMainMenu();
		if (!mainMenu) return;
		
		// Do not close the menu if it is pinned
		if (mainMenu.isPinned()) return;
		
		mainMenu.toggleCollapse();		
		
	}
	
	
});