/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
----------------------------------------
ModuleName:     Web Module
FileName:       stslib_web.js
----------------------------------------
License:        MIT License
All Right Reserved:
    Name:       Standard Software
    URL:        https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2017/04/18
//----------------------------------------*/

/*----------------------------------------
	Cookie�̏����ݓǍ��ݏ���
�@�\�F	
���l�F	
�����F	
2014/07/16(��)
�E	�쐬
//----------------------------------------*/

//�z���n����nameValue�Ɏw�肵���l�ŕۑ�����
function setCookie(nameValue, arrayValue){
    exp=new Date();
    exp.setTime(exp.getTime()+1000*60*60*24*31);

//	alert('setCookie:\n' + arrayToString(arrayValue, "%00"));
//window.status = encodeURIComponentArrayToString(arrayValue);

    document.cookie = 
        nameValue + "=" + encodeURIComponentArrayToString(arrayValue) + "; " + 
        "expires=" + exp.toGMTString();
}

//nameValue�Ŏw�肵���l������Δz���Ԃ�
function getCookie(nameValue){
    //alert('getCookie:\n'+document.cookie);
    //alert(nameValue);

    var cookieArray = document.cookie.split("; ");
    var cookieString = "";
    i = 0;
    while (cookieArray[i]){
        if (cookieArray[i].substr(0,nameValue.length+1) === (nameValue + "=")){
            cookieString = cookieArray[i].substr(nameValue.length+1,cookieArray[i].length);
            break;
        }
        i++;
    }

    //alert('getCookie:\n'+cookieString);
    return decodeURIComponentStringToArray(cookieString);
};
//----------------------------------------*/

//�z����������encodeURIComponent�ŃG���R�[�h���Ă���
//�ڑ�������%00�Őڑ����ĕ�����ɂ���֐�
function encodeURIComponentArrayToString(arrayValue) {
    var undefined;
    if (arrayValue[0] === undefined) { return ""; };
    var delimiter = "%00";
    var result = encodeURIComponent(arrayValue[0]);
    var i = 1;
    while(arrayValue[i] !== undefined) {
        result += delimiter + encodeURIComponent(arrayValue[i]);
        i++;
    }
    return result;
}

function decodeURIComponentStringToArray(value) {
    //alert('getCookie:\n'+cookieString);
    if (value === "") { return ""; }
    var resultArray = value.split("%00");

    var undefined;
    resultArray[0] = decodeURIComponent(resultArray[0]);
    var i = 1;
    while(resultArray[i] !== undefined) {
        resultArray[i] = decodeURIComponent(resultArray[i]);
        i++;
    }
    return resultArray;
}

/*----------------------------------------
��  ver 2014/07/18
�E  �쐬
    setCookie
    getCookie
    encodeURIComponentArrayToString
    decodeURIComponentStringToArray
��  ver 2015/07/02
    replaceAll
��  ver 2015/07/31
�E  st_js�Ƃ��� st.js/st_web.js ���쐬
��  ver 2017/03/13
�E  �^�C�g���w�b�_�[���Ȃ������̂Œǉ�
��  ver 2017/04/17
�E  �t�@�C�����ύX
//----------------------------------------*/
