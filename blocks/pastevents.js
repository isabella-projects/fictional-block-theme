wp.blocks.registerBlockType('blocktheme/pastevents', {
    title: 'Custom Past Events',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Past Events Placeholder');
    },
    save: function () {
        return null;
    },
});
