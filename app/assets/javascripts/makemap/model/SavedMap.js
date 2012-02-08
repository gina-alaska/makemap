Ext.define('MM.model.SavedMap', {
  extend: 'Ext.data.Model',
  fields: [ 'id', 'name', 'format', 'zoomlevel', 'bbox','width','height',
            'wms', 'baselayer', 'overlays', 'url', 'imageUrl', 'thumbUrl' ]
});
