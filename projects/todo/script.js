var titleVar;
var descVar;
var dateVar;
var timeVar;
var rootVar;
var ls;
var taskCount;
$(document).ready(function() {
    ls = localStorage;
    taskCount = ls.getItem('taskCount');
    if (taskCount == null) {
        taskCount = 0;
    }
    $('#settings-container').hide()
    rootVar = document.querySelector(':root')
    titleVar = document.getElementById('addTaskTitle');
    descVar = document.getElementById('addTaskDescription');
    dateVar = document.getElementById('addTaskDate');
    timeVar = document.getElementById('addTaskTime');
    $('.err').hide()
    $('#settings').on('mouseenter', function(){
        rootVar.style.setProperty('--rotateit', 'rotate(45deg)');
        rootVar.style.setProperty('--scale', 'scale(1.1)');
    })
    $('#settings').on('mouseleave', function(){
        rootVar.style.setProperty('--rotateit', 'rotate(0deg)');
        rootVar.style.setProperty('--scale', 'scale(1)');
    })
    readLocalStoragee();
    loadBg();
    bgblur();
    huerotate();
});
function huerotate(n) {
    if (n == null) {
        rootVar.style.setProperty('--hue-rotateit', 'hue-rotate('+ls.getItem('hue')+'deg)');
        document.getElementById('hueslider').value = ls.getItem('hue');
    } else {
    rootVar.style.setProperty('--hue-rotateit', 'hue-rotate('+n+'deg)');
    ls.setItem('hue', n)
    }};
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
    if (isInPast(new Date(dateVar.value))){
        $('#errDate').show();
        $('#errDate').text('Date already Passed!');  
        pass = false;
    } else {
        $('#errDate').hide();
    }
    if (pass && dateVar.value == '' && timeVar.value == '') {
        $('#errSubmit').hide();
        taskCount = parseInt(taskCount) + 1;
        ls.setItem('taskCount', taskCount);
        saveTaskToLS(titleVar.value, descVar.value, 0, 0, taskCount);
    }
    else if (pass) {
        $('#errSubmit').hide();
        var xyz = dateVar.value;
        var dateee = xyz.slice(8, 10) + xyz.slice(4, 8) + xyz.slice(0, 4);
        taskCount = parseInt(taskCount) + 1;
        ls.setItem('taskCount', taskCount);
        saveTaskToLS(titleVar.value, descVar.value, dateee, timeVar.value, taskCount);
    } else {
        $('#errSubmit').show();
        $('#errSubmit').text('Something went wrong.');
}};
function saveTaskToLS(title, desc, date, time, id) {
    ls.setItem('task'+id +'title', title);
    ls.setItem('task'+id +'desc', desc);
    ls.setItem('task'+id +'date', date);
    ls.setItem('task'+id +'time', time);
    addTask(title, desc, date, time, id);
};
function isInPast(date) {
    const today = new Date();
    return date < today.setDate(today.getDate() - 1);
};
function delTask(e) {
    var n = e.parentElement.parentElement.id;
    localStorage.removeItem(n+'title');
    localStorage.removeItem(n+'desc');
    localStorage.removeItem(n+'date');
    localStorage.removeItem(n+'time');
    $(e).parent().parent().fadeOut(500, function() {setTimeout($(e).parent().remove(), 100)});
};


function addTask(addTextTitle, addTextDesc, addTextDate, addTextTime, id) {
    if (addTextTitle == null || addTextDesc == null) {return};
    if (addTextDate == 0 && addTextTime == 0) {
        $('#tasks').append('<div id=task'+id+' class="task fadein"><div id="taskHeaderContainer"><h1 class="title">'+addTextTitle+'</h1><img onclick="delTask(this)" class="ximg" src="assets/images/x.png" alt="cross"></div><div class="seperator"></div><p id="description">'+addTextDesc+'</p></div>');
    } else {
     $('#tasks').append('<div id=task'+id+' class="task fadein"><div id="taskHeaderContainer"><h1 class="title">'+addTextTitle+'</h1><img onclick="delTask(this)" class="ximg" src="assets/images/x.png" alt="cross"></div><div class="seperator"></div><p id="description">'+addTextDesc+'</p><div class="seperator"></div><p class="duetill">Task due till: '+addTextDate+' at '+addTextTime+'</p></div>');
    }
    $('.fadein').animate({
        opacity: 1
    }, 800, function() {
        $('.fadein').removeClass('fadein');
    });
    dateVar.value = '';
    titleVar.value = '';
    descVar.value = '';
    timeVar.value = '';
};

function devAdd(title, desc, date, time, id, times) {
    for (let i = 0; i < times; i++) {
        addTask(title, desc, date, time, id);
}};
function bgblur(n) {
    if (n == null) {
        rootVar.style.setProperty('--blur-val', 'blur('+ls.getItem('blur')+'px)');
        document.getElementById('blurslider').value = ls.getItem('blur');
    } else {
    rootVar.style.setProperty('--blur-val', 'blur('+n+'px)');
    ls.setItem('blur', n);
}};

function bgImage(img) {
    rootVar.style.setProperty('--bg-image', 'url('+img+')');
    ls.setItem('bgImage', img);
};

function lightDark(n) {
    if (n.checked) {
        rootVar.style.setProperty('--colorscheme', 'rgba(7, 7, 7, 0.452)');
        rootVar.style.setProperty('--text-color', 'white');

    } else {
        rootVar.style.setProperty('--colorscheme', 'rgba(255, 255, 255, 0.352)');
        rootVar.style.setProperty('--text-color', 'black');
}};
function loadBg() {
    ls.getItem('bgImage');
    if (ls.getItem('bgImage') == null) {
        rootVar.style.setProperty('--bg-image', 'url(assets/images/chillin.gif)');
    } else {
        rootVar.style.setProperty('--bg-image', 'url('+ls.getItem("bgImage")+')');
}};
function readLocalStoragee() {
    if (ls.getItem('taskCount') == 0 || ls.getItem('taskCount') == null) {
        return;
    }
    for (var i = 1; i <= ls.getItem('taskCount'); i++) {
        var title = ls.getItem('task'+i+'title');
        var desc = ls.getItem('task'+i+'desc');
        var date = ls.getItem('task'+i+'date');
        var time = ls.getItem('task'+i+'time');
        addTask(title, desc, date, time, i);
}};
