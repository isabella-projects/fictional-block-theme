wp.blocks.registerBlockType('blocktheme/archive', {
    title: 'Custom Archive',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Archive Placeholder');
    },
    save: function () {
        return null;
    },
});
