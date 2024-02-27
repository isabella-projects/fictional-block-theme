wp.blocks.registerBlockType('blocktheme/page', {
    title: 'Custom Single Page',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Single Page Placeholder');
    },
    save: function () {
        return null;
    },
});
