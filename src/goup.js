/*
 *
 * Copyright (c) 2016-2017 Daniele Lenares (https://github.com/Ryuk87)
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php).
 *
 * Version 0.0.2
 *
 */
var GoUpJS = (function GoUpJS(userParams) {
	'use strict';

    /**
     * Merge the user parameters with the default ones,
     *
     * @param userParams
     * @returns {*}
     */
    function mergeParameters(userParams) {

        // Check if userParams is an object
        if (userParams === undefined) {
            userParams = {};
        } else if(Object.prototype.toString.call(userParams) !== '[object Object]') {
            console.error('The input parameters are in a non supported format.');
            return false;
        }

        var mergedParams = {
            location: userParams.location || 'right',
            locationOffset: userParams.locationOffset || 20,
            bottomOffset: userParams.bottomOffset || 10,
            containerSize: userParams.containerSize || 40,
            containerRadius: userParams.containerRadius || 10,
            containerClass: userParams.containerClass || 'goup-container',
            arrowClass: userParams.arrowClass || 'goup-arrow',
            arrowSize: userParams.arrowSize || 10,
            alwaysVisible: userParams.alwaysVisible || false,
            trigger: userParams.trigger || 500,
            hideUnderWidth: userParams.hideUnderWidth || 500,
            containerColor: userParams.containerColor || '#000',
            arrowColor: userParams.arrowColor || '#ffffff',
            zIndex: userParams.zIndex || 1
        };

        return mergedParams;
    }

    /**
     * Validate parameters.
     *
     * @param mergedParams
     * @returns {{}}
     */
    function checkParameters(mergedParams) {

        var params = {};

        var checkColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

        Object.keys(mergedParams).forEach(function loopMerged(key){
            
            params[key] = mergedParams[key];

            switch (key) {
                case 'location':
                    if (params.location !== 'right' && params.location !== 'left') {
                        params.location = 'right';
                    }
                    break;
                case 'locationOffset':
                    if (params.locationOffset < 0) {
                        params.locationOffset = 0;
                    }
                    break;
                case 'bottomOffset':
                    if (params.bottomOffset < 0) {
                        params.bottomOffset = 0;
                    }
                    break;
                case 'containerSize':
                    if (params.containerSize < 20) {
                        params.containerSize = 20;
                    }             
                    break;
                case 'arrowSize':
                    if (params.arrowSize < 0) {
                        params.arrowSize = 0;
                    }
                    break;
                case 'containerRadius':
                    if (params.containerRadius < 0) {
                        params.containerRadius = 0;
                    }   
                    break;
                case 'trigger':
                    if (params.trigger < 0) {
                        params.trigger = 0;
                    }
                    break;
                case 'hideUnderWidth':
                    if (params.hideUnderWidth < 0) {
                        params.hideUnderWidth = 0;
                    }
                    break;
                case 'containerColor':
                    if (!checkColor.test(params.containerColor)) {
                        params.containerColor = '#000000';
                    }
                    break;
                case 'arrowColor':
                    if (!checkColor.test(params.arrowColor)) {
                        params.arrowColor = '#fff';
                    }
                    break;
                case 'zIndex':
                    if (isNaN(params.zIndex)) {
                        params.zIndex = 1;
                    }
                    break;
                default:
                    break;
            }
        });

        return params;
    }

    /**
     * Create all the needed html elements based on the passed parameters.
     *
     * @param params
     * @returns {Element}
     */
    function createElements(params) {
        // Create the container div
        var container = document.createElement('div');
        container.className += params.containerClass;
        // Create arrow div
        var arrow = document.createElement('div');
        arrow.className += params.arrowClass;
        // Append arrow to container
        container.appendChild(arrow);
        // Append container to body
        document.body.appendChild(container);

        // Apply style to container
        container.style.position = 'fixed';
        container.style.width = params.containerSize + 'px';
        container.style.height = params.containerSize + 'px';
        container.style.background = params.containerColor;
        container.style.cursor = 'pointer';
        container.style.zIndex = params.zIndex;
        container.style.bottom = params.bottomOffset + 'px';
        container.style[params.location] = params.locationOffset + 'px';
        container.style.borderRadius = params.containerRadius + 'px';
        if (params.alwaysVisible === false) {
            container.style.display = 'none';
        } else {
            container.style.display = 'block';
        }


        // Apply style to arrow
        arrow.style.width = 0;
        arrow.style.height = 0;
        arrow.style.margin = '0 auto';
        // Half container size minus half arrow size
        arrow.style.paddingTop = Math.ceil(params.containerSize * 0.5 - params.arrowSize * 0.5) + 'px';
        arrow.style.borderStyle = 'solid';
        arrow.style.borderWidth = '0 ' + params.arrowSize + 'px ' + params.arrowSize + 'px ' + params.arrowSize + 'px';
        arrow.style.borderColor = 'transparent transparent ' + params.arrowColor + ' transparent';

        return container;
    }

    /**
     * Events listeners.
     *
     * @param container
     * @param params
     */
    function bindEvents(container, params) {

        // Listen on document "scroll" event
        document.addEventListener('scroll', function scrollListener() {
            var body = document.getElementsByTagName('body')[0];
            if (body.scrollTop >= params.trigger || params.alwaysVisible === true) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });

        // Listen on container "click" event
        container.addEventListener('click', function clickListener() {
            window.scrollTo(0, 0);
        });
    }

    /**
     * Call the functions needed for the script to run.
     */
    function boot() {
        var mergedParams = mergeParameters(userParams);
        if (mergedParams === false) return;
        var params = checkParameters(mergedParams);
        var container = createElements(params);
        bindEvents(container, params);
    }


    // Wait for the document to be ready. Then call 'boot' function.
    if (document.readyState !== 'loading') {
        boot();
    } else {
        document.addEventListener('DOMContentLoaded', boot);
    }

});