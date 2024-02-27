wp.blocks.registerBlockType('blocktheme/singleevent', {
    title: 'Custom Single Event',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Single Event Placeholder');
    },
    save: function () {
        return null;
    },
});
