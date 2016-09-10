!function(win, $){
    // skill charts
    var skill_chart = $('.chart_item');
    var labelTop = {
        normal : {
            color: '#34cf75',
            label : {
                show : true,
                position : 'center',
                formatter : function(params){
                    return params.value + '%';
                },
                textStyle: {
                    fontsize: 32,
                    baseline : 'bottom'
                }
            },
            labelLine : {
                show : false
            }
        }
    };
    var labelFromatter = {
        normal : {
            label : {
                formatter : function (params){
                    return 100 - params.value + '%'
                },
                textStyle: {
                    fontSize: '43',
                    baseline : 'top'
                }
            }
        },
    }
    var labelBottom = {
        normal : {
            color: 'rgba(0,0,0,0)'
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var radius = ['60%', '67%'];
    var option = {
        'ui': {
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:10, itemStyle : labelBottom},
                        {name:'UI', value:90,itemStyle : labelTop}
                    ]
                }
            ]
        },
        'ue': {
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:15, itemStyle : labelBottom},
                        {name:'UI', value:85, itemStyle : labelTop}
                    ]
                }
            ]
        },
        'icon_design': {
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:18, itemStyle : labelBottom},
                        {name:'UI', value:82, itemStyle : labelTop}
                    ]
                }
            ]
        },
        'fe': {
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'other', value:27, itemStyle : labelBottom},
                        {name:'UI', value:73, itemStyle : labelTop}
                    ]
                }
            ]
        }
    };
    skill_chart.each(function(i, item){
        var chrt = echarts.init(item);
        var type = $(item).data('skill');
        chrt.setOption(option[type]);
    });
}(window, jQuery);
// 渲染作品
// !(function(win, $){
//     function renderSingleHtml(tpl, data){
//         return tpl.replace(/\{\{(\S+)\}\}/gi, function(s, p1){
//             return data[p1];
//         });
//     };
//     var pstr = '<div class="column" data-img_src="{{big_src}}">' +
//                     '<img src="{{thumb_src}}" alt="{{infor}}">' +
//                 '</div>';
//     var data = [{
//         big_src: 'https://d13yacurqjgara.cloudfront.net/users/2559/screenshots/2653171/jql_1x.gif',
//         thumb_src: 'https://d13yacurqjgara.cloudfront.net/users/2559/screenshots/2653171/jql_1x.gif',
//         infor: '网站首页1'
//     },{
//         big_src: 'https://d13yacurqjgara.cloudfront.net/users/1331/screenshots/2879974/la_tinder_1x.gif',
//         thumb_src: 'https://d13yacurqjgara.cloudfront.net/users/1331/screenshots/2879974/la_tinder_1x.gif',
//         infor: '网站首页2'
//     },{
//         big_src: 'https://d13yacurqjgara.cloudfront.net/users/1331/screenshots/2879974/la_tinder_1x.gif',
//         thumb_src: 'https://d13yacurqjgara.cloudfront.net/users/1331/screenshots/2879974/la_tinder_1x.gif',
//         infor: '网站首页3'
//     },{
//         big_src: 'https://d13yacurqjgara.cloudfront.net/users/32512/screenshots/2866655/tesla_doors_1x.gif',
//         thumb_src: 'https://d13yacurqjgara.cloudfront.net/users/32512/screenshots/2866655/tesla_doors_1x.gif',
//         infor: '网站首页4'
//     }];
//
// })(window, jQuery);
// 展示作品
!function(win, $){
    var portfolio = $('#portfolio').find('.column');
    var handler = $('#imgbox').find('.handeler');
    var current_index = 0;
    portfolio.on('click', function(){
        var self = $(this);
        var img_src = self.data('img_src');
        current_index = self.index();
        var portfolio_description = self.find('img').attr('alt') || '暂无描述';
        loadImage(img_src, portfolio_description);
    });
    handler.on('click', function(){
        var current, prev, next, src, description;
        if(current_index == 0){
            prev = portfolio.length - 1;
            next = 1;
        }else if(current_index == portfolio.length - 1){
            prev = current_index - 1;
            next = 0;
        }else{
            prev = current_index - 1;
            next = current_index + 1;
        }
        current = $(this).hasClass('prev') ? prev : next;
        src = portfolio.eq(current).data('img_src');
        description = portfolio.eq(current).find('img').attr('alt');
        loadImage(src, description, function(){
            current_index = current;
        });
    });
    function loadImage(src, description, callback){
        var image_modal = $('.show_portfolio');
        image_modal.modal('show');
        var img_container = image_modal.find('.img_container');
        var ratio = img_container.height()/img_container.width().toFixed(3);
        img_container.find('img').addClass('hidden');
        image_modal.find('.loading').show();
        var img = new Image();
        img.src = src;
        img.className = 'hidden';
        $(img).on('load', function(){
            var img_ratio = (img.naturalHeight/img.naturalWidth).toFixed(3);
            if(img_ratio < ratio){
                $(this).width('100%');
            }else{
                $(this).height('100%');
            }
            image_modal.find('p.description').text(description);
            image_modal.find('.loading').hide();
            img_container.html($(this));
            setTimeout(function(){
                image_modal.find('.hidden').removeClass('hidden');
            }, 100);
            typeof callback === 'function' ? callback() : null;
        });
    }
}(window, jQuery);