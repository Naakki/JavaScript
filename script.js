// Modal window

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var closeBtn = document.getElementsByClassName('close');

btn.onclick = function () {
	modal.style.display = "block";
}
closeBtn.onclick = function () {
	modal.style.display = "none";
}
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

// Tabs - вкладки

var tab;
var tabContent;

window.onload = function () {
 	tabContent = document.getElementsByClassName('tabContent');
 	tab = document.getElementsByClassName('tab');
 }

function hideTabsContent(a) {
 	for (var i = a; i < tabContent.length; i++) {
 		tabContent[i].classList.remove('show');
 		tabContent[i].classList.add('hide');
 		tab[i].classList.remove('whiteborder'); 	
 	}
}

document.getElementById('tabs').onclick = function (event) {
	var target = event.target;
	if (target.className == 'tab'){
		for (var i = 0; i < tab.length; i++) {
			if (target == tab[i]) {
				showTabsContent(i);
				break;
			}
		}
	}
}

function showTabsContent(b) {
	if (tabContent[b].classList.contains('hide')) {
		hideTabsContent(0);
		tab[b].classList.add('whiteborder');
		tabContent[b].classList.remove('hide');
		tabContent[b].classList.add('show');
	}
}