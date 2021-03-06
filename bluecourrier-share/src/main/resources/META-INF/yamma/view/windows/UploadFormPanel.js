Ext.define('Yamma.view.windows.UploadFormPanel.ErrorReader.Error', {
	extend: 'Ext.data.Model',
	
	fields: [
        {name: 'message',  type: 'string'}
    ]
});

Ext.define('Yamma.view.windows.UploadFormPanel.ErrorReader', {

	extend : 'Ext.data.reader.Reader',
	
	read : function(response) {
		
		var 
			responseText = response.responseText || '',
			responseXML = response.responseXML
		;
		
		if (responseXML) {
			var preElements = responseXML.getElementsByTagName('pre');
			if (preElements.length > 0) {
				
				var 
					preElement = preElements[0],
					responseJSON = Ext.JSON.decode(preElement.innerText || preElement.textContent)
				;
				response.responseJSON = responseJSON;
				
				return this._getJSONResponse(responseJSON);
				
			}			
		}
				
		var result = Ext.decode(responseText, true); // Cannot get a valid JSON string
		if (!result) {
			return {
				success : false,
				records : [
					Ext.create('Yamma.view.windows.UploadFormPanel.ErrorReader.Error', {message : responseText})
				]
			};
		}
		
		return result;
		
	},
	
	/**
	 * @private
	 * @param {} responseJSON
	 */
	_getJSONResponse : function(responseJSON) {
		
		var response = {
			success : (200 == responseJSON.status.code)
		};
		
		if (!response.success) {
			var error = Ext.create('Yamma.view.windows.UploadFormPanel.ErrorReader.Error', {message : responseJSON.message});
			response.records = [error];
		}
		
		return response;
		
	}
	
	
});

