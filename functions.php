<?php
/**
 * Tentacoos Theme functions
 *
 * Block theme: keep this minimal. Most styling is in theme.json.
 */

if (!defined('ABSPATH')) { exit; }

add_action('after_setup_theme', function() {
  // Core supports
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('responsive-embeds');
  add_theme_support('wp-block-styles');
  add_theme_support('editor-styles');

  // Navigation menus (can be used with the Navigation block as menu sources)
  register_nav_menus([
    'primary' => __('Primary Menu', 'tentacoos'),
    'footer'  => __('Footer Menu', 'tentacoos'),
  ]);
});

// Example: enqueue a small front-end script if/when needed
add_action('wp_enqueue_scripts', function() {
  // Load Poppins from Google Fonts to match theme.json typography settings
  wp_enqueue_style(
    'tentacoos-fonts',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    [],
    null
  );
  wp_enqueue_style(
    'tentacoos-frontend',
    get_theme_file_uri('/assets/css/front.css'),
    [],
    '0.1.0'
  );
  wp_enqueue_script(
    'tentacoos-frontend',
    get_theme_file_uri('/assets/js/front.js'),
    [],
    '0.1.0',
    true
  );
});
