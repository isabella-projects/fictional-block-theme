wp.blocks.registerBlockType('blocktheme/eventsandblogs', {
    title: 'Events and Blogs',
    edit: function () {
        return wp.element.createElement('div', { className: 'placeholder-block' }, 'Events and Blogs post');
    },
    save: function () {
        return null;
    },
});
