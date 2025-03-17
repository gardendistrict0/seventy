@echo off
setlocal

if not exist bin/ (
    mkdir bin
)

deno compile --target x86_64-pc-windows-msvc --output bin/seventy-0.1.0-alpha-win-x64.exe main/seventy.ts
deno compile --target x86_64-apple-darwin --output bin/seventy-0.1.0-macos-x64 main/seventy.ts
deno compile --target x86_64-unknown-linux-gnu --output bin/seventy-0.1.0-linux-x64 main/seventy.ts

echo Compilation complete.

endlocal