Ext.define('Yamma.view.windows.UploadFormPanel', {

	extend : 'Ext.form.Panel',
	xtype : 'uploadform',
	
	requires : [
		'Ext.form.field.File'
	],

	statics : {
		
		/**
		 * @see http://www.w3.org/TR/html5/number-state.html#file-upload-state
		 * @param {} path
		 * @return {}
		 */
		extractFilename : function(path) {
			if (path.substr(0, 12) == "C:\\fakepath\\")
				return path.substr(12); // modern browser
			var x;
			x = path.lastIndexOf('/');
			if (x >= 0) // Unix-based path
				return path.substr(x + 1);
			x = path.lastIndexOf('\\');
			if (x >= 0) // Windows-based path
				return path.substr(x + 1);
			return path; // just the filename
		},
		
		ALFRESCO_UPLOAD_URL : 'alfresco://api/upload'
		
	},
	
	width : 500,
	frame : true,
	bodyPadding : '10 10 0',

	title : i18n.t('view.window.uploadform.title'),//'File Upload Form',
	emptyTextLabel : i18n.t('view.window.uploadform.empty'),//'Choose a file',
	waitingMessage : i18n.t('view.window.uploadform.waiting'),//'Uploading your file...',
	
	// buttons
	showSubmitButton : true,
	submitButtonLabel : i18n.t('view.window.uploadform.submit'),//'Save',
	
	showResetButton : true,
	resetButtonLabel : i18n.t('view.window.uploadform.reset'),//'Reset',
	
	showCancelButton : true,
	cancelButtonLabel : i18n.t('view.window.uploadform.cancel'),//'Cancel',
	
	// file field
	fileFieldName : 'filedata',
	fileFieldLabel : i18n.t('view.window.uploadform.filefield'),//'File',
	fileFieldIcon : 'icon-page_white_put',
	
	// name field
	nameFieldName : 'filename',
	nameFieldLabel : i18n.t('view.window.uploadform.namefield'),//'Name',
	
	uploadUrl : null,
	additionalFields : null,
	
	defaults : {
		anchor : '100%',
		allowBlank : false,
		msgTarget : 'side',
		labelWidth : 50
	},
	
	initComponent : function() {
		this.items = (this.items || [])
			.concat(this.getItems())
			.concat(this._getAdditionalFields());
		this.buttons = this.getButtons();
		
		this.addEvents('beforeSubmit');
		this.addEvents('submitSuccess');
		
		this.callParent(arguments);
	},

	getItems : function() {
		
		return [
		
			{
				xtype : 'textfield',
				fieldLabel : this.nameFieldLabel,
				name : this.nameFieldName
			}, 
			
			{
				xtype : 'filefield',
				emptyText : this.emptyTextLabel,
				fieldLabel : this.fileFieldLabel,
				name : this.fileFieldName,
				buttonText : '',
				
				buttonConfig : {
					iconCls : this.fileFieldIcon
				},
				
				listeners : {
					'change' : {
						fn : this.onFileFieldChanged,
						scope : this
					}
				}
			}
			
		];
		
	},
	
	/**
	 * @private
	 */
	_getAdditionalFields : function() {
		
		var additionalFields = this.additionalFields || [];
		if (!Ext.isArray(additionalFields)) {
			additionalFields = [additionalFields];
		};
		
		return Ext.Array.map(additionalFields, function(fieldDefinition) {
			
			return Ext.applyIf(fieldDefinition, {
				xtype : 'textfield',
				hidden : true
			});

		});
		
	},	
	
	onFileFieldChanged : function(field, value) {
		var 
			form = this.getForm(),
			nameField = form.findField(this.nameFieldName)
		;
		if (!nameField) return;
		
		var fileName = Yamma.view.windows.UploadFormPanel.extractFilename(value);
		nameField.setValue(fileName);
	},
	
	getButtons : function() {
		
		var buttons = [];
		
		if (this.showSubmitButton) {
			
			buttons.push(
				{
					text : this.submitButtonLabel,
					handler : this.onSubmit,
					scope : this
				}
			);
			
		}
		
		if (this.showResetButton) {
			
			buttons.push(
				{
					text : this.resetButtonLabel,
					handler : this.onReset,
					scope : this
				}
			);
			
		}
	
		if (this.showCancelButton) {
			
			buttons.push(
				{
					text : this.cancelButtonLabel,
					handler : this.onCancel,
					scope : this
				}
			);
			
		}
		
		return buttons;
		
	},
	
	onSubmit : function(button, event) {
		this.submitForm();
	},
	
	onReset : function(button , event) {
		var form = this.getForm();
		form.reset();		
	},
	
	onCancel : function(button, event) {
		this.close();
	},
	
	submitForm : function(config) {
		
		config = config || {};
		
		var
			me = this,
			form = this.getForm()
		;
		if (!form.isValid()) return;
		
		var uploadUrl = this.uploadUrl || Yamma.view.windows.UploadFormPanel.ALFRESCO_UPLOAD_URL;
		if (!uploadUrl) {
			Ext.Error.raise(i18n.t('view.window.uploadform.errors.uploadurl'));//'IllegalStateException! The uploadUrl has not been defined');
		}
		
		if (!this.fireEvent('beforeSubmit', form)) return;
		
		form.submit({
			url : Bluedolmen.Alfresco.resolveAlfrescoProtocol(uploadUrl),
			waitMsg : config.waitingMessage || this.waitingMessage,
			success : function onSuccess() {
				
				if (Ext.isFunction(config.onSuccess)) {
					if (false === config.onSuccess.apply(config.scope || me.scope || me, arguments)) return;
				}
				
				me.onSuccess.apply(me.scope || me, arguments);
				
			},
			failure: function onFailure() {
				
				if (Ext.isFunction(config.onFailure)) {
					if (false === config.onFailure.apply(config.scope || me.scope || me, arguments)) return;
				}
				
				me.onFailure.apply(me.scope || me, arguments);
				
			}
		});
		
	},
	
	errorReader : Ext.create('Yamma.view.windows.UploadFormPanel.ErrorReader'),
	
	onFailure : function(form, action) {
		if (action) {
			Ext.Msg.alert('Failure', action.result.message);
		}
	},
	
	onSuccess : function(form, action) {
		
		if (action) {
			Ext.log('Success', 'Processed file "' + action.result.file + '" on the server');
		}
		
		this.fireEvent('submitSuccess', form, action);
	}
});
