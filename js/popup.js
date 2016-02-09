var namespace = 'chromeSync',
    chromeWindows = chrome.extension.getViews(),
    _backgroundWindow = chromeWindows[0],
    _popupWindow = chromeWindows[1],
    el = _popupWindow.document.getElementById('container-popup'),
    PopupView = _backgroundWindow[namespace].PopupView;
_backgroundWindow[namespace].popupView = ((el) ? new PopupView({ el: el }) : PopupView);
