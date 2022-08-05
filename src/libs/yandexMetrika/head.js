import libs from "../libs.json";

(() => {
    let script = document.createElement('script');
    // script.setAttribute("async", "");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        window.ym(${libs.yandexMetrika.id}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        })
    `;
    document.head.appendChild(script);

    let
        noScript    = document.createElement("noscript"),
        div         = document.createElement('div'),
        img         = document.createElement('img');
    img.setAttribute("src", `https://mc.yandex.ru/watch/${libs.yandexMetrika.id}`);
    img.setAttribute("style", "position:absolute; left:-9999px;");
    div.appendChild(img);
    noScript.appendChild(div);
    document.body.appendChild(noScript);
})();