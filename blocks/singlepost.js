wp.blocks.registerBlockType('blocktheme/singlepost', {
    title: 'Custom Single Post',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Single post placeholder');
    },
    save: function () {
        return null;
    },
});
