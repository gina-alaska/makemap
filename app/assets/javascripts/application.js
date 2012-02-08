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

  views: ['map','controls','savedlist'],
  controllers: ['Map','Controls','Makemap'],
  stores: ['SavedMaps'],
  
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
        xtype: 'panel',
        width: 300,
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        region: 'east',
        items: [{
          xtype: 'mapcontrols',
          split: true,
          id: "sidebar"
        },{
          xtype: 'panel',
          id: 'savedlist',
          layout: 'fit',
          title: 'Saved Maps',
          items: [{
            xtype: 'savedlist',
            store: this.getStore("SavedMaps")
          }],

          flex: 1
        }]
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