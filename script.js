var titleVar;
var descVar;
var dateVar;
var timeVar;
$(document).ready(function() {
    $('#settings-container').hide()
    titleVar = document.getElementById('addTaskTitle');
    descVar = document.getElementById('addTaskDescription');
    dateVar = document.getElementById('addTaskDate');
    timeVar = document.getElementById('addTaskTime');
    $('.err').hide()
    $('#settings').on('mouseenter', function(){
        document.querySelector(':root').style.setProperty('--rotateit', 'rotate(45deg)');
        document.querySelector(':root').style.setProperty('--scale', 'scale(1.1)');
    })
    $('#settings').on('mouseleave', function(){
        document.querySelector(':root').style.setProperty('--rotateit', 'rotate(0deg)');
        document.querySelector(':root').style.setProperty('--scale', 'scale(1)');
    })

})
// $(window).on('resize', function(){
//     tasksresize();
// })
// function tasksresize() {
//     $('#tasks').css('width', window.innerWidth - 270 + 'px');
//     $('#tasks').css('height', window.innerHeight+ 'px');
// }
function blurr() {
    var blurval = document.getElementById('blurr').value;
    console.log(blurval)
    document.querySelector(':root').style.setProperty('--blur-val', 'blur('+blurval + 'px)');
}
function huerotate() {
    var huerotator = document.getElementById('huerotator').value;
    console.log(huerotator)
    document.querySelector(':root').style.setProperty('--hue-rotateit', 'hue-rotate('+huerotator + 'deg)');
}
function checks() {
    var pass = true;
    var titleLength = titleVar.value.length;
    var descLength = descVar.value.length;
    if (titleLength < 3 || titleLength > 32) {
        $('#errTitle').show();
        $('#errTitle').text('Please enter 3 - 32 characters.');
        pass = false;
    } else {
        $('#errTitle').hide();
    }
    if (descLength < 3 || descLength > 600) {
        $('#errDesc').show();
        $('#errDesc').text('Please enter 3 - 600 characters.');
        pass = false;
    } else {
        $('#errDesc').hide();
    }
    if (dateVar.value == '') {
        $('#errDate').show();
        $('#errDate').text('Please enter a date.');
        pass = false;
    } else if (isInPast(new Date(dateVar.value))){
        $('#errDate').show();
        $('#errDate').text('Date already Passed!');  
        pass = false;
    } else {
        $('#errDate').hide();
    }
    if (timeVar.value == '') {
        $('#errTime').show();
        $('#errTime').text('Please enter a Time.');
        pass = false;
    } else {
        $('#errTime').hide();
    }
    if (pass) {
        $('#errSubmit').hide();
        var xyz = dateVar.value
        var dateee = xyz.slice(8, 10) + xyz.slice(4, 8) + xyz.slice(0, 4)
        addTask(titleVar.value, descVar.value, dateee, timeVar.value)
    } else {
        $('#errSubmit').show();
        $('#errSubmit').text('Something went wrong.');
    }
}
function isInPast(date) {
    const today = new Date();
    return date < today.setDate(today.getDate() - 1);
}
function delTask(e) {
    $(e).parent().parent().fadeOut(500, function() {setTimeout($(e).parent().remove(), 100)});
}

//$("").fadeOut(400, function() {this.parent().remove()})
function addTask(addTextTitle, addTextDesc, addTextDate, addTextTime) {
    $('#tasks').append('<div class="task fadein"><div id="taskHeaderContainer"><h1 class="title">'+addTextTitle+'</h1><img onclick="delTask(this)" class="ximg" src="assets/images/x.png" alt="cross"></div><div class="seperator"></div><p id="description">'+addTextDesc+'</p><div class="seperator"></div><p class="duetill">Task due till: '+addTextDate+' at '+addTextTime+'</p></div>')
    $('.fadein').animate({
        opacity: 1
    }, 800, function() {
        $('.fadein').removeClass('fadein')
    });
    dateVar.value = '';
    titleVar.value = '';
    descVar.value = '';
    timeVar.value = '';

}

function bgblur(n) {
    document.querySelector(':root').style.setProperty('--blur-val', 'blur('+n+'px)')
    document.cookie = "blur="+n+"; expires= Thu, 18 Dec 2025 12:00:00 UTC"
    //$('#settingBlur').text('Window Blur: '+n+'px')
}

function bgImage(img) {
    document.querySelector(':root').style.setProperty('--bg-image', 'url('+img+')')
}
