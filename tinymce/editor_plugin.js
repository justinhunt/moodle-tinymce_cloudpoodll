/**
 * TinyMCE plugin CloudPoodll
 *
 * @package    tinymce_cloudpoodll
 * @author     Justin Hunt  justin@poodll.com
 * @copyright  2019 Poodll Co. Ltd.
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// Scrutinizer CI directives.
/** global: tinymce */

(function() {
    tinymce.PluginManager.requireLangPack('cloudpoodll');

    tinymce.create('tinymce.plugins.cloudpoodll', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init: function(ed, url) {

            var cp_params = ed.getParam('cloudpoodll');
            var that = this;

            ed.addCommand('mceForceRepaint', function() {
                var root = ed.dom.getRoot(),
                    items = root.getElementsByTagName("img");
                for (var i = 0; i < items.length; i++) {
                    var src = items[i].getAttribute('src').replace(/\?\d+$/, '');
                    items[i].setAttribute('src', src + '?' + (new Date().getTime()));
                }
                ed.execCommand('mceRepaint');
                ed.focus();
            });

            ed.addCommand('mceMaximizeWindow', function(w) {
                // This function duplicates the TinyMCE windowManager code when 'maximize' button is pressed.
                var vp = ed.dom.getViewPort(),
                    id = w.id;
                // Reduce viewport size to avoid scrollbars.
                vp.w -= 2;
                vp.h -= 2;

                w.oldPos = w.element.getXY();
                w.oldSize = w.element.getSize();

                w.element.moveTo(vp.x, vp.y);
                w.element.resizeTo(vp.w, vp.h);
                ed.dom.setStyles(id + '_ifr', {width: vp.w - w.deltaWidth, height: vp.h - w.deltaHeight});
                ed.dom.addClass(id + '_wrapper', 'mceMaximized');
            });

            ed.addCommand('mceCloudPoodllAudio', function() {
                var viewparams = '';
                var viewparams = '';
                viewparams += window.encodeURIComponent('contextid');
                viewparams += '=' + window.encodeURIComponent(cp_params.cp_contextid);
                viewparams +='&';
                viewparams += window.encodeURIComponent('sesskey');
                viewparams += '=' + window.encodeURIComponent(cp_params.cp_sesskey);

                var viewurl = ed.getParam("moodle_plugin_base") + 'cloudpoodll/cloudpoodll.php';
                viewurl += (viewparams != '' ? '?' + viewparams : '');
                var onClose = function() {
                    ed.windowManager.onClose.remove(onClose);
                    ed.execCommand('mceForceRepaint');
                };
                ed.windowManager.onClose.add(onClose);
                //var dim = {width: 500,height: 500};
                var dim = that.getDimensions(ed,cp_params,'audio');
                var w = ed.windowManager.open({
                    file: viewurl,
                    width: dim.width,
                    height: dim.height,
                    inline: 1
                }, {
                    plugin_url: url, // Plugin absolute URL.
                    recordertype: 'audio'
                });

            });



            // Register Cloud Poodll Audio button.
            ed.addButton('cloudpoodllaudio', {
                title: 'cloudpoodll.cloudpoodllaudio',
                cmd: 'mceCloudPoodllAudio',
                image: url + '/img/audio.png'
            });

            ed.addCommand('mceCloudPoodllVideo', function() {
                var video = ed.getParam('cloudpoodllvideo', {});
                var viewparams = '';
                viewparams += window.encodeURIComponent('contextid');
                viewparams += '=' + window.encodeURIComponent(cp_params.cp_contextid);
                viewparams +='&';
                viewparams += window.encodeURIComponent('sesskey');
                viewparams += '=' + window.encodeURIComponent(cp_params.cp_sesskey);


                var viewurl = ed.getParam("moodle_plugin_base") + 'cloudpoodll/cloudpoodll.php';
                viewurl += (viewparams != '' ? '?' + viewparams : '');
                var onClose = function() {
                    ed.windowManager.onClose.remove(onClose);
                    ed.execCommand('mceForceRepaint');
                };
                ed.windowManager.onClose.add(onClose);
                //var dim = {width: 500,height: 500};
                var dim = that.getDimensions(ed,cp_params,'video');
                var w = ed.windowManager.open({
                    file: viewurl,
                    width: dim.width,
                    height: dim.height,
                    inline: 1
                }, {
                    plugin_url: url, // Plugin absolute URL.
                    recordertype: 'video'
                });

            });

            // Register Cloud Poodll Video button.
            ed.addButton('cloudpoodllvideo', {
                title: 'cloudpoodll.cloudpoodllvideo',
                cmd: 'mceCloudPoodllVideo',
                image: url + '/img/video.png'
            });

        },

        getDimensions(ed,cp_params,recorder){
            var ret = {};
            //TODO should fixxy up these margins
            var marginwidth = parseInt(ed.getLang('media.delta_width', 0));
            var marginheight = parseInt(ed.getLang('media.delta_height', 0));

            //get title and sizes
            //the dimensions below are just copied from dialog.js TODO centralise the size code
            switch(recorder){
                case 'video':

                    switch(cp_params.cp_videoskin){
                        case 'onetwothree':
                            ret.width = 500;
                            ret.height = 600;
                            break;
                        case 'standard':
                            ret.width = 500;
                            ret.height = 520;
                            break;
                        case 'bmr':
                            ret.width = 500;
                            ret.height = 560;
                            break;
                        default:
                            ret.width = 500;
                            ret.height = 560;

                    }
                    break;
                case 'audio':
                default:
                    ret.width= 501;
                    ret.height = 320;
                    break;
            }
            ret.width += marginwidth;
            ret.height += marginheight;
            return ret;

        },

        createControl: function() {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo: function() {
            return {
                longname: 'Moodle TinyMCE CloudPoodll plugin',
                author: 'Justin Hunt',
                infourl: 'https://poodll.com',
                version: "1.0"
            };
        },
    });

    // Register plugin.
    tinymce.PluginManager.add('cloudpoodll', tinymce.plugins.cloudpoodll);
})();
