define(function(require) {
    var $ = require('jquery');
    var Jupyter = require('base/js/namespace');
    var utils = require('base/js/utils');
    var urls = require('../urls');

    function appendCss() {
        $('head').append(
            $('<link>')
            .attr('rel', 'stylesheet')
            .attr('type', 'text/css')
            .attr('href', urls.static_url + 'css/main.css')
        );
    }

    function isManagerUrl() {
        if(window.location.hash === '#manager') {
            $('#manager_tab').click();
        }
    }

    function renderPage() {
        utils.ajax(urls.static_url + 'html/main.html', {
            dataType: 'html',
            success: function(env_html, status, xhr) {
                $(".tab-content").append($(env_html));
                $("#tabs").prepend(
                    $('<li>')
                    .append(
                        $('<a>')
                        .attr('id', 'manager_tab')
                        .attr('href', '#manager')
                        .attr('data-toggle', 'tab')
                        .text('Deep Learning Manager')
                        .click(function (e) {
                        })
                    )
                );
                isManagerUrl();
            }
        });  
    }

    function load() {
        if (!Jupyter.notebook_list) return;

        appendCss();
        renderPage();
    }

    return {
        load_ipython_extension: load
    };
});
