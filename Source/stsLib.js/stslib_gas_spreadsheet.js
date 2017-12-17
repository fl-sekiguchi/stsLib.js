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
Version:        2017/10/10
//----------------------------------------*/

//----------------------------------------
//�Erequire�֐�
//----------------------------------------
//  �E  require/module�̖������ɑΉ�
//----------------------------------------
if (typeof module === 'undefined') {

  var requireList = requireList || {};
  var require = function (funcName) {
    for ( var item in requireList) {
      if (funcName === item) {
        if (requireList.hasOwnProperty(item)) {
          return requireList[item];
        }
      }
    }
    return undefined;
  };
}

//----------------------------------------
//���S�̂��͂������֐�
//----------------------------------------
(function () {

  //----------------------------------------
  //�Erequire���s
  //----------------------------------------
  var stsLib = require('stsLib')

  //----------------------------------------
  //��stsLib���O���
  //----------------------------------------
  var stsLib = stsLib || {};
  (function (stsLib, global) {
    'use strict';
    var _ = stsLib;

    //----------------------------------------
    //��stsLib.spreadsheet���O���
    //----------------------------------------
    _.spreadsheet = stsLib.spreadsheet || {};
    (function () {
      var _ = stsLib.spreadsheet;

      //----------------------------------------
      //�E�V�[�g���ꗗ
      //----------------------------------------
      _.sheetNames = function() {
        var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
        var result = [];
        for(var i = 0, l = sheets.length; i < l; i += 1) {
          result.push(sheets[i].getName());
        }
        return result;
      }

      //----------------------------------------
      //�E�Z�����󔒂��ǂ������ׂ�
      //----------------------------------------
      //  �EgetValue��getFormula�Ń`�F�b�N����
      //----------------------------------------
      _.cellIsEmpty = function(sheet, row, col) {
        var range = sheet.getRange(row, col);
          return ((range.getValue() === '')
          || (range.getFormula() === ''));
      }

      //----------------------------------------
      //���f�[�^�ŏI�s/������߂�
      //----------------------------------------
      //  �Ecol/row�͐����l�Ŏw��K�{
      //  �E�f�[�^���܂������Ȃ��ꍇ�ł��A�ŏI�s/��Ƃ��� 1 ��Ԃ�
      //----------------------------------------

      _.dataLastRow = function(sheet, col) {
          c.assert(stsLib.type.isInt(col))
          var result = 1;
          for (var row = sheet.getDataRange().getLastRow(); 1 <= row; row -= 1) {
            if (_.cellIsEmpty(sheet, row, col)) {
              return row;
            }
          }
      	return 1;
      }

      _.dataLastCol = function(sheet, row) {
          c.assert(stsLib.type.isInt(row))
          var result = 1;
          for (var col = sheet.getDataRange().getLastColumn(); 1 <= col; col -= 1) {
            if (_.cellIsEmpty(sheet, row, col)) {
              return col;
            }
          }
      	return 1;
      }

      //----------------------------------------
      //�E�s�𖼑O���猩����
      //----------------------------------------
      //  �EcolTitle: ���O�̗�
      //    title:    ���O
      //    rowStart: �����J�n����s
      //  �E������Ȃ���� -1 ��Ԃ�
      //----------------------------------------
      _.rowByTitle = function(sheet, colTitle, title, rowStart) {
        stsLib.compare.assert(stsLib.type.isInts(colTitle, rowStart));
        stsLib.compare.assert(stsLib.type.isString(title));

        var rowLast = stsLib.spreadsheet.dataLastRow(sheet, colTitle);
        for (var i = rowStart; i <= rowLast; i += 1) {
          if (sheet.getRange(i, colTitle).getValue().toString() === title) {
            return i;
          }
        }
        return -1;
      }

      //----------------------------------------
      //�E��𖼑O���猩����
      //----------------------------------------
      //  �ErowTitle: ���O�̍s
      //    title:    ���O
      //    colStart: �����J�n�����
      //  �E������Ȃ���� -1 ��Ԃ�
      //----------------------------------------
      _.columnByTitle = function(sheet, rowTitle, title, colStart) {
        stsLib.compare.assert(stsLib.type.isInts(rowTitle, colStart));
        stsLib.compare.assert(stsLib.type.isString(title));

        var colLast = stsLib.spreadsheet.dataLastCol(sheet, rowTitle);
        for (var i = colStart; i <= colLast; i += 1) {
          if (sheet.getRange(rowTitle, i).getValue().toString() === title) {
            return i;
          }
        }
        return -1;
      }

    }());   //stsLib.gas

    //----------------------------------------
    //���ȗ��Ăяo��
    //----------------------------------------
    var x = stsLib.syntax;
    var t = stsLib.type;
    var c = stsLib.compare;
    var a = stsLib.array;
    var n = stsLib.number;
    var s = stsLib.string;
    var d = stsLib.date;
    var p = stsLib.point;
    var v = stsLib.vector;
    var r = stsLib.rect;

  }(stsLib, this));   //stsLib

  if (typeof module === 'undefined') {
    requireList['stsLib'] = stsLib;
  } else {
    module.exports = stsLib;
  }

}());   //(function () {
