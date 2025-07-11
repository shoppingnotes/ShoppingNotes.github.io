var nurl, nurlinput, oldurlval;

nurl = 1;
nurlinput = 0;

function more_urls() {
    var urls;
    var i;

    urls = new Array();

    if (nmaxalert !== null && nurl > nmaxalert - nalert) {
        if (confirm('You have exceeded the maximum number of alerts you are ' +
                    'allowed to set. Would you like to learn how to increase ' +
                    'this limit?') == true) location = '/help';

        return;
    }

    for (i = 0; i < nurl; i++) urls.push(document.getElementById('url' + i).value);
    if (browsergroup == 'ie') {
        document.getElementById('urlsarea').innerHTML += ('<br>' +
                                                          '<input type="text" id="url' + nurl + '" name="urls[]" style="color: #000000; width: 400; margin-top: 3" onKeyDown="javascript: url_on_key_down(' + nurl + ');" onKeyUp="javascript: url_on_key_up(' + nurl + ');">');
    }
    else {
        document.getElementById('urlsarea').innerHTML += ('<br>' +
                                                          '<input type="text" id="url' + nurl + '" name="urls[]" style="color: #000000; width: 100%; margin-top: 3" onKeyDown="javascript: url_on_key_down(' + nurl + ');" onKeyUp="javascript: url_on_key_up(' + nurl + ');">');
    }
    for (i = 0; i < nurl; i++) document.getElementById('url' + i).value = urls[i];
    nurl++;
    nurlinput++;
}

function url0_on_focus() {
    if (ifexampleurl0 == 1) {
        document.getElementById('url0').value = '';
        document.getElementById('url0').style.color = '#000000';

        ifexampleurl0 = 0;
    }
}

function url_on_key_down(i) {
    if (i >= nurlinput) {
        oldurlval = document.getElementById('url' + i).value;
    }
}

function url_on_key_up(i) {
    var url, slen, range;

    if (i >= nurlinput && document.getElementById('url' + i).value != oldurlval) {
        more_urls();
        url = document.getElementById('url' + i);
        slen = url.value.length;
        url.focus();
        if (url.createTextRange !== undefined) {
            range = url.createTextRange();
            range.move("character", slen);
            range.select();
        }
        else if(url.setSelectionRange !== undefined) {
            url.setSelectionRange(slen, slen);
        }
    }
}

function email_on_focus() {
    if (ifexampleemail == 1) {
        document.getElementById('email').value = '';
        document.getElementById('email').style.color = '#000000';

        ifexampleemail = 0;
    }
}

function getalerts_on_click() {
    if (ifexampleurl0 == 1) document.getElementById('url0').value = '';
}

function send_alerts_to_friends() {
    document.getElementById('friendemailarea').innerHTML =
    '<div style="margin-top: 10"></div>' +
    'Friends\' email addresses (separate by comma)' +
    '<br>' +
    '<input id="friendemail" type="text" style="color: #000000; width: 400; margin-top: 3"> ' +
    '<iframe id="selcontacts" name="selcontacts" src="/selectcontacts?emailid=friendemail" width="400" height="80" marginwidth="0" marginheight="0" style="display: none; margin-top: 3" onLoad="javascript: selectcontacts_on_load();">';
}

function selectcontacts_on_load() {
    var selcontactsdocument, ex;

    try {
        selcontactsdocument = frames('selcontacts').document;
    }
    catch (ex) {
        selcontactsdocument = document.getElementById('selcontacts').contentDocument;
    }

    if (selcontactsdocument.getElementById('errormsg').value != '') {
        alert(selcontactsdocument.getElementById('errormsg').value);

        return;
    }

    document.getElementById('sendalertstofriends').style.display = 'none';
    if (selcontactsdocument.getElementById('ncontact').value > 0) {
        document.getElementById('selcontacts').style.display = '';
    }
    else {
        document.getElementById('selcontacts').style.display = 'none';
    }
}
