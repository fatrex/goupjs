/*
 *
 * Copyright (c) 2016-2017 Daniele Lenares (https://github.com/Ryuk87)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 0.0.5
 *
 */
var GoUpJS = (function GoUpJS(userParams) {
	'use strict';


    /**
     * Merge the user parameters with the default ones
     * 
     * @param  {Object}
     * @return {Object}
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
            alwaysVisible: userParams.alwaysVisible || false,
            trigger: userParams.trigger || 500,
            entryAnimation: userParams.entryAnimtion || 'fade',
            goupSpeed: userParams.goupSpeed || 'slow',
            hideUnderWidth: userParams.hideUnderWidth || 500,
            containerColor: userParams.containerColor || '#000',
            arrowColor: userParams.arrowColor || '#ffffff',
            title: userParams.title || '',
            titleAsText: userParams.titleAsText || false,
            titleAsTextClass: userParams.titleAsTextClass || 'goup-text',
            zIndex: userParams.zIndex || 1
        };

        return mergedParams;
    }


    /**
     * Validate parameters
     * 
     * @param  {Object}
     * @return {Object}
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
                case 'title':
                    if (params.title === '') {
                        params.titleAsText = false;
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
     * Create all the needed html elements based on the passed parameters
     * 
     * @param  {Object}
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

        // Apply style to arrow
        arrow.style.width = 0 + 'px';
        arrow.style.height = 0 + 'px';
        arrow.style.borderStyle = 'solid';
        arrow.style.borderWidth = '0px 10px 10px';
        arrow.style.borderColor = 'transparent transparent' + params.arrowColor;
        arrow.style.margin = '0px auto';
        arrow.style.paddingTop = '13px';
    }


    /**
     * Call the functions needed for the script to run
     * 
     */
    function boot() {
        var mergedParams = mergeParameters(userParams);
        if (mergedParams === false) return;
        var params = checkParameters(mergedParams);
        createElements(params);
    }


    // Wait for the document to be ready. Then call 'boot' function.
    if (document.readyState !== 'loading') {
        boot();
    } else {
        document.addEventListener('DOMContentLoaded', boot);
    }


});