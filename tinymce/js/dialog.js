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

/*
 * @package    tinymce_cloudpoodll
 * @copyright  2018 Justin Hunt <justin@poodll.com,>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-tinymce_align-button
 */

/**
 * tinymce text editor cloudpoodll plugin.
 *
 * @namespace M.tinymce_cloudpoodll
 * @class button
 * @extends M.editor_tinymce.EditorPlugin
 */

var COMPONENTNAME = 'tinymce_cloudpoodll';
var RECORDERS = {VIDEO: 'video', AUDIO: 'audio'};
var INSERTMETHOD = {LINK: 'link', TAGS: 'tags'};
var LANGUAGE = {   ENUS: 'en-US',
    ENGB: 'en-GB',
    ENAU: 'en-AU',
    ENIN: 'en-IN',
    FRCA: 'fr-CA',
    FRFR: 'fr-FR',
    ESUS: 'es-US',
    ESES: 'es-ES',
    ITIT: 'it-IT',
    PTBR: 'pt-BR',
    DEDE: 'de-DE',
    KOKR: 'ko-KR',
    HIIN: 'hi-IN',
    ARAE: 'ar-AE',
    ARSA: 'ar-SA',
    ZHCN: 'zh-CN',
    NLNL: 'nl-NL',
    ENIE: 'en-IE',
    ENWL: 'en-WL',
    ENAB: 'en-AB',
    FAIR: 'fa-IR',
    DECH: 'de-CH',
    HEIL: 'he-IL',
    IDID: 'id-ID',
    JAJP: 'ja-JP',
    MSMY: 'ms-MY',
    PTPT: 'pt-PT',
    RURU: 'ru-RU',
    TAIN: 'ta-IN',
    TEIN: 'te-IN',
    TRTR: 'tr-TR'};

var CLOUDPOODLL = {};
var SKIN = {PLAIN: 'standard',
    BMR: 'bmr',
    ONETWOTHREE: 'onetwothree',
    FRESH: 'fresh',
    ONCE: 'once'};
var CSS = {
    VIDEO: 'tinymce_cloudpoodll_video',
    AUDIO: 'tinymce_cloudpoodll_audio',
    UPLOAD: 'tinymce_cloudpoodll_upload',
    SUBTITLE: 'tinymce_cloudpoodll_subtitle',
    OPTIONS: 'tinymce_cloudpoodll_options',
    LANG_SELECT: 'tinymce_cloudpoodll_languageselect',
    SUBTITLE_CHECKBOX: 'tinymce_cloudpoodll_subtitle_checkbox',
    MEDIAINSERT_CHECKBOX: 'tinymce_cloudpoodll_mediainsert_checkbox',
    TINYMCE_CLOUDPOODLL_FORM: 'tinymce_cloudpoodll_form',
    CP_VIDEO: 'tinymce_cloudpoodll_video_cont',
    CP_AUDIO: 'tinymce_cloudpoodll_audio_cont',
    CP_UPLOAD: 'tinymce_cloudpoodll_upload_cont',
    CP_SWAP: 'tinymce_cloudpoodll_swapmeout'

};
var STATE ={
    subtitling: false,
    transcoding: false,
    started: false,
    currentrecorder: false,
    insertmethod: false,
    subitleaudiobydefault: 0,
    subitlevideobydefault: 0,
    elementid: false,
    subtitlecheckbox: false,
};

