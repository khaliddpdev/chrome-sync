// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var views = chrome.extension.getViews(),
    _windows = {
        background : views[0],
        popup : views[1]
    };

var PopupView = _windows['background'].require('modules/views/view-popup'),
    popupView = new PopupView({el: _windows['popup'].document.getElementById('container-popup')});
