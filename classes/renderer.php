<?php
/**
 * Created by PhpStorm.
 * User: ishineguy
 * Date: 2018/05/12
 * Time: 23:42
 */

namespace tinymce_cloudpoodll\output;

defined('MOODLE_INTERNAL') || die();


class renderer extends \plugin_renderer_base {

    /**
     * Return dialog content
     */
    public function dialog_content(){
        return $this->output->header();
    }
    /**
     * Renders the HTML to include the necessary scripts.
     * @return string
     */
    public function render_scripts() {
        $output = \html_writer::start_tag('script', array('type' => 'text/javascript'));
        $output .= 'var editor_tinymce_include = function(path) {'."\n";
        $output .= 'document.write(\'<script type="text/javascript" src="\' + parent.tinyMCE.baseURL + \'/\' +
                    path + \'"></\' + \'script>\');'."\n";
        $output .= '};'."\n";
        $output .= 'editor_tinymce_include(\'tiny_mce_popup.js\');'."\n";
        $output .= 'editor_tinymce_include(\'utils/validate.js\');'."\n";
        $output .= 'editor_tinymce_include(\'utils/form_utils.js\');'."\n";
        $output .= 'editor_tinymce_include(\'utils/editable_selects.js\');'."\n";
        $output .= \html_writer::end_tag('script');

        return $output;
    }



}//end of class