var TEMPLATES = {
    ROOT: '' +
    '<form class="mform tinymce_form tinymce_cloudpoodll_form" id="{{elementid}}_tinymce_cloudpoodll_form">' +
    '<ul class="root nav nav-tabs" role="tablist">' +
    "{{#if isvideo}}" +
    '<li data-medium-type="{{CSS.VIDEO}}" class="nav-item">' +
    '<a class="nav-link active" href="#{{elementid}}_{{CSS.VIDEO}}" role="tab" data-toggle="tab">' +
    '{{get_string "video" component}}' +
    '</a>' +
    '</li>' +
    "{{else}}" +
    '<li data-medium-type="{{CSS.AUDIO}}" class="nav-item">' +
    '<a class="nav-link active" href="#{{elementid}}_{{CSS.AUDIO}}" role="tab" data-toggle="tab">' +
    '{{get_string "audio" component}}' +
    '</a>' +
    '</li>' +
    "{{/if}}" +
    '<li data-medium-type="{{CSS.UPLOAD}}" class="nav-item">' +
    '<a class="nav-link" href="#{{elementid}}_{{CSS.UPLOAD}}" role="tab" data-toggle="tab">' +
    '{{get_string "upload" component}}' +
    '</a>' +
    '</li>' +
    '<li data-medium-type="{{CSS.OPTIONS}}" class="nav-item">' +
    '<a class="nav-link" href="#{{elementid}}_{{CSS.OPTIONS}}" role="tab" data-toggle="tab">' +
    '{{get_string "options" component}}' +
    '</a>' +
    '</li>' +
    '</ul>' +
    '<div class="root tab-content">' +
    "{{#if isvideo}}" +
    '<div data-medium-type="{{CSS.VIDEO}}" class="tab-pane active" id="{{elementid}}_{{CSS.VIDEO}}">' +
    '' +
    '<div id="{{elementid}}_{{CSS.CP_VIDEO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_VIDEO}}" data-parent="{{CP.parent}}"' +
    ' data-appid="{{CP.appid}}" data-media="video" data-type="{{CP.videoskin}}" data-localloader="/lib/editor/tinymce/plugins/cloudpoodll/poodllloader.html"' +
    ' data-localloading="auto" data-width="{{CP.sizes.videowidth}}" data-height="{{CP.sizes.videoheight}}"' +
    ' data-transcode="{{CP.transcode}}" data-transcribe="{{subtitlevideobydefault}}" data-subtitle="{{subtitlevideobydefault}}" data-language="{{CP.language}}"' +
    ' data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
    '</div>' +
    "{{else}}" +
    '<div data-medium-type="{{CSS.AUDIO}}" class="tab-pane active" id="{{elementid}}_{{CSS.AUDIO}}">' +
    '<div id="{{elementid}}_{{CSS.CP_AUDIO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_AUDIO}}" data-parent="{{CP.parent}}"' +
    ' data-appid="{{CP.appid}}" data-media="audio" data-type="{{CP.audioskin}}" data-localloader="/lib/editor/tinymce/plugins/cloudpoodll/poodllloader.html"' +
    ' data-localloading="auto" data-width="{{CP.sizes.audiowidth}}" data-height="{{CP.sizes.audioheight}}"' +
    ' data-transcode="{{CP.transcode}}" data-transcribe="{{subtitleaudiobydefault}}" data-subtitle="{{subtitleaudiobydefault}}" data-language="{{CP.language}}"' +
    ' data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
    '</div>' +
    "{{/if}}" +
    '<div data-medium-type="{{CSS.UPLOAD}}" class="tab-pane" id="{{elementid}}_{{CSS.UPLOAD}}">' +
    '<br>{{get_string "uploadinstructions" component}}' +
    '<div id="{{elementid}}_{{CSS.CP_UPLOAD}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_UPLOAD}}" data-parent="{{CP.parent}}"' +
    ' data-appid="{{CP.appid}}" data-media="{{recorder}}" data-type="upload" data-width="450" data-height="350"' +
    ' data-transcode="{{CP.transcode}}" ' +
    "{{#if isvideo}}" +
    'data-transcribe="{{subtitlevideobydefault}}" ' +
    'data-subtitle="{{subtitlevideobydefault}}" ' +
    "{{else}}" +
    'data-transcribe="{{subtitleaudiobydefault}}" ' +
    'data-subtitle="{{subtitleaudiobydefault}}" ' +
    "{{/if}}" +
    'data-language="{{CP.language}}"' +
    'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}"></div>' +
    '</div>' +
    '<div data-medium-type="{{CSS.OPTIONS}}" class="tab-pane" id="{{elementid}}_{{CSS.OPTIONS}}">' +
    '<br><label>' +
    '<input type="checkbox" id="{{elementid}}_{{CSS.MEDIAINSERT_CHECKBOX}}" class="{{CSS.MEDIAINSERT_CHECKBOX}}" disabled="true"' +
    "{{#if mediataginsert}}" +
    ' checked="true" ' +
    "{{/if}}" +
    '/>&nbsp;{{get_string "mediainsertcheckbox" component}}' +
    '</label>' +
    "{{#if cansubtitle}}" +
    '<br><label>' +
    '<input type="checkbox" id="{{elementid}}_{{CSS.SUBTITLE_CHECKBOX}}" class="{{CSS.SUBTITLE_CHECKBOX}}"' +
    "{{#if isvideo}}" +
    "{{#if letssubtitlevideo}}" +
    ' checked="true" ' +
    "{{/if}}" +
    "{{else}}" +
    "{{#if letssubtitleaudio}}" +
    ' checked="true" ' +
    "{{/if}}" +
    "{{/if}}" +
    '/>' +
    '&nbsp;{{get_string "subtitlecheckbox" component}}' +
    '</label>' +
    '<br><label>{{get_string "speakerlanguage" component}}&nbsp;' +
    '<select id="{{elementid}}_{{CSS.LANG_SELECT}}" class="{{CSS.LANG_SELECT}}">' +
    '<option value="{{LANG.ARAE}}" {{#if useARAE}}selected="selected"{{/if}}>{{get_string "ar-ae" component}}</option>' +
    '<option value="{{LANG.ARSA}}" {{#if useARSA}}selected="selected"{{/if}}>{{get_string "ar-sa" component}}</option>' +
    '<option value="{{LANG.DEDE}}" {{#if useDEDE}}selected="selected"{{/if}}>{{get_string "de-de" component}}</option>' +
    '<option value="{{LANG.DECH}}" {{#if useDECH}}selected="selected"{{/if}}>{{get_string "de-ch" component}}</option>' +
    '<option value="{{LANG.ENUS}}" {{#if useENUS}}selected="selected"{{/if}}>{{get_string "en-us" component}}</option>' +
    '<option value="{{LANG.ENGB}}" {{#if useENGB}}selected="selected"{{/if}}>{{get_string "en-gb" component}}</option>' +
    '<option value="{{LANG.ENAU}}" {{#if useENAU}}selected="selected"{{/if}}>{{get_string "en-au" component}}</option>' +
    '<option value="{{LANG.ENIN}}" {{#if useENIN}}selected="selected"{{/if}}>{{get_string "en-in" component}}</option>' +
    '<option value="{{LANG.ENIE}}" {{#if useENIE}}selected="selected"{{/if}}>{{get_string "en-ie" component}}</option>' +
    '<option value="{{LANG.ENWL}}" {{#if useENWL}}selected="selected"{{/if}}>{{get_string "en-wl" component}}</option>' +
    '<option value="{{LANG.ENAB}}" {{#if useENAB}}selected="selected"{{/if}}>{{get_string "en-ab" component}}</option>' +
    '<option value="{{LANG.ESUS}}" {{#if useESUS}}selected="selected"{{/if}}>{{get_string "es-us" component}}</option>' +
    '<option value="{{LANG.ESES}}" {{#if useESES}}selected="selected"{{/if}}>{{get_string "es-es" component}}</option>' +
    '<option value="{{LANG.FAIR}}" {{#if useFAIR}}selected="selected"{{/if}}>{{get_string "fa-ir" component}}</option>' +
    '<option value="{{LANG.FRFR}}" {{#if useFRFR}}selected="selected"{{/if}}>{{get_string "fr-fr" component}}</option>' +
    '<option value="{{LANG.FRCA}}" {{#if useFRCA}}selected="selected"{{/if}}>{{get_string "fr-ca" component}}</option>' +
    '<option value="{{LANG.HEIL}}" {{#if useHEIL}}selected="selected"{{/if}}>{{get_string "he-il" component}}</option>' +
    '<option value="{{LANG.HIIN}}" {{#if useHIIN}}selected="selected"{{/if}}>{{get_string "hi-in" component}}</option>' +
    '<option value="{{LANG.ITIT}}" {{#if useITIT}}selected="selected"{{/if}}>{{get_string "it-it" component}}</option>' +
    '<option value="{{LANG.JAJP}}" {{#if useJAJP}}selected="selected"{{/if}}>{{get_string "ja-jp" component}}</option>' +
    '<option value="{{LANG.KOKR}}" {{#if useKOKR}}selected="selected"{{/if}}>{{get_string "ko-kr" component}}</option>' +
    '<option value="{{LANG.MSMY}}" {{#if useMSMY}}selected="selected"{{/if}}>{{get_string "ms-my" component}}</option>' +
    '<option value="{{LANG.NLNL}}" {{#if useNLNL}}selected="selected"{{/if}}>{{get_string "nl-nl" component}}</option>' +
    '<option value="{{LANG.PTPT}}" {{#if usePTPT}}selected="selected"{{/if}}>{{get_string "pt-pt" component}}</option>' +
    '<option value="{{LANG.PTBR}}" {{#if usePTBR}}selected="selected"{{/if}}>{{get_string "pt-br" component}}</option>' +
    '<option value="{{LANG.RURU}}" {{#if useRURU}}selected="selected"{{/if}}>{{get_string "ru-ru" component}}</option>' +
    '<option value="{{LANG.TAIN}}" {{#if useTAIN}}selected="selected"{{/if}}>{{get_string "ta-in" component}}</option>' +
    '<option value="{{LANG.TEIN}}" {{#if useTEIN}}selected="selected"{{/if}}>{{get_string "te-in" component}}</option>' +
    '<option value="{{LANG.TRTR}}" {{#if useTRTR}}selected="selected"{{/if}}>{{get_string "tr-tr" component}}</option>' +
    '<option value="{{LANG.ZHCN}}" {{#if useZHCN}}selected="selected"{{/if}}>{{get_string "zh-cn" component}}</option>' +
    '</select>' +
    '</label>' +
    '<br>{{get_string "subtitleinstructions" component}}' +
    "{{else}}" +
    "{{get_string 'cannotsubtitle' component}}"+
    "{{/if}}" +
    '</div>' +
    '</div>' +
    '</form>',
    HTML_MEDIA: {
        VIDEO: '' +
        '&nbsp;<video ' +
        'controls="true" crossorigin="anonymous"' +
        '>' +
        "{{#if includesourcetrack}}" +
        '<source src="{{sourceurl}}" type="{{sourcemimetype}}">'+
        "{{/if}}" +
        '<source src="{{url}}" type="{{urlmimetype}}">' +
        "{{#if issubtitling}}" +
        '<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">' +
        "{{/if}}" +
        '</video>&nbsp;',
        AUDIO: '' +
        '&nbsp;<audio ' +
        'controls="true" crossorigin="anonymous"' +
        '>' +
        "{{#if includesourcetrack}}" +
        '<source src="{{sourceurl}}" type="{{sourcemimetype}}">'+
        "{{/if}}" +
        '<source src="{{url}}" type="{{urlmimetype}}">' +
        "{{#if issubtitling}}" +
        '<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">' +
        "{{/if}}" +
        '</audio>&nbsp;',
        LINK: '' +
        "{{#if issubtitling}}" +
        '&nbsp;<a href="{{url}}?data-subtitles={{subtitleurl}}&data-language={{CP.language}}"' +
        "{{else}}" +
        '&nbsp;<a href="{{url}}"' +
        "{{/if}}" +
        '>{{name}}</a>&nbsp;'
    }
};

