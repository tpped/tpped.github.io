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
    rootVar.style.setProperty('--blur-val', 'blur('+blurval + 'px)');
}
function huerotate() {
    var huerotator = document.getElementById('huerotator').value;
    console.log(huerotator)
    rootVar.style.setProperty('--hue-rotateit', 'hue-rotate('+huerotator + 'deg)');
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
        // add 1 to taskCount and save it to localStorage
        taskCount = parseInt(taskCount) + 1;
        ls.setItem('taskCount', taskCount);
        saveTaskToLS(titleVar.value, descVar.value, dateee, timeVar.value, taskCount);
    } else {
        $('#errSubmit').show();
        $('#errSubmit').text('Something went wrong.');
    }
}
function saveTaskToLS(title, desc, date, time, id) {
    ls.setItem('task'+id +'title', title)
    ls.setItem('task'+id +'desc', desc)
    ls.setItem('task'+id +'date', date)
    ls.setItem('task'+id +'time', time)
    addTask(title, desc, date, time, id)
}
function isInPast(date) {
    const today = new Date();
    return date < today.setDate(today.getDate() - 1);
}
function delTask(e) {
    var n = e.parentElement.parentElement.id;
    localStorage.removeItem(n+'title');
    localStorage.removeItem(n+'desc');
    localStorage.removeItem(n+'date');
    localStorage.removeItem(n+'time');
    $(e).parent().parent().fadeOut(500, function() {setTimeout($(e).parent().remove(), 100)});
}


function addTask(addTextTitle, addTextDesc, addTextDate, addTextTime, id) {
    if (addTextTitle == null || addTextDesc == null) { return}
    $('#tasks').append('<div id=task'+id+' class="task fadein"><div id="taskHeaderContainer"><h1 class="title">'+addTextTitle+'</h1><img onclick="delTask(this)" class="ximg" src="assets/images/x.png" alt="cross"></div><div class="seperator"></div><p id="description">'+addTextDesc+'</p><div class="seperator"></div><p class="duetill">Task due till: '+addTextDate+' at '+addTextTime+'</p></div>')
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
    rootVar.style.setProperty('--blur-val', 'blur('+n+'px)')
    document.cookie = "blur="+n+"; expires= Thu, 18 Dec 2025 12:00:00 UTC"
    //$('#settingBlur').text('Window Blur: '+n+'px')
}

function bgImage(img) {
    rootVar.style.setProperty('--bg-image', 'url('+img+')')
}

function lightDark(n) {
    if (n.checked) {
        console.log('checked');
        rootVar.style.setProperty('--colorscheme', 'rgba(7, 7, 7, 0.452)');
        rootVar.style.setProperty('--text-color', 'white');

    } else {
        console.log('unchecked');
        rootVar.style.setProperty('--colorscheme', 'rgba(255, 255, 255, 0.352)');
        rootVar.style.setProperty('--text-color', 'black');
        
    }
}
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function readLocalStoragee() {
    if (ls.getItem('taskCount') == 0 || ls.getItem('taskCount') == null) {
        console.log('no tasks');
        return;
    }
    // count up to the value of taskCount
    for (var i = 1; i <= ls.getItem('taskCount'); i++) {
        var title = ls.getItem('task'+i+'title');
        var desc = ls.getItem('task'+i+'desc');
        var date = ls.getItem('task'+i+'date');
        var time = ls.getItem('task'+i+'time');
        addTask(title, desc, date, time, i);
    }


}