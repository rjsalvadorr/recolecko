@ECHO OFF

ECHO NOTE: THIS ONLY REMOVES GENERATED FOLDERS CREATED BY THE FILE MANAGER!
ECHO Deleting empty project folders...

node Scripts/tools/foldermanager.js --clear-folders

PAUSE
