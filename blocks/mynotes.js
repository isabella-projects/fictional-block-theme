wp.blocks.registerBlockType('blocktheme/mynotes', {
    title: 'Custom My Notes',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'My Notes Placeholder');
    },
    save: function () {
        return null;
    },
});
