// ==UserScript==
// @name         Async draft save
// @namespace    https://i.zapic.cc/
// @version      0.1
// @description  Async save your draft
// @author       Zapic
// @match        https://www.mcbbs.net/forum.php?mod=post*
// @run-at       document-body
// ==/UserScript==

// 此代码仅用于学习，不能用于其他用途。

(async()=>{
    await unsafeWindow.MExt;
    let MExt = unsafeWindow.MExt;
    let Module = {
        "core": ()=>{
            let AsyncData = undefined;
            let SendReq = ()=>{
                AsyncWorker.postMessage({
                    "action":"html2bbcode",
                    "allow":
                    {
                        "allowbbcode":allowbbcode,
                        "allowhtml":allowhtml,
                        "allowimgcode":allowimgcode,
                        "allowsmilies":allowsmilies
                    },
                    "check":{
                        "bbcodeoff":fetchCheckbox("bbcodeoff"),
                        "allowimgurl":fetchCheckbox("allowimgurl"),
                        "htmlon":fetchCheckbox("htmlon"),
                        "parseurloff":fetchCheckbox("parseurloff"),
                        "smileyoff":fetchCheckbox("smileyoff")
                    },
                    "data":editdoc.body.innerHTML
                });
                return new Promise((res, rej) => {
                    AsyncWorker.onmessage = ({ data }) => res(data);
                    AsyncWorker.onerror = ({ data }) => rej(data);
                });
            };

            let AsyncWorker = null;
            MExt.jQuery(()=>{
                AsyncWorker = new unsafeWindow.Worker(`data:image/png;base64,c2VsZi5vbm1lc3NhZ2UgPSAoZSkgPT4gew0KICAgIGlmIChlLmRhdGEuYWN0aW9uID09ICJodG1sMmJiY29kZSIpIHsNCiAgICAgICAgYWxsb3diYmNvZGUgPSBlLmRhdGEuYWxsb3cuYWxsb3diYmNvZGU7DQogICAgICAgIGFsbG93aHRtbCA9IGUuZGF0YS5hbGxvdy5hbGxvd2h0bWw7DQogICAgICAgIGFsbG93aW1nY29kZSA9IGUuZGF0YS5hbGxvdy5hbGxvd2ltZ2NvZGU7DQogICAgICAgIGFsbG93c21pbGllcyA9IGUuZGF0YS5hbGxvdy5hbGxvd3NtaWxpZXM7DQogICAgICAgIHNldHRpbmcgPSBlLmRhdGEuY2hlY2s7DQogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyJjb2RlIjoyMDAsImRhdGEiOmh0bWwyYmJjb2RlKGUuZGF0YS5kYXRhKX0pOw0KICAgIH0NCn0NCnZhciByZSA9IFtdOw0KdmFyIERJU0NVWkNPREUgPSBbXTsNCnZhciBFWFRSQUZVTkMgPSBbXTsNCmxldCBhbGxvd2JiY29kZSA9IGZhbHNlOw0KbGV0IGFsbG93aHRtbCA9IGZhbHNlOw0KbGV0IGFsbG93aW1nY29kZSA9IGZhbHNlOw0KbGV0IGFsbG93c21pbGllcyA9IGZhbHNlOw0KbGV0IHNldHRpbmcgPSBudWxsOw0KbGV0IHJlYWR5ID0gZmFsc2U7DQp0cnkgew0KICAgIGltcG9ydFNjcmlwdHMoImh0dHBzOi8vd3d3Lm1jYmJzLm5ldC9kYXRhL2NhY2hlL2JiY29kZS5qcz91Z20iKTsNCn0gY2F0Y2ggKGUpIHsNCiAgICBjb25zb2xlLmxvZyhlKTsNCiAgICBzZWxmLnBvc3RNZXNzYWdlKHsiY29kZSI6IC0xfSk7DQp9DQoNCmZ1bmN0aW9uIHRyaW0oc3RyKSB7DQogICAgcmV0dXJuIChzdHIgKyAnJykucmVwbGFjZSgvKFxzKykkL2csICcnKS5yZXBsYWNlKC9eXHMrL2csICcnKTsNCn0NCg0KZnVuY3Rpb24gcHJlZ19yZXBsYWNlKHNlYXJjaCwgcmVwbGFjZSwgc3RyLCByZWdzd2l0Y2gpIHsNCiAgICB2YXIgcmVnc3dpdGNoID0gIXJlZ3N3aXRjaCA/ICdpZycgOiByZWdzd2l0Y2g7DQogICAgdmFyIGxlbiA9IHNlYXJjaC5sZW5ndGg7DQogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykgew0KICAgICAgICByZSA9IG5ldyBSZWdFeHAoc2VhcmNoW2ldLCByZWdzd2l0Y2gpOw0KICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShyZSwgdHlwZW9mIHJlcGxhY2UgPT0gJ3N0cmluZycgPyByZXBsYWNlIDogKHJlcGxhY2VbaV0gPyByZXBsYWNlW2ldIDogcmVwbGFjZVswXSkpOw0KICAgIH0NCiAgICByZXR1cm4gc3RyOw0KfQ0KZmV0Y2hDaGVja2JveCA9IChjYm4pID0+IHsNCiAgICByZXR1cm4gc2V0dGluZ1tjYm5dID09IHRydWUgPyAxIDogMDsNCn0NCg0KZnVuY3Rpb24gcGFyc2V1cmwoc3RyLCBtb2RlLCBwYXJzZWNvZGUpIHsNCiAgICBpZiAoaXNVbmRlZmluZWQocGFyc2Vjb2RlKSkNCiAgICAgICAgcGFyc2Vjb2RlID0gdHJ1ZTsNCiAgICBpZiAocGFyc2Vjb2RlKQ0KICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFtjb2RlXF0oW1xzXFNdKz8pXFtcL2NvZGVcXS9pZywgZnVuY3Rpb24oJDEsICQyKSB7DQogICAgICAgICAgICByZXR1cm4gY29kZXRhZygkMiwgLTEpOw0KICAgICAgICB9KTsNCiAgICBzdHIgPSBzdHIucmVwbGFjZSgvKFtePj1cXSInXC9dfF4pKCgoKGh0dHBzP3xmdHApOlwvXC8pfHd3d1wuKShbXHdcLV0rXC4pKltcd1wtXHU0ZTAwLVx1OWZhNV0rXC4oW1wuYS16QS1aMC05XSt8XHU0RTJEXHU1NkZEfFx1N0Y1MVx1N0VEQ3xcdTUxNkNcdTUzRjgpKChcP3xcL3w6KStbXHdcLlwvPVw/JVwtJn5gQCc6KyFdKikrXC4oc3dmfGZsdikpL2lnLCAnJDFbZmxhc2hdJDJbL2ZsYXNoXScpOw0KICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oW14+PVxdIidcL118XikoKCgoaHR0cHM/fGZ0cCk6XC9cLyl8d3d3XC4pKFtcd1wtXStcLikqW1x3XC1cdTRlMDAtXHU5ZmE1XStcLihbXC5hLXpBLVowLTldK3xcdTRFMkRcdTU2RkR8XHU3RjUxXHU3RURDfFx1NTE2Q1x1NTNGOCkoKFw/fFwvfDopK1tcd1wuXC89XD8lXC0mfmBAJzorIV0qKStcLihtcDN8d21hKSkvaWcsICckMVthdWRpb10kMlsvYXVkaW9dJyk7DQogICAgc3RyID0gc3RyLnJlcGxhY2UoLyhbXj49XF0iJ1wvQF18XikoKCgoaHR0cHM/fGZ0cHxnb3BoZXJ8bmV3c3x0ZWxuZXR8cnRzcHxtbXN8Y2FsbHRvfGJjdHB8ZWQya3x0aHVuZGVyfHFxZGx8c3luYWNhc3QpOlwvXC8pKShbXHdcLV0rXC4pKls6XC5AXC1cd1x1NGUwMC1cdTlmYTVdK1wuKFtcLmEtekEtWjAtOV0rfFx1NEUyRFx1NTZGRHxcdTdGNTFcdTdFREN8XHU1MTZDXHU1M0Y4KSgoXD98XC98OikrW1x3XC5cLz1cPyVcLSY7fmBAJzorISNdKikqKS9pZywgbW9kZSA9PSAnaHRtbCcgPyAnJDE8YSBocmVmPSIkMiIgdGFyZ2V0PSJfYmxhbmsiPiQyPC9hPicgOiAnJDFbdXJsXSQyWy91cmxdJyk7DQogICAgc3RyID0gc3RyLnJlcGxhY2UoLyhbXlx3Pj1cXSInXC9AXXxeKSgod3d3XC4pKFtcd1wtXStcLikqWzpcLkBcLVx3XHU0ZTAwLVx1OWZhNV0rXC4oW1wuYS16QS1aMC05XSt8XHU0RTJEXHU1NkZEfFx1N0Y1MVx1N0VEQ3xcdTUxNkNcdTUzRjgpKChcP3xcL3w6KStbXHdcLlwvPVw/JVwtJjt+YEAnOishI10qKSopL2lnLCBtb2RlID09ICdodG1sJyA/ICckMTxhIGhyZWY9IiQyIiB0YXJnZXQ9Il9ibGFuayI+JDI8L2E+JyA6ICckMVt1cmxdJDJbL3VybF0nKTsNCiAgICBzdHIgPSBzdHIucmVwbGFjZSgvKFteXHctPj1cXToiJ1wuXC9dfF4pKChbXC1cLlx3XStAW1wuXC1cd10rKFwuXHcrKSspKS9pZywgbW9kZSA9PSAnaHRtbCcgPyAnJDE8YSBocmVmPSJtYWlsdG86JDIiPiQyPC9hPicgOiAnJDFbZW1haWxdJDJbL2VtYWlsXScpOw0KICAgIGlmIChwYXJzZWNvZGUpIHsNCiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gRElTQ1VaQ09ERVsnbnVtJ107IGkrKykgew0KICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoIltcdERJU0NVWl9DT0RFXyIgKyBpICsgIlx0XSIsIERJU0NVWkNPREVbJ2h0bWwnXVtpXSk7DQogICAgICAgIH0NCiAgICB9DQogICAgcmV0dXJuIHN0cjsNCn0NCg0KZnVuY3Rpb24gaXNVbmRlZmluZWQodmFyaWFibGUpIHsNCiAgICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IGZhbHNlOw0KfQ0KZnVuY3Rpb24gY29kZXRhZyh0ZXh0LCBicikgew0KICAgIHZhciBiciA9ICFiciA/IDEgOiBicjsNCiAgICBESVNDVVpDT0RFWydudW0nXSsrOw0KICAgIGlmIChiciA+IDAgJiYgdHlwZW9mIHd5c2l3eWcgIT0gJ3VuZGVmaW5lZCcgJiYgd3lzaXd5ZykNCiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvPGJyW15cPl0qPi9pZywgJ1xuJyk7DQogICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXCQvaWcsICckJCcpOw0KICAgIERJU0NVWkNPREVbJ2h0bWwnXVtESVNDVVpDT0RFWydudW0nXV0gPSAnW2NvZGVdJyArIHRleHQgKyAnWy9jb2RlXSc7DQogICAgcmV0dXJuICdbXHRESVNDVVpfQ09ERV8nICsgRElTQ1VaQ09ERVsnbnVtJ10gKyAnXHRdJzsNCn0=`);
                unsafeWindow.TestAsync = SendReq;
            });
            (async ()=>{
                let getById = (id)=>{return document.getElementById(id)};
                await unsafeWindow.saveData;
                unsafeWindow.saveData = async (ignoreempty) =>{
                    ignoreempty = unsafeWindow.isUndefined(ignoreempty) ? 0 : ignoreempty;
                    let target = getById('postform');
                    if (!target) return;
                    if(typeof wysiwyg != 'undefined' && wysiwyg == 1){
                        setTimeout(setEditorTip,1,"正在保存数据...");
                    }
                    let bbcode = (typeof wysiwyg != 'undefined' && wysiwyg == 1) ? (await SendReq()).data : getById('postform').message.value;
                    if (typeof isfirstpost != 'undefined') {
                        if (typeof wysiwyg != 'undefined' && wysiwyg == 1) {
                            var messageisnull = trim(bbcode) === '';
                        } else {
                            var messageisnull = bbcode === '';
                        }
                        if (isfirstpost && (messageisnull && $('postform').subject.value === '')) {
                            return;
                        }
                        if (!isfirstpost && messageisnull) {
                            return;
                        }
                    }
                    var data = subject = message = '';
                    for (var i = 0; i < target.elements.length; i++) {
                        var el = target.elements[i];
                        if (el.name != '' && (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA' || el.tagName == 'INPUT' && (el.type == 'text' || el.type == 'checkbox' || el.type == 'radio' || el.type == 'hidden' || el.type == 'select')) && el.name.substr(0, 6) != 'attach') {
                            var elvalue = el.value;
                            if (el.name == 'subject') {
                                subject = trim(elvalue);
                            } else if (el.name == 'message') {
                                if (typeof wysiwyg != 'undefined' && wysiwyg == 1) {
                                    elvalue = bbcode;
                                }
                                message = trim(elvalue);
                            }
                            if ((el.type == 'checkbox' || el.type == 'radio') && !el.checked) {
                                continue;
                            } else if (el.tagName == 'SELECT') {
                                elvalue = el.value;
                            } else if (el.type == 'hidden') {
                                if (el.id) {
                                    eval('var check = typeof ' + el.id + '_upload == \'function\'');
                                    if (check) {
                                        elvalue = elvalue;
                                        if ($(el.id + '_url')) {
                                            elvalue += String.fromCharCode(1) + $(el.id + '_url').value;
                                        }
                                    } else {
                                        continue;
                                    }
                                } else {
                                    continue;
                                }
                            }
                            if (trim(elvalue)) {
                                data += el.name + String.fromCharCode(9) + el.tagName + String.fromCharCode(9) + el.type + String.fromCharCode(9) + elvalue + String.fromCharCode(9, 9);
                            }
                        }
                    }
                    if (!subject && !message && !ignoreempty) {
                        return;
                    }
                    saveUserdata('forum_' + discuz_uid, data);
                    setEditorTip("数据已保存");
                }
            })();
        }
    }
    MExt.exportModule(Module);
})();
