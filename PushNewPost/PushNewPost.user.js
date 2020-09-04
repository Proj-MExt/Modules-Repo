// ==UserScript==
// @name         获取版块最新帖子
// @version      0.2
// @include      https://www.mcbbs.net/*
// @author       xmdhs
// @description  获取版块最新帖子。
// @namespace https://greasyfork.org/users/166541
// @run-at       document-body
// ==/UserScript==

(async () => {
    await unsafeWindow.MExt;
    let MExt = unsafeWindow.MExt;
    let $ = MExt.jQuery;
    Notification.requestPermission()
    const stime = 5000
    const getnewpost = {
        "runcase": () => { return MExt.ValueStorage.get("getnewpost").length > 0 },
        "core": () => {
            var fidstemp = MExt.ValueStorage.get("getnewpost")
            var fids = fidstemp.split(",")
            var id = Math.round(new Date().getTime() / 1000)
            var tempid = localStorage.getItem("getnewpost")
            if (tempid == null) {
                localStorage.setItem("getnewpost", id)
                tempid = id
                for (let index = 0; index < fids.length; index++) {
                    getposts(fids[index])
                }
            } else {
                var getifcan = setInterval(function () {
                    var atime = localStorage.getItem("getnewpost")
                    var btime = Math.round(new Date().getTime() / 1000)
                    if (btime - atime > 20) {
                        localStorage.setItem("getnewpost", btime)
                        for (let index = 0; index < fids.length; index++) {
                            getposts(fids[index])
                            clearInterval(getifcan)
                        }
                    }
                }, stime * 2)
            }
            function getposts(fid) {
                setInterval(function () {
                    localStorage.setItem("getnewpost", Math.round(new Date().getTime() / 1000))
                    $.getJSON("https://www.mcbbs.net/api/mobile/index.php?version=4&module=forumdisplay&fid=" + fid + "&filter=author&orderby=dateline",
                        function (ajson) {
                            if (localStorage.getItem("getnewpost-" + fid) == null || Math.round(new Date().getTime() / 1000) - JSON.parse(localStorage.getItem("getnewpost-" + fid)).time > 7200000 || JSON.parse(localStorage.getItem("getnewpost-" + fid)).time == undefined) {
                                var tids = { tids: [], time: 0 }
                                for (let index = 0; index < ajson.Variables.forum_threadlist.length; index++) {
                                    tids.tids.push(ajson.Variables.forum_threadlist[index].tid)
                                    tids.time = Math.round(new Date().getTime() / 1000)
                                }
                                localStorage.setItem("getnewpost-" + fid, JSON.stringify(tids))
                            } else {
                                var temptids = localStorage.getItem("getnewpost-" + fid)
                                var tids = JSON.parse(temptids)
                                for (let index = 0; index < ajson.Variables.forum_threadlist.length; index++) {
                                    if (tids.tids.indexOf(ajson.Variables.forum_threadlist[index].tid) == -1) {
                                        push(ajson.Variables.forum_threadlist[index].tid, ajson.Variables.forum_threadlist[index].subject)
                                        tids.tids.push(ajson.Variables.forum_threadlist[index].tid)
                                        if (tids.tids.length > 100) {
                                            tids.tids.splice(0, 30)
                                        }
                                        tids.time = Math.round(new Date().getTime() / 1000)
                                        localStorage.setItem("getnewpost-" + fid, JSON.stringify(tids))
                                    }
                                }
                            }
                        }
                    )
                }, stime)
            }

            function push(tid, subject) {
                var n = new Notification('发现新帖', {
                    body: subject,
                    data: {
                        url: "https://www.mcbbs.net/thread-" + tid + "-1-1.html#pgt"
                    }
                })
                n.onclick = function () {
                    window.open(n.data.url, '_blank');
                    n.close();
                }
            }
        },
        "config": [{
            "id": "getnewpost",
            "default": "52",
            "type": "text",
            "name": "推送版块最新帖子",
            "desc": "填入版块 fid，使用半角逗号隔开"
        }]
    }
    MExt.exportModule(getnewpost);
})();

