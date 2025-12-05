Get-ChildItem -Recurse -Filter *.pyc | Remove-Item
Get-ChildItem -Recurse -Filter __pycache__ | Remove-Item -Recurse -Force
