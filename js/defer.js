$(function() {
    var url = window.location.href
    var mcolor = url ? url.split('?')[1].split('+')[1].split('#')[0] : window.location.search.slice(1);
    var cscolor = mcolor
    document.getElementById("buttonhire").style.backgroundColor = 'blue' ;
    document.getElementById("buttoncv").style.backgroundColor = 'blue' ;
    $('.btn-primary').hover( function() {$( this ).css({"background":cscolor})},function() {$( this ).css({"background":"blue"})} )
    $('#employeeabout p a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.progress-badge a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.h5 a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.category a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.page-header').css({"background":"linear-gradient(0deg, rgba(44, 44, 44, 0.2), "+ cscolor +")"})
    $('.progress').css({"background":"light"+ cscolor})
    $('.progress-bar').css({"background":cscolor})
    $('.progress-value').css({"color":cscolor})
    $(".col-md-3.bg-primary").attr('style', 'background-color: '+ cscolor +' !important');
    $('head').append('<style>.a:before{border:white !important;}</style>');
});
