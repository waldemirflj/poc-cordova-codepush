/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        // App Center: Push
        this.appCenterPush();
        this.enablePush();
        this.checkPush();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    appCenterPush: function() {
        const onNotificationReceived = (pushNotification) => {
            let message = pushNotification.message;
            let title = pushNotification.title;
    
            if (message === null || message === undefined) {
                // Android messages received in the background don't include a message. On Android, that fact can be used to
                // check if the message was received in the background or foreground. For iOS the message is always present.
                title = 'Android background';
                message = '<empty>';
            }
    
            // Custom name/value pairs set in the App Center web portal are in customProperties
            if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
                message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
            }
            
            console.log(title, message);
        };

        AppCenter.Push.addEventListener('notificationReceived', onNotificationReceived);
    },

    enablePush: function() {
        const enableSuccess = () => {
            console.log("push notifications enabled");
        }
        
        const disableSuccess = () => {
            console.log("push notifications disabled");
        }
        
        const error = (error) => {
            console.error(error);
        }

        const checkbox = document.querySelector('#enablePush');
        
        checkbox.addEventListener('change', () => {
            if(checkbox.checked) {
                AppCenter.Push.setEnabled(true, enableSuccess, error);
            } else {
                AppCenter.Push.setEnabled(false, disableSuccess, error);
            }
        });
    },

    checkPush: function() {
        const success = (result) => {
            console.log("push notifications " + (result) ? "enabled" : "disabled");
        }
        
        const error = (error) => {
            console.error(error);
        }
        
        AppCenter.Push.isEnabled(success, error);
    }
};

app.initialize();