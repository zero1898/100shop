$(document).ready(function() {

    // 切换搜索框
    (function() {
        var aLi = $('#menu li');
        var oText = $('#search').find('.form .text');
        var arrText = [
            '例如0：啊打发打发的身份',
            '例如1：啊等发达省份啊打发的',
            '例如2： 打发打发打发手动阀发的',
            '例如3：啊但是犯得上发射点法发的',
            '例如4：阿斯顿发生发大水发射点发'
        ];
        var iNow = 0;

        oText.val(arrText[iNow]);

        aLi.each(function(index) {
            $(this).click(function() {
                aLi.attr('class', 'gradient');
                $(this).attr('class', 'active');
                iNow = index;
                oText.val(arrText[iNow]);
            });
        });

        oText.focus(function() {
            if ($(this).val() === arrText[iNow]) {
                $(this).val('');
            }
        });
        oText.blur(function() {
            if ($(this).val() === '') {
                oText.val(arrText[iNow]);
            }
        });
    })();

    // update文字滚动
    (function() {
        var oDiv = $('.update');
        var oUl = oDiv.find('ul');
        var iH = 0;
        var arrData = [{
            'name': '萱萱',
            'time': 4,
            'title': '那些灿烂华美的瞬间',
            'url': '#'
        }, {
            'name': '畅畅',
            'time': 5,
            'title': '广东3天抓获涉黄疑犯',
            'url': '#'
        }, {
            'name': '萱萱',
            'time': 6,
            'title': '国台办回应王郁琦',
            'url': '#'
        }, {
            'name': '畅畅',
            'time': 7,
            'title': '那些灿烂华美的瞬间',
            'url': '#'
        }, {
            'name': '萱萱',
            'time': 8,
            'title': '那些灿烂华美的瞬间',
            'url': '#'
        }, {
            'name': '畅畅',
            'time': 9,
            'title': '广东3天抓获涉黄疑犯',
            'url': '#'
        }, {
            'name': '萱萱',
            'time': 10,
            'title': '国台办回应王郁琦',
            'url': '#'
        }, {
            'name': '畅畅',
            'time': 11,
            'title': '那些灿烂华美的瞬间',
            'url': '#'
        }];
        var str = '';
        var iArrDataLen = arrData.length;
        var oUpBtn = $('#updateUpBtn');
        var oDownBtn = $('#updateDownBtn');
        var iNow = 0;
        var timer = null;

        for (var i = 0; i < iArrDataLen; i++) {
            str += '<li><a href="' + arrData[i].url + '"><strong>' + arrData[i].name + '</strong> <span>' + arrData[i].time + '分钟前</span> 写了一篇新文章：' + arrData[i].title + '…</a></li>'
        }
        oUl.html(str);
        iH = oUl.find('li').height();

        oUpBtn.click(function() {
            doMove(1);
        });
        oDownBtn.click(function() {
            doMove(-1);
        });

        oDiv.hover(function() {
            clearInterval(timer);
        }, autoMove);

        function autoMove() {
            timer = setInterval(function() {
                doMove(-1);
            }, 3000);
        }

        function doMove(num) {
            iNow += num;
            if (Math.abs(iNow) > iArrDataLen - 1) {
                iNow = 0;
            }
            if (iNow > 0) {
                iNow = -(iArrDataLen - 1);
            }
            oUl.stop().animate({
                'top': iH * iNow
            }, 3000);
        }
    })();

    // options选项卡切换
    (function() {
        fnTab($('.tabNav1'), $('.tabCon1'), 'click');
        fnTab($('.tabNav2'), $('.tabCon2'), 'click');
        fnTab($('.tabNav3'), $('.tabCon3'), 'mouseover');
        fnTab($('.tabNav4'), $('.tabCon4'), 'mouseover');

        function fnTab(oNav, aCon, sEvent) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function(index) {
                $(this).on(sEvent, function() {
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class', 'triangle_down_gray');
                    $(this).find('a').attr('class', 'triangle_down_red');

                    aCon.hide().eq(index).show();
                });
            });
        }
    })();

    //图片自动播放
    (function() {
        var oDiv = $('#fade');
        var aUlLi = oDiv.find('ul li');
        var aOlLi = oDiv.find('ol li');
        var oP = oDiv.find('p');
        var arr = ['爸爸去哪了0', '啊等发达省份1', '啊等发达省份2'];
        var iArrLen = arr.length;
        var iNow = 0;
        var timer = null;

        fnFade();

        aOlLi.click(function() {
            iNow = $(this).index();
            fnFade();
        });
        oDiv.hover(function() {
            clearInterval(timer);
        }, autoFade);

        function autoFade() {
            timer = setInterval(function() {
                iNow++;
                iNow %= iArrLen;
                fnFade();
            }, 3000);
        }
        autoFade();

        function fnFade() {
            aUlLi.each(function(index) {
                if (index != iNow) {
                    aUlLi.eq(index).fadeOut().css('zIndex', 1);
                    aOlLi.eq(index).removeClass('active');
                } else {
                    aUlLi.eq(index).fadeIn().css('zIndex', 2);
                    aOlLi.eq(index).addClass('active');
                }
            });
            oP.text(arr[iNow]);
        }
    })();

    // 日历提示
    (function() {
        var aSpan = $('.calendar h3 span');
        var iSpanLen = aSpan.length;
        var aImg = $('.calendar .img');
        var iImgLen = aImg.length;
        var oInfo = $('.calendar .today_info');
        var oImg = oInfo.find('img');
        var oStrong = oInfo.find('strong');
        var oP = oInfo.find('p');
        aImg.hover(function() {
            var oParent = $(this).parent();
            var oParentPos = oParent.position();
            var iTop = oParentPos.top - 30;
            var iLeft = oParentPos.left + 55;
            var index = oParent.index() % iSpanLen;

            oInfo.show().css({
                'left': iLeft,
                'top': iTop
            });
            oP.text($(this).attr('info'));
            oImg.attr('src', $(this).attr('src'));
            oStrong.text(aSpan.eq(index).text());
        }, function() {
            oInfo.hide();
        });
    })();

    //BBS高亮
    (function() {
        var aLi = $('.bbs ol li');
        aLi.mouseover(function() {
            aLi.removeClass('active').eq($(this).index()).addClass('active');
        })
    })();

    // HOT鼠标提示效果
    (function() {
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        $('.hot_area li').mouseover(function() {

            if ($(this).index() === 0) {
                return;
            }

            $('.hot_area li p').remove();

            $(this).append('<p style="width:' + ($(this).width() - 12) + 'px; height:' + ($(this).height() - 12) + 'px;">' + arr[$(this).index()] + '</p>');
        });
    })();
});
