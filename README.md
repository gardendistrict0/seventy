<img src="docs/assets/seventy.png" width="300" />

# Seventy

![](https://img.shields.io/badge/license-Zlib%2Flibpng-blue)
![](https://img.shields.io/github/v/release/gardendistrict0/seventy?display_name=release&style=flat&link=https%3A%2F%2Fgithub.com%2Fgardendistrict0%2Fseventy%2Freleases)
![](https://img.shields.io/github/last-commit/gardendistrict0/seventy)
![](https://img.shields.io/github/repo-size/gardendistrict0/seventy)
![](https://img.shields.io/github/issues/gardendistrict0/seventy)
![](https://img.shields.io/github/issues-pr/gardendistrict0/seventy)
![](https://img.shields.io/github/contributors/gardendistrict0/seventy)
![](https://img.shields.io/github/commit-activity/m/gardendistrict0/seventy)
![Build](https://img.shields.io/github/actions/workflow/status/gardendistrict0/seventy/build.yml)

---

> Seventy is currently in alpha stages and is ***not*** available for use in any form of project. Anything currently in this install guide is ***incomplete*** and is not correct.
---
### Seventy is a general purpose scripting language inspired by [Python](https://www.python.org) and [Lobster](https://strlen.com/lobster/). It is designed for people who want to write efficient, fast and maintainable apps for any system and for any person.

## Table of contents:
- [How to install](https://github.com/gardendistrict0/seventy#how-to-install)
  - [Windows](https://github.com/gardendistrict0/seventy#windows)
  - [MacOS](https://github.com/gardendistrict0/seventy#macos)
  - [Linux](https://github.com/gardendistrict0/seventy#linux)


## How to install

### Windows
#### Stable version (recommended for casual use):
1. Go to the [Releases Tab](https://github.com/gardendistrict0/seventy/releases) and get the latest version, and install the executable named *'seventy-...-x64-win.exe'*
2. Run the file you just downloaded and follow the on-screen prompts to set it up
3. Open Command Prompt and run:
    ```bash
     seventy --version 
    ```
If you got the version, congratulations, you have installed Seventy!

#### Experimental version (recommended for contributors):
1. Install [Deno](https://deno.land) if you haven't already
2. Clone the repository using:
```bash
git clone https://github.com/gardendistrict0/seventy.git
```

3. Compile Seventy using Deno:
```bash
deno compile --allow-read --allow-write --allow-run -o seventy main/seventy.ts
```

4. To ensure everything worked, run:
```bash
seventy --version
```

If you got the version, congratulations, you have installed the experimental Seventy!

---

### MacOS
#### Stable version (recommended for casual use):
1. Install [Homebrew](brew.sh) if you haven't already
2. Install seventy using the following commands
```bash
brew tap gardendistrict0/seventy
brew install seventy
```
3. To ensure it works, run:
```bash
seventy -- version
```
If you got the version, congratulations, you have installed Seventy!

#### Experimental version (recommended for contributors):
1. Install [Deno](https://deno.land) if you haven't already
2. Clone the repository using:
```bash
git clone https://github.com/gardendistrict0/seventy.git
```

3. Compile Seventy using Deno:
```bash
deno compile --allow-read --allow-write --allow-run -o seventy ./main/seventy.ts
```

4. To ensure everything worked, run:
```bash
./seventy --version
```

If you got the version, congratulations, you have installed the experimental Seventy!

---
