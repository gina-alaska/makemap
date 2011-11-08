//= require_self
//= require_tree ./makemap/model
//= require_tree ./makemap/store
//= require_tree ./makemap/view
//= require_tree ./makemap/controller



Ext.application({
  name: 'MM',

  appFolder: 'makemap',


  views: ['map'],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [{
        xtype: 'panel',
        title: 'Controls',
        html : '<h1>Making maps is fun!</h1>',
        region: 'north'
      },{
        xtype: 'map',
       // xtype: 'panel',
        html: "I'm a map",
        region: 'center'
      },{
        xtype: 'panel',
        html: "I do stuff",
        region: "east"
      }]
    });
  }
});