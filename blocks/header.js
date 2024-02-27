wp.blocks.registerBlockType('blocktheme/header', {
    title: 'Custom Header',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Header placeholder');
    },
    save: function () {
        return null;
    },
});
