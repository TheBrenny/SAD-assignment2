# SAD Assignment

This is the doc to explain how to use Git and Github to upload/download changes to the clowd/locally.

## Initialisation

Create a github account. I sent you an email to collab in this repo, but if you can see this, you've probably already done that part.

To get started using Git and Github, make sure you have Git installed: https://desktop.github.com/

Once that's installed you'll have the Github Desktop Client that you can use to make your changes known to the rest of us. Login to the client to continue.

<small>If you wanna feel a bit more hackerman: at the same time, it (might have) downloaded a `git` command line tool. Feel free to open up your terminal/command prompt and type `git --version` to see if you have it. If you don't wanna do hackerman stuff, then don't bother.</small>

From here, you can choose to use the Desktop app or the CLI (command line interface) to do the things you need to do. I'll provide both options.

<hr>

## Get an initial copy ***(First time only)***

*This can only be done while you're connected to the internet*

- [Desktop Client Instructions](#clone-desktop-client)
- [Command Line Instructions](#clone-command-line)

### Clone: Desktop Client

There might be a button somewhere to say "Create/Clone/Init/Something a Repo". Click that and follow the prompts. When it asks for what repo you wanna clone pick the one that says `SAD-assignment2` - If it doesn't show up, there'll probably be a box to type in `TheBrenny/SAD-assignment2` or `https://github.com/TheBrenny/SAD-assignment2`. Save it somewhere easy, and move on.

### Clone: Command Line

Enter these commands into your terminal:

```
cd ./parent/folder/to/where/you/wanna/save/this/thing/
# Git will clone into a sub directory

git clone https://github.com/TheBrenny/SAD-assignment2
# Git will do some stuff and download it

cd ./SAD-assignment2/
# You're now in the project folder, move on
```

<hr>

## Grab the latest changes from everyone ***(before you start work)***

*This can only be done while you're connected to the internet*

- [Desktop Client Instructions](#pull-desktop-client)
- [Command Line Instructions](#pull-command-line)

### Pull: Desktop Client

NGL, I absolutely have no idea how to pull form the desktop client, but there should be a button somewhere saying "Pull" or "Get Latest Changes" or something like that. If there isn't, HMU.

### Pull: Command Line

Enter these commands into your terminal:

```
cd ./path/to/SAD-assignment2/
git pull
# Git will do some stuff and download all changes or say it's up to date.
```

<hr>

## Track minor changes ***(when you change something minor)***

*This can be done whenever - online and offline!*

Do this as often as you can so we can track all the changes possible! (But if you forget here and there, that's okay!)

Also, when you write commit messages, feel free to use emojis!

- [Desktop Client Instructions](#commit-desktop-client)
- [Command Line Instructions](#commit-command-line)

### Commit: Desktop Client

There'll be buttons in places where you can "Track/Stage Changes". Press those, write a small 50char message and then "Commit". It'll update your local copy, and leave a breadcrumb for it. Once you've done a whole chunk of work (and you're signing off for the day for example), you'll need to [push your changes](#give-everyone-your-changes-when-you-finish-a-big-chunk-of-work)

### Commit: Command Line

Enter these commands into your terminal:

```
git add -A
git commit -m "Enter your message here 🥳"
```

<hr>

## Give Everyone Your changes ***(when you finish a big chunk of work)***

*This can only be done while you're connected to the internet*

- [Desktop Client Instructions](#push-desktop-client)
- [Command Line Instructions](#push-command-line)


### Push: Desktop Client

Once you're ready to submit a giant chunk of work to the server, find a button called "Push" and click it. It might whinge about merge conflicts being a thing, but that's okay - try and resolve the conflicts if you want, otherwise message me ASAP so I can try resolve them.

### Push: Command Line

Enter these commands into your terminal:

```
git push
# Git will do some stuff and upload
# If there's a merge conflit, try and do it through the Desktop Client, or let me know
```

<hr>

## 🤑💰💹🤑💰💹🤑💰💹 **PROFIT** 🤑💰💹🤑💰💹🤑💰💹