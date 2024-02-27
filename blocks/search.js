wp.blocks.registerBlockType('blocktheme/search', {
    title: 'Custom Search',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Search Placeholder');
    },
    save: function () {
        return null;
    },
});
