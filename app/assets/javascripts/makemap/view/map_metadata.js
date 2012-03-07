Ext.define("MM.view.map_metadata", {
  extend: 'Ext.window.Window',
  alias: 'widget.map_metadata',
  width: 500,
  height: 500,
  layout: 'fit',
  constrain: true,
  modal: true,
  draggable: false,
  
  config: {
    record: null
  },
  
  initComponent: function() {
    this.title = this.getRecord().get('name');
    
    this.items = [{
      border: false,
      autoScroll: true,
      loader: {
        url: '/mapsaves/' + this.getRecord().get('id'),
        renderer: 'html',
        autoLoad: true
      }
    }];
    
    this.callParent(arguments);
  }
});