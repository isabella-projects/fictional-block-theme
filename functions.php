<?php

require get_theme_file_path('/inc/search-route.php');
require get_theme_file_path('/inc/like-route.php');

function university_custom_rest()
{
    register_rest_field('post', 'authorName', [
        'get_callback' => fn () => get_the_author(),
    ]);
    register_rest_field('note', 'userNoteCount', [
        'get_callback' => fn () => count_user_posts(get_current_user_id(), 'note'),
    ]);
}

add_action('rest_api_init', 'university_custom_rest');

function pageBanner($args = NULL)
{

    if (!isset($args['title'])) {
        $args['title'] = get_the_title();
    }

    if (!isset($args['subtitle'])) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }

    if (!isset($args['photo'])) {
        if (get_field('page_banner_background_image') and !is_archive() and !is_home()) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }

?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>);"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args['subtitle']; ?></p>
            </div>
        </div>
    </div>
<?php }


function university_files()
{
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('univeristy_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('univeristy_extra_styles', get_theme_file_uri('/build/index.css'));

    wp_localize_script('main-university-js', 'universityData', [
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features()
{
    // register_nav_menu('headerMenuLocation', 'Header Menu Location');
    // register_nav_menu('footerLocationOne', 'Footer Location One');
    // register_nav_menu('footerLocationTwo', 'Footer Location Two');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
    /* Activate styling for block theme */
    add_theme_support('editor-styles');
    add_editor_style(
        [
            'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i',
            'build/style-index.css',
            'build/index.css'
        ]
    );
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query)
{
    if (!is_admin() && is_post_type_archive('program') && $query->is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }

    if (!is_admin() && is_post_type_archive('event') && $query->is_main_query()) {
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', [
            [
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
            ]
        ]);
    }
}

add_action('pre_get_posts', 'university_adjust_queries');

// Redirect subscriber accounts out of admin and onto homepage
add_action('admin_init', 'redirectSubs');

function redirectSubs()
{
    $currentUser = wp_get_current_user();

    if (count($currentUser->roles) == 1 && $currentUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        exit;
    }
}

// Hide admin dashboard for subscribers

add_action('wp_loaded', 'adminDashboard');

function adminDashboard()
{
    $currentUser = wp_get_current_user();

    if (count($currentUser->roles) == 1 && $currentUser->roles[0] == 'subscriber') {
        show_admin_bar(false);
    }
}

// Customize login screen
add_filter('login_headerurl', 'headerURL');

function headerURL()
{
    return esc_url(site_url('/'));
}

add_action('login_enqueue_scripts', 'loginCSS');

function loginCSS()
{
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('univeristy_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('univeristy_extra_styles', get_theme_file_uri('/build/index.css'));
}

add_filter('login_headertext', 'loginTitle');

function loginTitle()
{
    return esc_html__(get_bloginfo('name'));
}

// Force note posts to be private
add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2);

function makeNotePrivate($data, $postArr)
{
    if ($data['post_type'] == 'note') {

        if (count_user_posts(get_current_user_id(), 'note') > 4 && !$postArr['ID']) {
            die("You have reached your note limit.");
        }

        $data['post_content'] = sanitize_textarea_field($data['post_content']);
        $data['post_title'] = sanitize_text_field($data['post_title']);
    }

    if ($data['post_type'] == 'note' && $data['post_status'] != 'trash') {
        $data['post_status'] = 'private';
    }

    return $data;
}

// All-In-One WP Migration plugin filter to exclude node_modules's large files from exporting
add_filter('ai1wm_exclude_themes_from_export', 'ignoreFiles');

function ignoreFiles()
{
    $exclude_filters[] = 'fictional-university-theme/node_modules';
    return $exclude_filters;
}

class PlaceholderBlock
{
    private $name;

    public function __construct($name)
    {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    public function fnRenderCallback($attributes, $content)
    {
        ob_start();
        require get_theme_file_path("blocks/{$this->name}.php");
        return ob_get_clean();
    }

    public function onInit()
    {
        wp_register_script(
            $this->name,
            get_stylesheet_directory_uri() . "/blocks/{$this->name}.js",
            [
                'wp-blocks',
                'wp-editor'
            ]
        );

        register_block_type(
            "blocktheme/{$this->name}",
            [
                'editor_script' => $this->name,
                'render_callback' => [$this, 'fnRenderCallback']
            ]
        );
    }
}

new PlaceholderBlock('eventsandblogs');
new PlaceholderBlock('header');
new PlaceholderBlock('footer');
new PlaceholderBlock('singlepost');
new PlaceholderBlock('page');
new PlaceholderBlock('blogindex');
new PlaceholderBlock('programarchive');
new PlaceholderBlock('singleprogram');
new PlaceholderBlock('singleprofessor');
new PlaceholderBlock('mynotes');
new PlaceholderBlock("archiveevent");
new PlaceholderBlock("archive");
new PlaceholderBlock("pastevents");
new PlaceholderBlock("search");
new PlaceholderBlock("searchresults");
new PlaceholderBlock("singleevent");

class JSXBlock
{
    private $name;
    private $renderCallback;
    private $data;

    /**
     * Constructor
     *
     * @param string $name File name of the JSX block
     * @param boolean $renderCallback True if the instance should include WP render_callback, false otherwise
     * @param array $data Accepts the whole script, which then will be processed into JavaScript object
     */
    public function __construct($name, $renderCallback = null, $data = null)
    {
        $this->name = $name;
        $this->renderCallback = $renderCallback;
        $this->data = $data;
        add_action('init', [$this, 'onInit']);
    }

    /**
     * Function is being used inside blocks/*.php files.
     * Renders user uploaded image and outputs it on the frontend.
     *
     * @param string $attributes
     * @param string $content
     * @return string|false
     */
    public function fnRenderCallback($attributes, $content)
    {
        ob_start();
        require get_theme_file_path("blocks/{$this->name}.php");
        return ob_get_clean();
    }

    public function onInit()
    {
        wp_register_script(
            $this->name,
            get_stylesheet_directory_uri() . "/build/{$this->name}.jsx.js",
            [
                'wp-blocks',
                'wp-editor'
            ]
        );

        if ($this->data) {
            wp_localize_script(
                $this->name,
                $this->name,
                $this->data
            );
        }

        $args = ['editor_script' => $this->name];
        if ($this->renderCallback) {
            $args['render_callback'] = [$this, 'fnRenderCallback'];
        }

        register_block_type("blocktheme/{$this->name}", $args);
    }
}

new JSXBlock(
    'banner',
    true,
    ['fallback_image' => get_theme_file_uri('/images/library-hero.jpg')]
);
new JSXBlock('genericheading');
new JSXBlock('genericbutton');
new JSXBlock('slideshow', true);
new JSXBlock('slide', true, ['themeimagepath' => get_theme_file_uri('/images/')]);

add_filter('allowed_block_types_all', 'allowedBlocks', 10, 2);

function allowedBlocks($allowed_block_types, $editor_context)
{
    // If we are on a page/post editor screen
    if (!empty($editor_context->post)) {
        return $allowed_block_types;
    }

    // If we are on the full site editor screen
    return [
        'blocktheme/header',
        'blocktheme/footer'
    ];
}
