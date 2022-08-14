<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The CloudPoodll for TinyMCE
 *
 * @package    tinymce_cloudpodll
 * @author     Justin Hunt (justin@poodll.com)
 * @copyright  2019 onwards, Poodll Co. Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use tinymce_cloudpoodll\constants;
use tinymce_cloudpoodll\utils;

require_once(dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');

$contextid = required_param('contextid', PARAM_INT);

list($context, $course, $cm) = get_context_info_array($contextid);
require_login($course, false, $cm);
require_sesskey();

$PAGE->set_context($context);
$PAGE->set_url(constants::M_ROOT .'/cloudpoodll.php');
$PAGE->set_cacheable(false);
$title = '';
if (isset($cm->name)) {
    $title = $cm->name;
}
$PAGE->set_title($title);
//$PAGE->set_heading($title);

// Reset page layout for inside editor.
$PAGE->set_pagelayout('embedded');

$PAGE->requires->css(new moodle_url($CFG->wwwroot. constants::M_ROOT  .'/tinymce/css/style.css'));
//$PAGE->requires->js(new moodle_url($CFG->wwwroot. constants::M_ROOT  . '/tinymce/js/dialog.js'), true);

$jsvars = array(
);
$PAGE->requires->data_for_js(constants::M_SUBPLUGIN, $jsvars);

$jsmodule = array(
        'name'     => constants::M_COMPONENT,
        'fullpath' => constants::M_ROOT  . '/tinymce/js/dialog.js'
);
$PAGE->requires->js_init_call('M.' . constants::M_COMPONENT . '.init', array(), false, $jsmodule);

// Get localized strings for use in JavaScript.
$stringmanager = get_string_manager();
$strings = $stringmanager->load_component_strings(constants::M_COMPONENT , $USER->lang);
$PAGE->requires->strings_for_js(array_keys($strings), constants::M_COMPONENT );

$output = $PAGE->get_renderer(constants::M_COMPONENT);

echo $output->header();
echo $output->render_scripts();

echo $output->footer();