M.tinymce_cloudpoodll = M.tinymce_cloudpoodll || {

    init: function(params) {


        var config = tinyMCEPopup.getParam("cloudpoodll");
        //insert method
        STATE.insertmethod = config.insertmethod;

        //subtitle by default
        STATE.subtitleaudiobydefault = config.subtitleaudiobydefault;
        STATE.subtitlevideobydefault = config.subtitlevideobydefault;

        //transcoding flag
        STATE.transcoding = config.cp_transcode =='1';

        //set up the cloudpoodll div
        CLOUDPOODLL.parent = config.cp_wwwroot;
        CLOUDPOODLL.appid = 'tinymce_cloudpoodll';
        CLOUDPOODLL.owner = config.cp_owner;
        CLOUDPOODLL.token = config.cp_token;
        CLOUDPOODLL.region = config.cp_region;
        CLOUDPOODLL.expiredays = config.cp_expiredays;
        CLOUDPOODLL.cansubtitle = config.cp_cansubtitle;
        CLOUDPOODLL.language = config.cp_language;
        CLOUDPOODLL.transcode = config.cp_transcode;
        CLOUDPOODLL.audioskin = config.cp_audioskin;
        CLOUDPOODLL.videoskin = config.cp_videoskin;
        CLOUDPOODLL.fallback = config.fallback;
        CLOUDPOODLL.sizes = this._fetchRecorderDimensions();

        this._displayDialogue(tinyMCEPopup.getWindowArg('recordertype',RECORDERS.AUDIO))
    },

    /**
     * Gets the root context for all templates, with extra supplied context.
     *
     * @method _getContext
     * @param  {Object} extra The extra context to add
     * @return {Object}
     * @private
     */
    _getContext:
        function(extra) {
            return Y.merge({
                elementid: 'tinymce_cloudpoodll',//this.get('host').get('elementid'),
                component: COMPONENTNAME,
                helpStrings: [],//this.get('help'),
                isvideo: STATE.currentrecorder === RECORDERS.VIDEO,
                cansubtitle: CLOUDPOODLL.cansubtitle,
                recorder: STATE.currentrecorder,
                mediataginsert: false,//STATE.insertmethod === INSERTMETHOD.TAGS,
                subtitleaudiobydefault: STATE.subtitleaudiobydefault,
                subtitlevideobydefault: STATE.subtitlevideobydefault,
                letssubtitleaudio: STATE.subtitleaudiobydefault ===1,
                letssubtitlevideo: STATE.subtitlevideobydefault ===1,
                useENUS: CLOUDPOODLL.language === LANGUAGE.ENUS,
                useENGB: CLOUDPOODLL.language === LANGUAGE.ENGB,
                useENAU: CLOUDPOODLL.language === LANGUAGE.ENAU,
                useENIN: CLOUDPOODLL.language === LANGUAGE.ENIN,
                useFRCA: CLOUDPOODLL.language === LANGUAGE.FRCA,
                useFRFR: CLOUDPOODLL.language === LANGUAGE.FRFR,
                useESUS: CLOUDPOODLL.language === LANGUAGE.ESUS,
                useESES: CLOUDPOODLL.language === LANGUAGE.ESES,
                useITIT: CLOUDPOODLL.language === LANGUAGE.ITIT,
                usePTBR: CLOUDPOODLL.language === LANGUAGE.PTBR,
                useDEDE: CLOUDPOODLL.language === LANGUAGE.DEDE,
                useKOKR: CLOUDPOODLL.language === LANGUAGE.KOKR,
                useHIIN: CLOUDPOODLL.language === LANGUAGE.HIIN,
                useARAE: CLOUDPOODLL.language === LANGUAGE.ARAE,
                useARSA: CLOUDPOODLL.language === LANGUAGE.ARSA,
                useZHCN: CLOUDPOODLL.language === LANGUAGE.ZHCN,
                useNLNL: CLOUDPOODLL.language === LANGUAGE.NLNL,
                useENIE: CLOUDPOODLL.language === LANGUAGE.ENIE,
                useENWL: CLOUDPOODLL.language === LANGUAGE.ENWL,
                useENAB: CLOUDPOODLL.language === LANGUAGE.ENAB,
                useFAIR: CLOUDPOODLL.language === LANGUAGE.FAIR,
                useDECH: CLOUDPOODLL.language === LANGUAGE.DECH,
                useHEIL: CLOUDPOODLL.language === LANGUAGE.HEIL,
                useIDID: CLOUDPOODLL.language === LANGUAGE.IDID,
                useJAJP: CLOUDPOODLL.language === LANGUAGE.JAJP,
                useMSMY: CLOUDPOODLL.language === LANGUAGE.MSMY,
                usePTPT: CLOUDPOODLL.language === LANGUAGE.PTPT,
                useRURU: CLOUDPOODLL.language === LANGUAGE.RURU,
                useTAIN: CLOUDPOODLL.language === LANGUAGE.TAIN,
                useTEIN: CLOUDPOODLL.language === LANGUAGE.TEIN,
                useTRTR: CLOUDPOODLL.language === LANGUAGE.TRTR,
                CSS: CSS,
                CP: CLOUDPOODLL,
                LANG: LANGUAGE
            }, extra);
        },

    _fetchRecorderDimensions: function() {
        // Get return object
        var sizes = {};

        //get video sizes]
        switch (CLOUDPOODLL.videoskin) {
            case SKIN.ONETWOTHREE:
                sizes.videowidth = 441; //(because the @media CSS is for <=440)
                sizes.videoheight = 540;
                break;
            case SKIN.BMR:
                sizes.videowidth = 441; //(because the @media CSS is for <=440)
                sizes.videoheight = 500;
                break;
            default:
                sizes.videowidth = 441;
                sizes.videoheight = 450;

        }
        switch (CLOUDPOODLL.audioskin) {
            default:
                sizes.audiowidth = 450;
                sizes.audioheight = 350;
                break;
        }
        return sizes;
    },



    /**
     * Display the media editing tool.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(recorder) {
        var thehost = tinymce.activeEditor;
        STATE.elementid = 'tinymce_cloudpoodll';///thehost.id;
     //   this._currentSelection=tinyMCEPopup.storeSelection();
        //OR
        //this._currentSelection=thehost.selection.getNode();

        //whats this?
        /*
        if (this.get('host').getSelection() === false) {
            return;
        }else{
            this._currentSelection = this.get('host').getSelection();
        }
        */
        STATE.currentrecorder = recorder;

        //get title and sizes
        switch(recorder){
            case RECORDERS.VIDEO:
                var title = 'CreateVideo';//M.util.get_string('createvideo', COMPONENTNAME);
                switch(CLOUDPOODLL.videoskin){
                    case SKIN.ONETWOTHREE:
                        var width = '500';
                        var height = "600";
                        break;
                    case SKIN.PLAIN:
                        var width = '500';
                        var height = "520";
                        break;
                    case SKIN.BMR:
                        var width = '500';
                        var height = "560";
                        break;
                    default:
                        var width = '500';
                        var height = '560';

                }
                break;
            case RECORDERS.AUDIO:
            default:
                var title = 'CreateAudio';//M.util.get_string('createaudio', COMPONENTNAME);
                var width = '501';
                var height = '320';
                break;
        }

        var d_conf = {};
        d_conf.center =true;
        d_conf.headerContent =title;
        d_conf.focusAfterHide = recorder;
        d_conf.width = width + 'px';
        if(height) {
            d_conf.height = height + 'px';
        }

    //    var dialogue = this.getDialogue(d_conf);

        //if this dialog had a different size and title (it was popped up before as diff media recorder type)

   /*     if(dialogue.get('width') != width + 'px'){
            dialogue.set('headerContent',title);
            //sadly the width and height won't change .. whatever
            dialogue.set('width',width + 'px');
            dialogue.set('height',height + 'px');
        }

*/
        // Set the dialogue content, and then show the dialogue.
        /*
        dialogue.set('bodyContent', this._getDialogueContent()).show();
        */

        var that=this;
        var thecontext=this._getContext();
        YUI().use('handlebars', 'node-base', function (newyui) {

            var output = '';
            if(CLOUDPOODLL.token ==''){
                output= M.util.get_string('notoken', COMPONENTNAME);
            }else{
                output = newyui.Handlebars.compile(TEMPLATES.ROOT)(thecontext);
            }
           var content = newyui.Node.create(output);

            Y.one('body').append(content);

               //store some common elements we will refer to later
                STATE.subtitlecheckbox = Y.one('#' + STATE.elementid + '_' + CSS.SUBTITLE_CHECKBOX);
                STATE.mediainsertcheckbox = Y.one('#' + STATE.elementid + '_' + CSS.MEDIAINSERT_CHECKBOX);
                STATE.languageselect = Y.one('#' + STATE.elementid + '_' + CSS.LANG_SELECT);
                var topnode = Y.one('#' + STATE.elementid + '_' + CSS.TINYMCE_CLOUDPOODLL_FORM);


                //subtitle checkbox click event.. reload recorders
                if(STATE.subtitlecheckbox !== null) {
                    STATE.subtitlecheckbox.on('click', function (e) {
                        var element = e.currentTarget;
                        //update recorder subtitle setting
                        if (element.get('checked')) {
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '1');
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '1');
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                            STATE.subtitling = true;
                        } else {
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '0');
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '0');
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                            STATE.subtitling = false;
                        }
                        //reload the recorders
                        topnode.all('.' + CSS.CP_SWAP).empty();
                        that._loadRecorders();
                    });
                }

                //insert method checkbox;
                if(STATE.mediainsertcheckbox !== null) {
                    STATE.mediainsertcheckbox.on('click', function (e) {
                        var element = e.currentTarget;
                        //update recorder subtitle setting
                        if (element.get('checked')) {
                            STATE.insertmethod = INSERTMETHOD.TAGS;
                        } else {
                            STATE.insertmethod = INSERTMETHOD.LINK;
                        }
                    });
                }

                //language selectopr
                if(STATE.languageselect !== null) {
                    STATE.languageselect.on('change', function (e) {
                        var element = e.currentTarget;
                        if(element) {
                            CLOUDPOODLL.language = element.selectedOptionValue();
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-language', CLOUDPOODLL.language);
                            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                            //reload the recorders
                            topnode.all('.' + CSS.CP_SWAP).empty();
                            that._loadRecorders();
                        }
                    });
                }

                //so finally load those recorders
                that._loadRecorders();

        });
    },

    /**
     * Loads or reloads the recorders
     *
     * @method _loadRecorders
     * @private
     */
    _loadRecorders: function(){
        var that = this;
        that.uploaded=false;
        require(['tinymce_cloudpoodll/cloudpoodllloader'], function(loader) {
            var recorder_callback = function(evt){
                switch(evt.type){
                    case 'recording':
                        if(evt.action==='started'){
                            //if user toggled subtitle checkbox any time from now, the recording would be lost
                            if(STATE.subtitlecheckbox !== null) {
                                STATE.subtitlecheckbox.set('disabled', true);
                            }

                        }
                        break;
                    case 'awaitingprocessing':
                        if(!that.uploaded) {
                            setTimeout(function(){
                                var sourceurl = evt.s3root + evt.sourcefilename;
                                that._doInsert(evt.mediaurl, evt.mediafilename,sourceurl,evt.sourcemimetype);
                            },1000);
                            that.uploaded = true;
                        }
                        break;
                    case 'error':
                        alert('PROBLEM:' + evt.message);
                        break;
                }
            };
            loader.init(CSS.CP_SWAP,recorder_callback);
        });
    },

    /**
     * Inserts the link or media element onto the page
     * @method _doInsert
     * @private
     */
    _doInsert: function(mediaurl, mediafilename, sourceurl, sourcemimetype){

        //default context values(link) for template
        var context = {};
        context.url = mediaurl;
        context.name = mediafilename;
        context.issubtitling = STATE.subtitling;
        context.includesourcetrack = STATE.transcoding && (mediaurl !== sourceurl) && (sourceurl.slice(-3) !== 'wav');
        context.CP = CLOUDPOODLL;
        context.subtitleurl = mediaurl + '.vtt';
        var template = TEMPLATES.HTML_MEDIA.LINK;

        switch(STATE.insertmethod){

            case INSERTMETHOD.TAGS:
                if(STATE.currentrecorder === RECORDERS.VIDEO){
                    context.width = false;
                    context.height = false;
                    context.poster = false;
                    if(STATE.transcoding) {
                        context.urlmimetype = 'video/mp4';
                    }else{
                        context.urlmimetype = sourcemimetype;
                    }
                    template = TEMPLATES.HTML_MEDIA.VIDEO;
                }else {
                    context.width = false;
                    context.height = false;
                    context.poster = false;
                    if(STATE.transcoding) {
                        context.urlmimetype = 'audio/mp3';
                    }else{
                        context.urlmimetype = sourcemimetype;
                    }
                    template = TEMPLATES.HTML_MEDIA.AUDIO;
                }
                break;

            case INSERTMETHOD.LINK:
            default:
            //do nothing special actually.
        }


        YUI().use('handlebars', 'node-base', function (newyui) {
            var content = newyui.Handlebars.compile(template)(context);
            //only links work in tinymce because audio and video tags are not set int extended_valid_elements in Moodle
            //TODO in /lib/editor/tinymce/module.js add this options.extended_valid_elements ="audio[controls|preload|width|height|data-setup],video[controls|preload|width|height|data-setup],source[src|type]"
            tinyMCEPopup.editor.execCommand('mceInsertContent', false, content);
            tinyMCEPopup.close();
        });
    }
};