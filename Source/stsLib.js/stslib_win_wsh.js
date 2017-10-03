/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
----------------------------------------
ModuleName:     Windows WSH Module
FileName:       stslib_win_wsh.js
----------------------------------------
License:        MIT License
All Right Reserved:
  Name:         Standard Software
  URL:          https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2017/08/03
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
  if (typeof module === 'undefined') {
    var stsLib = require('stsLib')
  } else {
    var stsLib = require('./stsLib_core.js')
  }

  //----------------------------------------
  //��stsLib���O���
  //----------------------------------------
  var stsLib = stsLib || {};
  (function (lib, global) {
    'use strict';
    var _ = lib;

    //----------------------------------------
    //��stsLib.wsh���O���
    //----------------------------------------
    _.wsh = lib.wsh || {};
    (function () {
      var _ = lib.wsh;

      //----------------------------------------
      //��DefaultObject
      //----------------------------------------

      _.fso = new ActiveXObject("Scripting.FileSystemObject");

      //----------------------------------------
      //��Path
      //----------------------------------------
      _.path = lib.wsh.path || {};
      (function () {
        var _ = lib.wsh.path;

        //----------------------------------------
        //���J�����g�f�B���N�g��
        //----------------------------------------
        _.currentDirectory = function () {
          return lib.wsh.shell.object.CurrentDirectory;
        };

        //----------------------------------------
        //���X�N���v�g�t�@�C��(*.js/*.jse/*.wsf)
        //----------------------------------------
        _.scriptFilePath = function () {
          return WScript.ScriptFullName;
        };

        _.scriptFolderPath = function () {
          return lib.wsh.fso.GetParentFolderName(_.scriptFilePath());
        };

        _.scriptFileName = function () {
          return WScript.ScriptName;
        };

        _.test_path = function () {
          alert(_.currentDirectory());
          alert(_.scriptFilePath());
          alert(_.scriptFolderPath());
          alert(_.scriptFileName());
        };

      }());   //stsLib.wsh.path

      //----------------------------------------
      //��wshEngine
      //----------------------------------------
      _.wshEngine = lib.wsh.wshEngine || {};
      (function () {
        var _ = lib.wsh.wshEngine;

        _.filePath = function () {
          return WScript.FullName;
        };
        // 64bit���̏ꍇ
        //  32bit��GUI:  C:\Windows\SysWOW64\WScript.exe
        //  32bit��CUI:  C:\Windows\SysWOW64\cscript.exe
        //  64bit��GUI:  C:\Windows\System32\WScript.exe
        //  64bit��CUI:  C:\Windows\system32\cscript.exe
        // 32bit���̏ꍇ
        //  GUI:  C:\Windows\System32\WScript.exe
        //  CUI:  C:\Windows\System32\cscript.exe

        _.folderPath = function () {
          return WScript.Path;
        };

        _.fileName = function () {
          return 'wscript.exe';
        };

        _.engineName = function () {
          return WScript.Name;
        };
        // [Windows Script Host]
        // �Ƃ������̂��擾�ł���

        _.engineVersion = function () {
          return WScript.Version;
        };
        // [5.8]�ɂȂ�͂�

        _.test_wshEngine = function () {
          alert(_.filePath());
          alert(_.folderPath());
          alert(_.fileName());
          alert(_.engineName());
          alert(_.engineVersion());
        };

      }());   //stsLib.wsh.wshEngine

      //----------------------------------------
      //��TextFile
      //----------------------------------------
      _.textfile = lib.wsh.textfile || {};
      (function () {
        var _ = lib.wsh.textfile;

        _.encoding = {
          ASCII               :0,
          JIS                 :1,
          EUC_JP              :2,
          UTF_7               :3,
          Shift_JIS           :4,
          UTF8_BOM            :5,
          UTF8_BOM_NO         :6,
          UTF16_LE_BOM        :7,
          UTF16_LE_BOM_NO     :8,
          UTF16_BE_BOM        :9,
          UTF16_BE_BOM_NO     :10
        };

        var getEncodingTypeName = function(encodingType) {
          switch (encodingType) {
          case _.encoding.Shift_JIS:        return "SHIFT_JIS";
          case _.encoding.UTF8_BOM:         return "UTF-8";
          case _.encoding.UTF8_BOM_NO:      return "UTF-8N";
          case _.encoding.UTF16_LE_BOM:     return "UNICODEFFFE";
          case _.encoding.UTF16_LE_BOM_NO:  return "UTF-16LE";
          case _.encoding.UTF16_BE_BOM:     return "UNICODEFEFF";
          case _.encoding.UTF16_BE_BOM_NO:  return "UTF-16BE";
          case _.encoding.JIS:              return "ISO-2022-JP";
          case _.encoding.EUC_JP:           return "EUC-JP";
          case _.encoding.UTF_7:            return "UTF-7";
          case _.encoding.ASCII:            return "ASCII";
          }
        }
        // UTF16_LE_BOM�̎w��́A
        // [UNICODEFFFE]�����ł͂Ȃ�
        // [UNICODE]��[UTF-16]����������ɂȂ邪
        // UTF16_BE_BOM�Ƃ̑Δ�Ƃ��Ă킩��₷���̂�
        // [UNICODEFFFE]���̗p����

        var streamTypeEnum = {
          adTypeBinary: 1,
          adTypeText: 2
        };
        var saveOptionsEnum = {
          adSaveCreateOverWrite: 2
        };

        _.load = function (filePath, encodingType) {
          var result = '';
          var stream = new ActiveXObject('ADODB.Stream');
          stream.Type = streamTypeEnum.adTypeText;
          switch (encodingType) {
          case _.encoding.UTF8_BOM_NO: 
            stream.Charset = getEncodingTypeName(_.encoding.UTF8_BOM);
            break;
          default: 
            stream.Charset = getEncodingTypeName(encodingType);
            break;
          }
          stream.Open();
          stream.LoadFromFile(filePath);
          result = stream.ReadText();
          stream.Close();
          stream = null;
          return result;
        }

        _.test_load = function () {

          var textTest = 'test\r\n123\r456\n����������\r\ntest\r\n';
          var folderPathTestBase = lib.wsh.path.scriptFolderPath() + 
            '\\TestData\\FileIoTest';

          c.check(textTest, _.load(folderPathTestBase + '\\SJIS_File.txt',
            _.encoding.Shift_JIS));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-8_File.txt',
            _.encoding.UTF8_BOM));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-8N_File.txt',
            _.encoding.UTF8_BOM_NO));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-16LE_BOM_ON_File.txt',
            _.encoding.UTF16_LE_BOM));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-16LE_BOM_OFF_File.txt',
            _.encoding.UTF16_LE_BOM_NO));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-16BE_BOM_OFF_File.txt',
            _.encoding.UTF16_BE_BOM_NO));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-16BE_BOM_ON_File.txt',
            _.encoding.UTF16_BE_BOM));
          c.check(textTest, _.load(folderPathTestBase + '\\JIS_File.txt',
            _.encoding.JIS));
          c.check(textTest, _.load(folderPathTestBase + '\\EUC-JP_File.txt',
            _.encoding.EUC_JP));
          c.check(textTest, _.load(folderPathTestBase + '\\UTF-7_File.txt',
            _.encoding.UTF_7));
          textTest = stsLib.string.replaceAll(textTest, '����������', '?????')
          c.check(textTest, _.load(folderPathTestBase + '\\ASCII_File.txt',
            _.encoding.ASCII));
        }

        _.save = function (str, filePath, encodingType) {
          var stream = new ActiveXObject('ADODB.Stream');
          stream.Type = streamTypeEnum.adTypeText;
          switch (encodingType) {
          case _.encoding.UTF8_BOM_NO: 
            stream.Charset = getEncodingTypeName(_.encoding.UTF8_BOM);
            break;
          case _.encoding.UTF16_BE_BOM:
            stream.Charset = getEncodingTypeName(_.encoding.UTF16_BE_BOM_NO);
            break;
          default: 
            stream.Charset = getEncodingTypeName(encodingType);
            break;
          }
          stream.Open();

          var byteData;
          switch (encodingType) {
          case _.encoding.UTF16_LE_BOM_NO:
            stream.WriteText(str);
            stream.Position = 0;
            stream.Type = streamTypeEnum.adTypeBinary;
            stream.Position = 2;
            byteData = stream.Read;
            stream.Position = 0;
            stream.Write(byteData);
            stream.SetEOS;
            break;
          case _.encoding.UTF8_BOM_NO:
            stream.WriteText(str);
            stream.Position = 0;
            stream.Type = streamTypeEnum.adTypeBinary;
            stream.Position = 3;
            byteData = stream.Read;
            stream.Position = 0;
            stream.Write(byteData);
            stream.SetEOS;
            break;
          case _.encoding.UTF16_BE_BOM:
            str = String.fromCharCode(0xFEFF) + str;
            stream.WriteText(str);
            break;
          default:
            stream.WriteText(str);
            break;
          }
          stream.SaveToFile(filePath, saveOptionsEnum.adSaveCreateOverWrite);

          stream.Close();
          stream = null;

        }

        _.test_save = function () {
          var textTest = 'test\r\n123\r456\n����������\r\ntest\r\n';
          var folderPathTestBase = lib.wsh.path.scriptFolderPath() + 
            '\\TestData\\FileIoTest';

          _.save(textTest, folderPathTestBase + '\\SJIS_File.txt',
            _.encoding.Shift_JIS);
          _.save(textTest, folderPathTestBase + '\\UTF-8_File.txt',
            _.encoding.UTF8_BOM);
          _.save(textTest, folderPathTestBase + '\\UTF-8N_File.txt',
            _.encoding.UTF8_BOM_NO);
          _.save(textTest, folderPathTestBase + '\\UTF-16LE_BOM_ON_File.txt',
            _.encoding.UTF16_LE_BOM);
          _.save(textTest, folderPathTestBase + '\\UTF-16LE_BOM_OFF_File.txt',
            _.encoding.UTF16_LE_BOM_NO);
          _.save(textTest, folderPathTestBase + '\\UTF-16BE_BOM_OFF_File.txt',
            _.encoding.UTF16_BE_BOM_NO);
          _.save(textTest, folderPathTestBase + '\\UTF-16BE_BOM_ON_File.txt',
            _.encoding.UTF16_BE_BOM);
          _.save(textTest, folderPathTestBase + '\\JIS_File.txt',
            _.encoding.JIS);
          _.save(textTest, folderPathTestBase + '\\EUC-JP_File.txt',
            _.encoding.EUC_JP);
          _.save(textTest, folderPathTestBase + '\\UTF-7_File.txt',
            _.encoding.UTF_7);
          _.save(textTest, folderPathTestBase + '\\ASCII_File.txt',
            _.encoding.ASCII);
        }

      }());   //stsLib.wsh.textfile

      //----------------------------------------
      //��shell
      //----------------------------------------
      _.shell = lib.wsh.shell || {};
      (function () {
        var _ = lib.wsh.shell;

        _.object = new ActiveXObject( "WScript.Shell" );

        //----------------------------------------
        //���t�@�C���w�肵���V�F���N��
        //----------------------------------------
        _.windowStyleEnum = {
          vbHide            : 0,  //�E�B���h�E��\��
          vbNormalFocus     : 1,  //�ʏ�\���N��
          vbMinimizedFocus  : 2,  //�ŏ����N��
          vbMaximizedFocus  : 3,  //�ő剻�N��
          vbNormalNoFocus   : 4,  //�ʏ�\���N���A�t�H�[�J�X�Ȃ�
          vbMinimizedNoFocus: 6   //�ŏ����N���A�t�H�[�J�X�Ȃ�
        };

        //----------------------------------------
        //�E�t�@�C�����w�肵�Ċ���̃v���O�����ŊJ��
        //----------------------------------------
        //  �Ecalc.exe / notepad.exe �Ȃǎw�肵�Ă�����
        //----------------------------------------
        _.fileOpen = function (path, windowStyle) {

          _.object.Run(
            "rundll32.exe url.dll" +
            ",FileProtocolHandler " + path
            , windowStyle, true)
          //��O������Wait��true�ɂ��Ă����������悤��
        }

        _.test_fileOpen = function () {
          var folderPathTestBase = lib.wsh.path.scriptFolderPath() + 
            '\\TestData\\ShellOpenTest';
          var testFilePath = folderPathTestBase + '\\ShellOpenTest.txt';
          lib.wsh.textfile.save('test', testFilePath, lib.wsh.textfile.encoding.Shift_JIS);
          _.fileOpen(testFilePath, _.windowStyleEnum.vbNormalNoFocus);

          _.fileOpen('notepad.exe', _.windowStyleEnum.vbNormalNoFocus);

        };


      }());   //stsLib.wsh.shell

      //----------------------------------------
      //��MessageBox
      //----------------------------------------
      _.messageBox = lib.wsh.messageBox || {};
      (function () {
        var _ = lib.wsh.messageBox;

        //----------------------------------------
        //�����b�Z�[�W�\��
        //----------------------------------------
        //�E�g����
        //  var m = stsLib.wsh.messageBox;
        //  var msgResult = m.Popup(
        //    '�{��', 10,
        //    '�^�C�g��', (m.nType.BTN_YES_NO_CANCEL + m.nType.ICON_QUESTION));
        //  msgResult �� m.intButton.BTN_RESULT_YES ���ǂ����Ȃǂ𒲂ׂ�
        //----------------------------------------

        _.nType = {
          //  �{�^���̎��
          BTN_OK_ONLY             : 0,   // [OK]�{�^��
          BTN_OK_CANCEL           : 1,   // [OK][�L�����Z��]�{�^��
          BTN_ABORT_RETRY_IGNORE  : 2,   // [���~][�Ď��s][����]�{�^��
          BTN_YES_NO_CANCEL       : 3,   // [�͂�][������][�L�����Z��]�{�^��
          BTN_YES_NO              : 4,   // [�͂�][������]�{�^��
          BTN_RETRY_CANCEL        : 5,   // [�Ď��s][�L�����Z��]�{�^��

          //  �A�C�R���̎��
          ICON_STOP               :16,   // [Stop]�A�C�R��
          ICON_QUESTION           :32,   // [?]�A�C�R��
          ICON_EXCLAMATION        :48,   // [!]�A�C�R��
          ICON_INFORMATION        :64    // [i]�A�C�R��
        };

        _.intButton = {
          //  �{�^���̖߂�l
          BTN_RESULT_OK           : 1,   // [OK]�{�^��������
          BTN_RESULT_CANCEL       : 2,   // [�L�����Z��]�{�^��������
          BTN_RESULT_ABORT        : 3,   // [���~]�{�^��������
          BTN_RESULT_RETRY        : 4,   // [�Ď��s]�{�^��������
          BTN_RESULT_IGNORE       : 5,   // [����]�{�^��������
          BTN_RESULT_YES          : 6,   // [�͂�]�{�^��������
          BTN_RESULT_NO           : 7,   // [������]�{�^��������
          BTN_RESULT_NOT          :-1    // �ǂ̃{�^���������Ȃ������Ƃ�
        };

        _.popup = function (strText, nSecondsToWait, strTitle, nType) {
          return lib.wsh.shell.object.Popup(
            strText, nSecondsToWait, strTitle, nType);
        }

        _.test_popup = function () {
          var m = lib.wsh.messageBox;
          var msgResult = m.popup(
            '�{��', 10,
            '�^�C�g��', (m.nType.BTN_YES_NO_CANCEL + m.nType.ICON_QUESTION));
          if (msgResult === m.intButton.BTN_RESULT_YES) {
            alert('YES');
          } else {
            alert(msgResult.toString());
          }
        };


      }());   //stsLib.wsh.messageBox

    }());   //stsLib.wsh

    //----------------------------------------
    //���O���[�o���g��
    //----------------------------------------
    (function () {
      var _ = global;

      //alert�̏㏑���͂����ł͂Ȃ�
      //���ۂ̃O���[�o���ōs��
      // _.alert = function (message) {
      //   WScript.Echo(message);
      // };

    }()); //global

    //----------------------------------------
    //������m�F
    //----------------------------------------
    _.test = lib.test || {};
    (function () {
      var _ = lib.test;

      //----------------------------------------
      //���e�X�g
      //----------------------------------------
      _.test_stslib_wsh = function () {
        // stsLib.wsh.path.test_path();
        // stsLib.wsh.wshEngine.test_wshEngine();
        // stsLib.wsh.shell.test_fileOpen();
        // stsLib.wsh.messageBox.test_popup();

        stsLib.wsh.textfile.test_save();
        stsLib.wsh.textfile.test_load();
        alert('finish stslib_win_wsh_test �e�X�g�I��');
      }

    }());   //stsLib.test

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

}());

//----------------------------------------
//���O���[�o���g��
//----------------------------------------

//----------------------------------------
//���W���@�\
//----------------------------------------

//----------------------------------------
//�E���b�Z�[�W�\��
//----------------------------------------
//  �E  WSH �ł� alert �������̂Ŋ֐����㏑������
//  �E  stsLib���̃O���[�o���g�������ŋL�ڂ��Ă�
//      *.jse�`���ł͂��܂��������A
//      *.wsh�`���ł͌듮�삷��
//      �����s�������A�����ŋL�ڂ���΂��܂�����
//----------------------------------------
var alert = function (message) {
  WScript.Echo(message);
};

