cd /d %~dp0

@REM �t�H���_���Ȃ���΍��
IF NOT EXIST "..\build\" (
  mkdir ..\build
)
webpack --config webpack.config.js
pause

