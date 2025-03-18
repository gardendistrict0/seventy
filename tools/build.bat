@echo off
setlocal

if not exist bin/ (
    mkdir bin
)

deno compile --target x86_64-pc-windows-msvc --output bin/seventy-win main/seventy.ts
deno compile --target x86_64-apple-darwin --output bin/seventy-mac main/seventy.ts
deno compile --target x86_64-unknown-linux-gnu --output bin/seventy-linux main/seventy.ts

echo Compilation complete.

endlocal
