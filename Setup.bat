@echo off

start python -m venv venv
echo "Wait For Shell Window To Close Then Press Enter"
pause
start .\venv\Scripts\pip.exe install -r ./requirements.txt
