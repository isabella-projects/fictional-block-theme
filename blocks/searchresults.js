wp.blocks.registerBlockType('blocktheme/searchresults', {
    title: 'Custom Search Results',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Custom Search Results Placeholder');
    },
    save: function () {
        return null;
    },
});
