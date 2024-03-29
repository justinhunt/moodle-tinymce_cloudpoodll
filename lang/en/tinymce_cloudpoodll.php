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
 * Strings for component 'tinymce_cloudpoodll', language 'en'.
 *
 * @package    tinymce_cloudpoodll
 * @copyright  2018 Justin Hunt <justin@poodll.com,>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['pluginname'] = 'Cloud Poodll';
$string['privacy:metadata:cloudpoodllcom'] =
        'The tinymce_cloudpoodll plugin stores recordings in AWS S3 buckets via cloud.poodll.com.';
$string['privacy:metadata:cloudpoodllcom:userid'] =
        'The tinymce_cloudpoodll plugin includes the moodle userid in the urls of recordings.';

$string['cloudpoodll:cloudpoodllaudio'] = 'Audio Recorder';
$string['cloudpoodll:cloudpoodllvideo'] = 'Video Recorder';

$string['cloudpoodll'] = 'Cloud Poodll';
$string['recorder'] = 'Recorder Type';
$string['recorderaudio'] = 'Audio Recorder';
$string['recordervideo'] = 'Video Recorder';

$string['apiuser'] = 'Poodll API User ';
$string['apiuser_details'] = 'The Poodll account username that authorises Poodll on this site.';
$string['apisecret'] = 'Poodll API Secret ';
$string['apisecret_details'] =
        'The Poodll API secret. See <a href= "https://support.poodll.com/support/solutions/articles/19000083076-cloud-poodll-api-secret">here</a> for more details';
$string['enablesubtitling'] = 'Enable Subtitling';
$string['enablesubtitling_details'] = 'Cloud Poodll can create subtitles automatically if required. See language settings';

$string['subtitleaudiobydefault'] = 'Subtitle Audio by default';
$string['subtitlevideobydefault'] = 'Subtitle Video by default';
$string['subtitlebydefault_details'] =
        'If true Cloud Poodll will check subtitling by default. It can be turned off from the options tab on the popup. Only subtitle by default if you need to.';

$string['language'] = 'Transcription language';
$string['speakerlanguage'] = 'Speaker language';
$string['en-us'] = 'English (US)';
$string['en-gb'] = 'English (GB)';
$string['en-au'] = 'English (AU)';
$string['en-in'] = 'English (IN)';
$string['es-es'] = 'Spanish (ES)';
$string['es-us'] = 'Spanish (US)';
$string['fr-fr'] = 'French (FR.)';
$string['fr-ca'] = 'French (CA)';
$string['ko-kr'] = 'Korean(KR)';
$string['pt-br'] = 'Portuguese(BR)';
$string['it-it'] = 'Italian(IT)';
$string['de-de'] = 'German(DE)';
$string['hi-in'] = 'Hindi(IN)';

$string['ar-ae'] = 'Arabic (Gulf)';
$string['ar-sa'] = 'Arabic (Modern Standard)';
$string['zh-cn'] = 'Chinese (Mandarin-Mainland)';
$string['nl-nl'] = 'Dutch';
$string['en-ie'] = 'English (Ireland)';
$string['en-wl'] = 'English (Wales)';
$string['en-ab'] = 'English (Scotland)';
$string['fa-ir'] = 'Farsi';
$string['de-ch'] = 'German (Swiss)';
$string['he-il'] = 'Hebrew';
$string['id-id'] = 'Indonesian';
$string['ja-jp'] = 'Japanese';
$string['ms-my'] = 'Malay';
$string['pt-pt'] = 'Portuguese (PT)';
$string['ru-ru'] = 'Russian';
$string['ta-in'] = 'Tamil';
$string['te-in'] = 'Telugu';
$string['tr-tr'] = 'Turkish';

$string['uploadinstructions'] = 'Drag and drop, or choose a media file, to upload it.';

$string['insertmethod'] = 'Insert method';
$string['insertmethod_details'] =
        'Insert media links or media tags. Either way a Moodle filter will show a player when the page is displayed.';
$string['insertlinks'] = 'Media links';
$string['inserttags'] = 'Audio/video tags';

