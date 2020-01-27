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
 * TinyMCE text editor integration version file.
 *
 * @package    tinymce_cloudpoodll
 * @copyright  2018 Justin Hunt <poodllsupport@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


use tinymce_cloudpoodll\constants;
use tinymce_cloudpoodll\utils;

/**
 * Plugin for PoodLL Anywhere button.
 *
 * @package   tinymce_poodll
 * @copyright 2013 Justin Hunt
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class tinymce_cloudpoodll extends editor_tinymce_plugin {
    /** @var array list of buttons defined by this plugin */
    protected $buttons = array('cloudpoodllaudio','cloudpoodllvideo');

    /**
     * Initialise this plugin
     * @param string $elementid
     */
    protected function update_init_params(array &$params, context $context,
                                          array $options = null) {

        global $CFG, $PAGE,$USER;

        $langstrings=[];
        foreach(utils::get_lang_options() as $key=>$value){
            $langstrings[]= strtolower($key);

        };

        $otherstrings =array('createaudio','createvideo','insert','cancel','audio','video','upload','subtitle','options','subtitlecheckbox',
                'mediainsertcheckbox','subtitleinstructions','audio_desc','video_desc',
                'speakerlanguage','uploadinstructions','notoken');

        $strings = array_merge($langstrings ,$otherstrings);

        $PAGE->requires->strings_for_js($strings, constants::M_COMPONENT);


        //use tinymce/poodll:visible capability
        //If they don't have permission don't show it
        if(!has_capability('tinymce/cloudpoodll:visible', $context) ){
            return;
        }


        $recorders = array('audio','video');
        foreach($recorders as $recorder){
            $enablemedia = get_config('tinymce_cloudpoodll','enable' . $recorder);
            if($enablemedia && has_capability('tinymce/cloudpoodll:allow' . $recorder, $context)){
                $this->add_button_after($params, 3, 'cloudpoodll' . $recorder, 'image');
            }
        }



        //cloudpoodll params
        $config = get_config('tinymce_cloudpoodll');

        //subitling ok
        $cansubtitle = utils::can_transcribe($config) &&
            $config->enablesubtitling &&
            has_capability('tinymce/cloudpoodll:allowsubtitling', $context);
        
        $cp_params = array();
        $cp_params['cp_wwwroot'] = $CFG->wwwroot;
        $cp_params['cp_expiredays'] = $config->expiredays;
        $cp_params['cp_cansubtitle'] = $cansubtitle;
        $cp_params['cp_token'] = utils::fetch_token($config->apiuser,$config->apisecret);
        $cp_params['cp_region'] = $config->awsregion;
        $cp_params['cp_owner'] = hash('md5',$USER->username);
        $cp_params['cp_language'] = $config->language;
        $cp_params['cp_expiredays'] = $config->expiredays;
        $cp_params['cp_transcode'] = "1";
        $cp_params['cp_audioskin'] = $config->audioskin;
        $cp_params['cp_videoskin'] = $config->videoskin;
        $cp_params['cp_fallback'] = $config->fallback;
        $cp_params['cp_contextid'] = $context->id;
        $cp_params['cp_sesskey'] = sesskey();

        //insert method
        $cp_params['insertmethod']=constants::INSERT_LINK;//$config->insertmethod;
        $cp_params['subtitleaudiobydefault']=$config->subtitleaudiobydefault;
        $cp_params['subtitlevideobydefault']=$config->subtitlevideobydefault;

        // Set our plugin params to the tinymce params object and tell tinymce about it
        $params['cloudpoodll']=$cp_params;
        $this->add_js_plugin($params);
    }

    protected function get_sort_order() {
        return 120;
    }
}