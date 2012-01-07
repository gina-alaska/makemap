//= require_self
//= require_tree ./openlayers
//= require_tree ./makemap/model
//= require_tree ./makemap/store
//= require_tree ./makemap/view
//= require_tree ./makemap/controller



Ext.application({
  name: 'MM',

  appFolder: 'makemap',

  views: ['map','controls'],
  controllers: ['Map','Controls','Makemap'],
  
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [{
        xtype: 'panel',
        height: 100,
        region: 'north'
      },{
        region: 'center',
        xtype: 'panel',
        layout: 'fit',
        itemId: 'content'
      },{
        xtype: 'mapcontrols',
        width: 300,
        split: true,
        region: "east",
        id: "sidebar"
      }]
    });
  }
});