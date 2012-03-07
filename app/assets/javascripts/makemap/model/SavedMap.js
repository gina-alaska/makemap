Ext.define('MM.model.SavedMap', {
  extend: 'Ext.data.Model',
  fields: [ 'id', 'name', 'format','bbox','width','height', 'filesize',
            'wms', 'baselayer', 'overlays', 'url', 'imageUrl', 'thumbUrl', 'created_at' ]
});
