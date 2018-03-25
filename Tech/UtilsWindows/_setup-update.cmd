@ECHO OFF

ECHO Installing or updating Node.JS package...

cd %~dp0\..\Scripts
npm install

ECHO Done!

PAUSE
