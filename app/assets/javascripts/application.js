//= require_self
//= require_tree ./openlayers
//= require_tree ./makemap/libs
//= require_tree ./makemap/model
//= require_tree ./makemap/store
//= require_tree ./makemap/view
//= require_tree ./makemap/controller



Ext.application({
  name: 'MM',

  appFolder: 'makemap',


  views: ['map','controls','pixelsize'],
  controllers: ['Map','Controls'],
  
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