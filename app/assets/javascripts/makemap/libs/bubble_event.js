Ext.define("MM.libs.bubble_event",{
  extend: "Ext.Component",
  config: {
    events: ['change'],
    target: 'panel'
  },
  
  init: function( field ) {
    Ext.each( this.getEvents(), function(e){
      console.log("Event:",e, arguments);

      var target_name = this.getTarget();

      var handler = function(field, nv, ov) {
        var target = field.up(target_name);
        target.fireEvent(e, field, nv, ov);
        console.log(this);
      };

      field.on(e, handler, { stopEvent: true });
    },this);
  },

  constructor: function( config ) {
    this.initConfig(config);
    this.callParent(arguments);
  }

});