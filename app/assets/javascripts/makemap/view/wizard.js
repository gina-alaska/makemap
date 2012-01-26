Ext.define('MM.view.Wizard',{
  extend: 'Ext.panel.Panel',
  alias: 'widget.wizard',

  layout: 'card',

  initComponent: function() {
    this.items = [{
      id: 'card-0',
      html: 'Welcome to MakeMap'
    },{
      id: 'card-1',
      html: 'Zoom to your region of interest'
    }];

    this.bbar = [ '->', {
      id: 'card-prev',
      text: 'Previous'
    },{
      id: 'card-next',
      text: 'Next'
    }];

    this.callParent(arguments);
  }
});