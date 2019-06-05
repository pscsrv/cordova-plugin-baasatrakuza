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

    // Test for v1.2.0
    require('./v1_2_0/test_runner').suite(helper);
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

    createActionButton('QRコード読み込み', function() {
        clearLog();
        RKZClient.getDataFromQRCode(
            '6d0d12a7c2496fe2ae2190a93e6b031a,e3fb0d02101edcea31731ee29239bf4d,LgMuJnqtiJMect5heHyVtDaHx78wxArwIkwqMbI2yng=',
            function(data) {
                logMessage( window.JSON.stringify(data) );
            }, function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            });
    }, "dump_device1");

    createActionButton('マスタお気に入り削除', function() {
        clearLog();
        RKZClient.deleteFavoriteToObjectData({
                object_id: 'spot',
                code: '0001'
            },
            "JFAkQm1lQTI2MjFOb3ZXdkd3VFZSOS5mZnc0c3QzL2NIMQ--",
            function(statusCode) {
                logMessage( statusCode );
            },
            function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            }
        );
    }, "dump_device1");

    createActionButton('マスタお気に入り登録', function() {
        clearLog();
        RKZClient.addFavoriteToObjectData({
                object_id: 'spot',
                code: '0001'
            },
            "JFAkQm1lQTI2MjFOb3ZXdkd3VFZSOS5mZnc0c3QzL2NIMQ--",
            function(statusCode) {
                logMessage( statusCode );
            },
            function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            }
        );
    }, "dump_device1");

    var addFavoriteToNews = function() {
        
    };

    var deleteFavoriteToNews = function() {
        
    };

    var getDataList = function() {
        var searchConditions = [
            RKZSearchCondition.withFavorite.all()
        ];
        RKZClient.getDataList(
            "spot",
            searchConditions,
            null,
            {
                user_access_token: "JFAkQm1lQTI2MjFOb3ZXdkd3VFZSOS5mZnc0c3QzL2NIMQ--"
            },
            function(datas) {
                logMessage( window.JSON.stringify(datas) );
            }, function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            }
        );
};

    createActionButton('Click !', function() {
        clearLog();

        RKZClient.clearPushDeviceToken(
            "JFAkQm1lQTI2MjFOb3ZXdkd3VFZSOS5mZnc0c3QzL2NIMQ--",
            function(status) {
                logMessage( status );
            }, function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            }
        );

        // 通常
        RKZClient.getDataList(
            "spot",
            null,
            null,
            function(datas) {
                logMessage( window.JSON.stringify(datas) );
                logMessage( '==============================' );
                // サマリ表示
                RKZClient.getDataList(
                    "spot",
                    null,
                    null,
                    {
                        show_favorite_summary: true
                    },
                    function(datas) {
                        logMessage( window.JSON.stringify(datas) );
                        logMessage( '==============================' );
                        // お気に入り登録状況を表示
                        var searchConditions = [
                            RKZSearchCondition.withFavorite.all()
                        ];
                        RKZClient.getDataList(
                            "spot",
                            searchConditions,
                            null,
                            {
                                user_access_token: "JFAkQm1lQTI2MjFOb3ZXdkd3VFZSOS5mZnc0c3QzL2NIMQ--"
                            },
                            function(datas) {
                                logMessage( window.JSON.stringify(datas) );
                            }, function(error) {
                                logMessage("Error >>>>>", "#FF0000");
                                logMessage( window.JSON.stringify(error), "#FF0000");
                            }
                        );
                    }, function(error) {
                        logMessage("Error >>>>>", "#FF0000");
                        logMessage( window.JSON.stringify(error), "#FF0000");
                    }
                );
            }, function(error) {
                logMessage("Error >>>>>", "#FF0000");
                logMessage( window.JSON.stringify(error), "#FF0000");
            }
        );




    }, "dump_device1");
};
