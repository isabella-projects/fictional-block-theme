wp.blocks.registerBlockType('blocktheme/singleprofessor', {
    title: 'Custom Single Professor',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Single Professor Placeholder');
    },
    save: function () {
        return null;
    },
});
