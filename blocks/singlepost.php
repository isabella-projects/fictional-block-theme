<?php pageBanner(); ?>

<div class="container container--narrow page-section">
    <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
            <a class="metabox__blog-home-link" href="<?= site_url('/blog'); ?>"><i class="fa fa-home" aria-hidden="true"></i> Blog Home</a> <span class="metabox__main">Posted by <?php the_author_posts_link(); ?> on <?php the_time('F j, Y - g:i a') ?> in <?= get_the_category_list('and'); ?></span>
        </p>
    </div>
    <div class="generic-content"><?php the_content(); ?></div>
</div>