wp.blocks.registerBlockType('blocktheme/archiveevent', {
    title: 'Custom Event Archive',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Event Archive Placeholder');
    },
    save: function () {
        return null;
    },
});
