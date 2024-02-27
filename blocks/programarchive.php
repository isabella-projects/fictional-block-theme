<?php

pageBanner([
    'title' => 'All Programs',
    'subtitle' => 'There is something for everyone. Have a look around'
]);
?>

<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
        <!-- Pagination depending on posts length (adjust if needed in WP-Admin) -->
        <?= paginate_links(); ?>
    </ul>
</div>