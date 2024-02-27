wp.blocks.registerBlockType('blocktheme/singleprogram', {
    title: 'Custom Single Program',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Single Program Placeholder');
    },
    save: function () {
        return null;
    },
});
