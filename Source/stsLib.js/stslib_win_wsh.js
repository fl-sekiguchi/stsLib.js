/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
----------------------------------------
ModuleName:     Windows WSH Module
FileName:       stslib_win_wsh.js
----------------------------------------
License:        MIT License
All Right Reserved:
    Name:       Standard Software
    URL:        https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2017/04/20
//----------------------------------------*/

WshShell = new ActiveXObject( "WScript.Shell" );

//----------------------------------------
//���V�X�e��
//----------------------------------------

//----------------------------------------
//�E�t�@�C���w�肵���V�F���N��
//----------------------------------------
//Const vbHide = 0             '�E�B���h�E��\��
//Const vbNormalFocus = 1      '�ʏ�\���N��
//Const vbMinimizedFocus = 2   '�ŏ����N��
//Const vbMaximizedFocus = 3   '�ő剻�N��
//Const vbNormalNoFocus = 4    '�ʏ�\���N���A�t�H�[�J�X�Ȃ�
//Const vbMinimizedNoFocus = 6 '�ŏ����N���A�t�H�[�J�X�Ȃ�

function shellFileOpen(FilePath, Focus) {

	WshShell.Run(
		"rundll32.exe url.dll" +
		",FileProtocolHandler " + FilePath
		, Focus, false)
	//�t�@�C���N���̏ꍇ
	//��O������Wait��true�ɂ��Ă����������l�q
}

/*----------------------------------------
��  ver 2017/03/12
�E  �쐬
��  ver 2017/04/17
�E  �t�@�C�����ύX
�ȍ~�Astslib_core.js ��version�Ǘ�
//----------------------------------------*/
