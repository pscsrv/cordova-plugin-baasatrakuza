/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/* jshint jasmine: true */
/* global MSApp */

var cordova = require('cordova');
var helper = require('./tests_helper');

var TIMEOUT = 30000;
var LICENSE_KEY = "{You.have.an.authentication_id}";

exports.defineAutoTests = function () {

    // Test for trial plan
    require('./trial_plan/test_runner').suite(helper);
    // Test for light plan
    require('./light_plan/test_runner').suite(helper);
    // Test for standard plan
    require('./standard_plan/test_runner').suite(helper);

};

exports.defineManualTests = function (contentEl, createActionButton) {

    var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    };

    var device_tests = '<h3>Press Dump Device button to get device information</h3>' +
        '<div id="dump_device1"></div>' +
        'Expected result: Status box will get updated with device info. (i.e. platform, version, uuid, model, etc)';

    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    RKZClient.setTenantKey(LICENSE_KEY,
        function() {
            logMessage("SDK Authorization OK.");
        },
        function(error) {
            logMessage("SDK Authorization NG.", "#FF0000");
            logMessage( window.JSON.stringify(error), "#FF0000");
        });

    createActionButton('Click !', function() {
        clearLog();

        var searchConditions = [];
        var sortConditions = [];
        RKZClient.getSpotList(searchConditions, sortConditions,
            function(datas) {
                logMessage( window.JSON.stringify(datas) );
            }, function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            });

    }, "dump_device1");
};
