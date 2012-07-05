var YammaModel = new (function(){
	
	var me = this;
	
	this.YAMMA_NS_PREFIX = 'yamma-ee';
	this.YAMMA_PREFIX = '';
	this.ADMIN_SITE_NAME = 'admin'; // TODO: outside of model namesapce?
	
	this.TRAY_TYPE_SHORTNAME = dfn('Tray');
	
	// DOCUMENT TYPE DEFINITION
	this.DOCUMENT_TYPE_SHORTNAME = dfn('Document');
	
	this.DOCUMENT_COPY_ASPECT_SHORTNAME = dfn('DocumentCopy');
	this.DOCUMENT_COPY_ORIGINAL_ASSOCNAME = dfna(this.DOCUMENT_COPY_ASPECT_SHORTNAME, this.DOCUMENT_TYPE_SHORTNAME, 'original');
	
	this.DOCUMENT_CONTAINER_SHORTNAME = dfn('DocumentContainer');
	this.DOCUMENT_CONTAINER_REFERENCE_ASSOCNAME = dfna(this.DOCUMENT_CONTAINER_SHORTNAME, this.DOCUMENT_TYPE_SHORTNAME, 'reference');
	
	// MAIL TYPE DEFINITION
	this.MAIL_TYPE_SHORTNAME = dfn('Mail');
	this.MAIL_STAMP_DATE_PROPNAME = dfnp(this.MAIL_TYPE_SHORTNAME, 'stampDate');
	this.MAIL_DELIVERY_DATE_PROPNAME = dfnp(this.MAIL_TYPE_SHORTNAME, 'deliveryDate');
	this.MAIL_WRITING_DATE_PROPNAME = dfnp(this.MAIL_TYPE_SHORTNAME, 'writingDate');
	this.MAIL_OBJECT_PROPNAME = dfnp(this.MAIL_TYPE_SHORTNAME, 'object');
	
	// DATALISTS TYPE DEFINITIONS
	this.ASSIGNABLE_SITE_TYPE_SHORTNAME = dfn('AssignableSite');
	this.DELAY_TYPE_SHORTNAME = dfn('Delay');
	this.PRIVACY_LEVEL_TYPE_SHORTNAME = dfn('PrivacyLevel');
	this.STATUS_LEVEL_TYPE_SHORTNAME = dfn('Status');
	
	// ASPECTS DEFINITIONS
	this.COMMENTABLE_ASPECT_SHORTNAME = dfn('Commentable');
	this.COMMENTABLE_COMMENT_PROPNAME = dfnp(this.COMMENTABLE_ASPECT_SHORTNAME, 'comment');
	
	this.CORRESPONDENT_ASPECT_SHORTNAME = dfn('Correspondent');
	this.CORRESPONDENT_NAME_PROPNAME = dfnp(this.CORRESPONDENT_ASPECT_SHORTNAME, 'name');
	this.CORRESPONDENT_ADDRESS_PROPNAME = dfnp(this.CORRESPONDENT_ASPECT_SHORTNAME, 'address');
	this.CORRESPONDENT_CONTACT_EMAIL_PROPNAME = dfnp(this.CORRESPONDENT_ASPECT_SHORTNAME, 'contactEmail');
	this.CORRESPONDENT_CONTACT_PHONE_PROPNAME = dfnp(this.CORRESPONDENT_ASPECT_SHORTNAME, 'contactPhone');
	
	this.DIGITIZABLE_ASPECT_SHORTNAME = dfn('Digitizable');
	this.DIGITIZABLE_DIGITIZED_DATE_PROPNAME = dfnp(this.DIGITIZABLE_ASPECT_SHORTNAME, 'digitizedDate');
	
	this.REFERENCEABLE_ASPECT_SHORTNAME = dfn('Referenceable');
	this.REFERENCEABLE_REFERENCE_PROPNAME = dfnp(this.REFERENCEABLE_ASPECT_SHORTNAME, 'reference');
	
	this.ASSIGNABLE_ASPECT_SHORTNAME = dfn('Assignable');
	this.ASSIGNABLE_SERVICE_ASSOCNAME = dfna(this.ASSIGNABLE_ASPECT_SHORTNAME, this.ASSIGNABLE_SITE_TYPE_SHORTNAME, 'service');
	
	this.DISTRIBUTABLE_ASPECT_SHORTNAME = dfn('Distributable');
	this.DISTRIBUTABLE_SERVICES_ASSOCNAME = dfna(this.DISTRIBUTABLE_ASPECT_SHORTNAME, this.ASSIGNABLE_SITE_TYPE_SHORTNAME, 'services');
	
	this.PRIORITIZABLE_ASPECT_SHORTNAME = dfn('Prioritizable');
	this.PRIORITIZABLE_DELAY_ASSOCNAME = dfna(this.PRIORITIZABLE_ASPECT_SHORTNAME, this.DELAY_TYPE_SHORTNAME, 'delay');
	
	this.PRIVACY_ASPECT_SHORTNAME = dfn('Privacy');
	this.PRIVACY_PRIVACY_LEVEL_ASSOCNAME = dfna(this.PRIVACY_ASPECT_SHORTNAME, this.PRIVACY_LEVEL_TYPE_SHORTNAME, 'level');
	
	this.STATUSABLE_ASPECT_SHORTNAME = dfn('Statusable');
	this.STATUSABLE_EXTENDED_ASSOCNAME = dfna(this.STATUSABLE_ASPECT_SHORTNAME, this.STATUS_LEVEL_TYPE_SHORTNAME, 'extended');
	this.STATUSABLE_STATE_PROPNAME = dfnp(this.STATUSABLE_ASPECT_SHORTNAME, 'state');

	this.EVENT_TYPE_SHORTNAME = dfn('Event');
	this.EVENT_DATE_PROPNAME = dfnp(this.EVENT_TYPE_SHORTNAME, 'date');
	this.EVENT_EVENT_TYPE_PROPNAME = dfnp(this.EVENT_TYPE_SHORTNAME, 'eventType');
	this.EVENT_COMMENT_PROPNAME = dfnp(this.EVENT_TYPE_SHORTNAME, 'comment');
	this.EVENT_REFERRER_PROPNAME = dfnp(this.EVENT_TYPE_SHORTNAME, 'referrer');
	
	this.HISTORIZABLE_ASPECT_SHORTNAME = dfn('Historizable');
	this.HISTORIZABLE_HISTORY_ASSOCNAME = dfna(this.HISTORIZABLE_ASPECT_SHORTNAME, this.EVENT_TYPE_SHORTNAME, 'history');
	
	this.DOCUMENT_STATE_PENDING = 'pending';
	this.DOCUMENT_STATE_DELIVERING = 'delivering';
	this.DOCUMENT_STATE_PROCESSING = 'processing';
	this.DOCUMENT_STATE_VALIDATING_DELIVERY = 'validating!delivery';
	this.DOCUMENT_STATE_VALIDATING_PROCESSED = 'validating!processed';
	this.DOCUMENT_STATE_UNKNOWN = 'unknown';
	
	/**
	 * Get the declaration full-name based on the composition of the namespace prefix
	 * and of the prefix.
	 */
	function dfn(shortName, prefix) {
		return me.YAMMA_NS_PREFIX + ':' + me.YAMMA_PREFIX + shortName;
	}
	
	function dfnp(classShortName, attributeName) {
		return classShortName + '_' + attributeName;
	}
	
	function dfna(sourceClassShortName, targetClassShortName, assocName) {
		return me.YAMMA_NS_PREFIX + ':' + localName(sourceClassShortName) + '_' + assocName + '_' + localName(targetClassShortName);
		
		function localName(classShortName) {
			if (!classShortName) return classShortName;
			
			var colonPosition = classShortName.indexOf(':');
			if (colonPosition == -1) return classShortName;
			
			return classShortName.substr(colonPosition + 1);
		}
		
	}

	
	
});

