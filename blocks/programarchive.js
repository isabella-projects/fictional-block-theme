wp.blocks.registerBlockType('blocktheme/programarchive', {
    title: 'Custom Program Archive',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Program Archive');
    },
    save: function () {
        return null;
    },
});
