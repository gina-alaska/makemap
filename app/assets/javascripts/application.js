//= require_self
//= require ./gina-map-layers/gina.js
//= require ./gina-map-layers/builders/openlayers.js
//= require ./openlayers/Basic.js
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
        height: 50,
        region: 'north',
        html: "<span class='capital'>M</span>ake<span class='capital'>M</span>ap",
        bodyCls: "header",
        border: false
      },{
        region: 'center',
        xtype: 'panel',
        layout: 'fit',
        itemId: 'content',
        border: false
      },{
        xtype: 'mapcontrols',
        width: 300,
        split: true,
        region: "east",
        id: "sidebar"
      },{
        xtype: 'panel',
        height: 20,
        region: 'south',
        html: "Powered by <a href='http://www.gina.alaska.edu'>GINA</a>",
        bodyCls: "poweredBy"
      }]
    });
  }
});