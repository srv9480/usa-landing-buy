import config from "../libs.json";

// Start of LiveChat (www.livechatinc.com) code
setTimeout(() => {
    let tag = document.createElement('script');
    tag.async = false;

    const string = `
    window.__lc = window.__lc || {};
    window.__lc.license = ${config.livechat.license};
    (function() {
        var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
        lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();
    `;

    tag.type = 'text/javascript';
    tag.text = string;

    document.head.appendChild(tag);
}, 5000);