$string['upload'] = 'Upload';
$string['audio'] = 'Audio';
$string['audio_desc'] = 'Audio recorder';
$string['video'] = 'Video';
$string['video_desc'] = 'Video recorder';
$string['insert'] = 'Insert';
$string['cancel'] = 'Cancel';
$string['createvideo'] = 'Create Video';
$string['createaudio'] = 'Create Audio';

$string['useast1'] = 'US East';
$string['tokyo'] = 'Tokyo, Japan (no subtitling)';
$string['sydney'] = 'Sydney, Australia';
$string['dublin'] = 'Dublin, Ireland';
$string['ottawa'] = 'Ottawa, Canada (slow)';
$string['frankfurt'] = 'Frankfurt, Germany (slow, no subtitling)';
$string['london'] = 'London, U.K (slow, no subtitling)';
$string['saopaulo'] = 'Sao Paulo, Brazil (slow, no subtitling)';
$string['singapore']='Singapore';
$string['mumbai']='Mumbai, India';
$string['capetown'] = 'Capetown, South Africa';
$string['bahrain'] = 'Bahrain';

$string['forever'] = 'Never expire';
$string['awsregion'] = 'AWS Region';
$string['region'] = 'AWS Region';
$string['expiredays'] = 'Days to keep file';
$string['audioskin'] = 'Audio recorder';
$string['videoskin'] = 'Video recorder';

$string['timelimit'] = 'Recording Time Limit';
$string['currentsubmission'] = 'Current Submission:';
$string['yes'] = 'yes';
$string['no'] = 'no';

$string['enableaudio'] = 'Enable audio recording';
$string['enablevideo'] = 'Enable video recording';

$string['recordertype'] = 'Recorder Type';
$string['recorderskin'] = 'Recorder Skin';
$string['skinplain'] = 'Plain';
$string['skinbmr'] = 'Burnt Rose';
$string['skinfresh'] = 'Fresh';
$string['skin123'] = 'One Two Three';
$string['skinonce'] = 'Once';

$string['fallback'] = 'non-HTML5 Fallback';
$string['fallbackdetails'] =
        'If the browser does not support HTML5 recording for the selected mediatype, fallback to an upload screen or a warning.';
$string['fallbackupload'] = 'Upload';
$string['fallbackiosupload'] = 'iOS: upload, else warning';
$string['fallbackwarning'] = 'Warning';

$string['subtitle'] = 'Subtitles';
$string['subtitlecheckbox'] = 'Request subtitles for this recording';
$string['subtitleinstructions'] =
        'Requested subtitles are ready about 5 minutes after recording. You must request before recording.';
$string['mediainsertcheckbox'] = 'Insert media player into editor. Otherwise it\'s a media link.';

$string['options'] = 'Options';

$string['cloudpoodll:allowaudio'] = 'Allow Audio Recording';
$string['cloudpoodll:allowvideo'] = 'Allow Video Recording';
$string['cloudpoodll:allowupload'] = 'Allow Upload';
$string['cloudpoodll:allowsubtitling'] = 'Allow Subtitling';
$string['cloudpoodll:visible'] = 'Visible';

$string['displaysubs'] = '{$a->subscriptionname} : expires {$a->expiredate}';
$string['noapiuser'] = "No API user entered. Cloud Poodll for TinyMCE will not work correctly.";
$string['noapisecret'] = "No API secret entered. Cloud Poodll for TinyMCE will not work correctly.";
$string['credentialsinvalid'] = "The API user and secret entered could not be used to get access. Please check them.";
$string['appauthorised'] = $string['pluginname'] . " is authorised for this site.";
$string['appnotauthorised'] = $string['pluginname'] . " is NOT authorised for this site.";
$string['refreshtoken'] = "Refresh license information";
$string['notokenincache'] = "Refresh to see license information. Contact Poodll support if there is a problem.";
//shown in popup
$string['notoken'] = 'API user and secret were rejected and could not gain access. Please check the TinyMCE Cloud Poodll plugin settings page.';

$string['freetrial'] = "Get Cloud Poodll API Credentials and a Free Trial";
$string['freetrial_desc'] = "A dialog should appear that allows you to register for a free trial with Poodll. After registering you should login to the members dashboard to get your API user and secret. And to register your site URL.";
$string['memberdashboard'] = "Member Dashboard";
$string['memberdashboard_desc'] = "";
$string['fillcredentials']="Set API user and secret with existing credentials";