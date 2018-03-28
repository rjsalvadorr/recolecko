@ECHO OFF

ECHO NOTE: THIS ONLY REMOVES GENERATED FOLDERS CREATED BY THE FILE MANAGER!
ECHO Deleting empty project folders...

node ../Scripts/foldermanager.js --clear-folders

ECHO Empty projects cleared!

PAUSE
