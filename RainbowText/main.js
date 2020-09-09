// ==UserScript==
// @name         MCBBS Rainbow text
// @namespace    https://i.zapic.cc/
// @version      0.1-beta
// @description  Quick rainbow text
// @author       Zapic
// @match        https://www.mcbbs.net/*
// @run-at       document-body
// @grant        unsafeWindow
// ==/UserScript==

(async()=> {
    await unsafeWindow.MExt;
    let MExt = unsafeWindow.MExt;
    let $ = MExt.jQuery;
    let dlg = MExt.debugLog;
    let staticRes = {
        "rainbowBtnImage": "data:image/png;base64,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"
    };
    let quickRainbow = {
        "runcase": () => { return MExt.ValueStorage.get("quickRainbow") },
        "config": [{
            "id": "quickRainbow",
            "default": true,
            "name": "编辑器支持彩虹文字",
            "type": "check",
            "desc": "快速向贴内插入彩虹文字."
        }],
        "style": `#fastpostrainbow, #postrainbow,#e_rbn_s1 {
background-image: url(` + staticRes.rainbowBtnImage + `);
background-size: 28px;
background-position: center top;
}
#fastpostrainbow.in_editorbtn , #postrainbow {
background-size: 16px;
background-position: center;
}`,
        "core": () => {
            let rainbowFast = () => {
            let target = document.getElementById("fastpostmessage");
            if (target.selectionStart != target.selectionEnd) {
                let str = target.value.substr(target.selectionStart, target.selectionEnd);
                seditor_insertunit('fastpost', gencode(str, 0), '');
            }
        };
            let rainbowFloat = () => {
            let target = document.getElementById("postmessage");
            if (target.selectionStart != target.selectionEnd) {
                let str = target.value.substr(target.selectionStart, target.selectionEnd);
                seditor_insertunit('post', gencode(str, 0), '');
            }
        };
            let rainbow = () => {
                if (getSel() == "") {
                    return;
                }
                addSnapshot(getEditorContents());
                insertText(gencode(getSel(), wysiwyg));
            };
            let hookReplyBtn = () => {
                if ($("#postrainbow").length > 0) { return false; }
                let btn = document.createElement("a");
                btn.id = "postrainbow";
                btn.href = "javascript:;";
                btn.title = "彩虹文字";
                btn.addEventListener("click", rainbowFloat);
                btn.innerText = "彩虹文字";
                $("#postat.fat").after(btn);
                dlg("Reply bottons appends.");
            }
            $("#append_parent").on('DOMNodeInserted', hookReplyBtn);
            $(() => {
            let btn = document.createElement("a");
            btn.id = "fastpostrainbow";
            btn.href = "javascript:;";
            btn.title = "彩虹文字";
            btn.className = "in_editorbtn";
            btn.addEventListener("click", rainbowFast);
            btn.innerText = "彩虹文字";
            $("#fastpostat").after(btn);
            let btn2 = document.createElement("a");
            btn2.id = "e_rbn_s1";
            btn2.href = "javascript:;";
            btn2.title = "彩虹文字";
            btn2.addEventListener("click", rainbow);
            btn2.innerText = "彩虹文字";
            $("#e_adv_s1").append(btn2);
        });
            let nextColor = (clr, step) => {
            if (clr.r == 255 && clr.b != 255) {
                clr.g -= step;
            } else if (clr.g == 255 && clr.r != 255) {
                clr.b -= step;
            } else if (clr.b == 255 && clr.g != 255) {
                clr.r -= step;
            }
            while (clr.r > 255 || clr.r < 0 || clr.g > 255 || clr.g < 0 || clr.b > 255 || clr.b < 0) {
                if (clr.r > 255) {
                    clr.g += 255 - clr.r;
                    clr.r = 255;
                    continue;
                }
                if (clr.g < 0) {
                    clr.b -= clr.g;
                    clr.g = 0;
                    continue;
                }
                if (clr.b > 255) {
                    clr.r += 255 - clr.b;
                    clr.b = 255;
                    continue;
                }
                if (clr.r < 0) {
                    clr.g -= clr.r;
                    clr.r = 0;
                    continue;
                }
                if (clr.g > 255) {
                    clr.b += 255 - clr.g;
                    clr.g = 255;
                    continue;
                }
                if (clr.b < 0) {
                    clr.r -= clr.b;
                    clr.b = 0;
                    continue;
                }
            }
            return clr;
        }
            let dCode = (str) => {
            while (str.length < 2) {
                str = "0" + str;
            }
            return str;
        }
            let HexC = (color) => {
            return "#" + dCode(parseInt(color.r).toString(16)) + dCode(parseInt(color.g).toString(16)) + dCode(parseInt(color.b).toString(16));
        }
            let gencode = (str, type) => {
            let color = {
                "r": 255,
                "g": 0,
                "b": 0
            }
            let len = str.length;
            let step = 1530 / len < 1 ? 1 : 1530 / len;
            let rstr = '';
            for (let i = 0; i < len; i++) {
                if (type == 0) {
                    rstr += "[color=" + HexC(color) + "]" + str.charAt(i) + "[/color]";
                } else {
                    rstr += "<font color=\"" + HexC(color) + "\">" + str.charAt(i) + "</font>";
                }
                color = nextColor(color, step);
            }
            return rstr;
        };
        }
    }
    MExt.exportModule(quickRainbow);
})();
