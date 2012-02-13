Ext.define('MM.store.SavedMaps', {
  extend: 'Ext.data.Store',
  model: 'MM.model.SavedMap',
  storeId: "SavedMaps",
  proxy: {
    type: 'ajax',
    url: '/makemaps.json',
    timeout: 120000,
    reader: { type: 'json', totalProperty: 'total', root: 'maps' }
  },
  autoLoad: true,
  sorters: [{
    direction: 'DESC',
    property: 'created_at'
  }]
});