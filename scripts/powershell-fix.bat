Rem ===== Windows Users Only =====
Rem When using PowerShell, the alias "sls" may conflict with
Rem serverless, thus requiring users to type "serverless" instead
Rem of simply "sls". The quicker fix is to remove the sls
Rem command from PowerShell using the command below.
Remove-Item alias:sls