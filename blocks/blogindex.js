wp.blocks.registerBlockType('blocktheme/blogindex', {
    title: 'Custom Blog Index',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Blog Index');
    },
    save: function () {
        return null;
    },
});
