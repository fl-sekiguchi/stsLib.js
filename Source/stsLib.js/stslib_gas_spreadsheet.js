/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
----------------------------------------
ModuleName:     Google Apps Script Spreadsheet Module
FileName:       stslib_gas_spreadsheet.js
----------------------------------------
License:        MIT License
All Right Reserved:
    Name:       Standard Software
    URL:        https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2017/08/05
//----------------------------------------*/

var stsLib = require('stsLib');

//----------------------------------------
//�E�Z�����󔒂��ǂ������ׂ�
//----------------------------------------
//  �EgetValue��getFormula�Ń`�F�b�N����
//----------------------------------------
function cellIsEmpty(sheet, row, col) {
  var range = sheet.getRange(row, col);
    return ((range.getValue() === '')
    || (range.getFormula() === ''));
}

//----------------------------------------
//���f�[�^�ŏI�s/������߂�
//----------------------------------------
//  �Ecol/rol�͐����l�Ŏw��K�{
//  �E�f�[�^���܂������Ȃ��ꍇ�ł��A�ŏI�s/��Ƃ��� 1 ��Ԃ�
//----------------------------------------

function dataLastRow(sheet, col) {
    stsLib.debug.assert(stsLib.type.isInt(col))
    var result = 1;
    for (var row = sheet.getDataRange().getLastRow(); 1 <= row; row -= 1) {
      if (cellIsEmpty(sheet, row, col)) {
        return row;
      }
    }
	return 1;
}

function dataLastCol(sheet, row) {
    stsLib.debug.assert(stsLib.type.isInt(row))
    var result = 1;
    for (var col = sheet.getDataRange().getLastColumn(); 1 <= col; col -= 1) {
      if (cellIsEmpty(sheet, row, col)) {
        return col;
      }
    }
	return 1;
}
