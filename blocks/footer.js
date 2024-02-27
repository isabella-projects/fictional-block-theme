wp.blocks.registerBlockType('blocktheme/footer', {
    title: 'Custom Footer',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Footer placeholder');
    },
    save: function () {
        return null;
    },
});
