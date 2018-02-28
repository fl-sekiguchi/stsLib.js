/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
--------------------------------------
ModuleName:     Test Google Apps Script Module
FileName:       stslib_test_gas.js
--------------------------------------
License:        MIT License
All Right Reserved:
    Name:       Standard Software
    URL:        https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2018/02/28
//----------------------------------------*/

//�EGAS��Ƀ��C�u�����Ƃ���
//  stslib_core.js �� stslib_gas_spreadsheet.js ����������
//  stslib_gas.js �Ƃ������O�̃v���W�F�N�g�Ŕz�u�A�ۑ��B
//�Estslib_test_gas.js �Ƃ������O�̃v���W�F�N�g�Ƃ���
//  ���̃t�@�C����z�u�A�ۑ��B
//�Estslib_gas.js ��[���\�[�X]-[���C�u����]�Ƃ��ăC���|�[�g����B
//  ���̂Ƃ��Ɏ��ʎq��[stsLib_gas]�Ƃ��Ă���̂�
//  stsLib_gas.require���g�p�ł���

function myFunction() {
  var stsLib = stsLib_gas.require('stslib_gas_spreadsheet.js');
  stsLib.compare.check('ab', stsLib.string.start('abc', 2));
  Logger.log('Test Finish');
}
