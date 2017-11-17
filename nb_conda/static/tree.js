define(function(require) {
    var $ = require('jquery');
    var Jupyter = require('base/js/namespace');
    var utils = require('base/js/utils');
    var urls = require('./urls');
    var params = require('./js/params');

    function appendCss() {
        $('head').append(
            $('<link>')
            .attr('rel', 'stylesheet')
            .attr('type', 'text/css')
            .attr('href', urls.static_url + 'css/main.css')
        );
    }

    function isTargetUrl() {
        if(window.location.hash === `#${params.projectName}`) {
            $(`#${params.tabName}`).click();
        }
    }

    function appendPage(env_html, status, xhr) {
        console.log(env_html)
        $(".tab-content").append($(env_html));
        $("#tabs").prepend(
            $('<li>')
            .append(
                $('<a>')
                .attr('id', `${params.tabName}`)
                .attr('href', `#${params.projectName}`)
                .attr('data-toggle', 'tab')
                .text(`${params.title}`)
                .click(function (e) {
                })
            )
        );
        isTargetUrl();
    }

    function renderPage() {
        utils.ajax(urls.static_url + 'html/main.html', {
            dataType: 'html',
            success: appendPage,
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
