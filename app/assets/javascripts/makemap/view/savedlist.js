Ext.define("MM.view.savedlist",{
  extend: "Ext.view.View",
  alias: "widget.savedlist",
  title: 'Your Saved Maps',
  cls: "savedlist",

  tpl: new Ext.XTemplate(
    '<tpl for=".">',
      '<div class="saved_wrap" id="savedMap_{id}">',
        '<div class="map_image"><img src={thumbUrl} class="saved_thumb"></div>',
        '<div class="name">{name}</div>',
        '<div class="link"><a href="{imageUrl}">Full size</a></div>',
      '</div>',
    '</tpl>'
  ),

  autoScroll: true,
  autoRender: true,
  trackOver: true,
  overItemCls: 'x-item-over',
  itemSelector: 'div.saved_wrap',
  loadingTest: 'Loading saved maps',
  singleSelect: true,
  allowDeselect: true,  
  emptyText: "No saved maps available",
  layout: 'fit',

  initComponent: function() {
    this.callParent(arguments);
  }
});
