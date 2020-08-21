# Part 1, Lesson 2: creating a repo and making the first commit

**Lesson goal:** initialize our repository and make the initial commit

**Git commands:**

* `git config` sets Git configuration options
* `git init` turns a directory into a git repository
* `git status` prints the status of the repository (i.e. which files are tracked, changed, etc.)
* `git add` marks which files to track
* `git commit` makes a commit

**Git concepts:**

* A *repository* is a folder where Git can track changes to files in it or a 
subdirectory. Called a *repo* for short.
* A *commit* is a snapshot of the state of the tracked files in the repository at
a given moment in time.

**Downloads:**

* [Demo directory](./demo-files.zip)

## Initializing a repository

Git can't track just any file on your computer; it can only track files inside *repositories*.
A repository is just a directory on your computer in which Git may track files. Any files in 
subdirectories of the repository are also trackable.

For Part I, we're going to have examples that use the two plain text files in the [demo directory](./demo-files.zip).
Download the .zip file and decompress it, then open a terminal window in the `demo-files` folder
created by decompressing it.

At the moment, this is not a repository, it is just a folder with two text files. To make it a repo,
type the command `git init` while inside the `demo-files` folder.

```
$ git init
Initialized empty Git repository in /home/josh/git-tutorials/part1/demo-files/.git/
```

The message indicates that a repository was successfully started in `demo-files`. If you look for hidden
files, you will see that a `.git` folder was created within `demo-files`. This hidden folder contains
all the data that Git needs to keep track of the history of this repository. It's generally a good
idea to leave the contents of this folder alone.

**Note:** you only ever have to do `git init` in a folder once. In other words, you'll never use
`git init` in an existing repo. You will use it once for each repo you create.

## Adding files.

When you initialize a repository, Git does not track any files at first. We can see this
with the `git status` command:

```
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    daysofweek.txt
    months.txt

nothing added to commit but untracked files present (use "git add" to track)
```

There's a few pieces here, but we're interested in the "Untracked files" section. This tells us that
Git sees two files (`daysofweek.txt` and `months.txt`) but it is not recording change to them yet. It
also tells us we can use `git add` to track them.


> **Why not track all files?**
>
> There's many reasons why you might not want to track certain files. Maybe this repository is intended
> to keep track of code used to process data from a spectrometer, but not the data from the spectrometer
> itself, but it's convenient to keep that data near the code so it's easy to access. Or perhaps the
> code generates some plots automatically as a quick check for you when it processes data, and the plots
> aren't relevant to the history of the code. It's cleaner to leave those irrelevant files untracked.

Let's go ahead and add these two text files. Still in the `demo-files` folder, do:

```
$ git add daysofweek.txt months.txt 
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   daysofweek.txt
    new file:   months.txt
```

The status now tells use that `daysofweek.txt` and `months.txt` will be included in the next commit. It
tells us that they are "new files" (this is opposed to modified or deleted files, which we will encounter
later).

> **git add is flexible**
>
> Specifying each file name is fine when there's only two, but much less fine when there's 20. Fortunately
> there's other ways to specify files. You can use [shell glob patterns](https://en.wikipedia.org/wiki/Glob_%28programming%29)
> to match a bunch of files. We could have done `git add *.txt` to match both files here. Alternately, you
> can do `git add .` which means "add everything in the directory". If there's a small minority of files
> you don't want tracked, it may be easier to do `git add .` then use `git rm --cached` to untrack those
> few files.

## Setting up your user information

We're almost ready to make our first commit, but before we do that, we need to set some information that will
be included in the commit message, namely our name and email. To do this we use `git config`:

```
$ git config --global user.name "Josh Laughner"
$ git config --global user.email "me@dummy.com"
```

The `--global` flag means that this configuration option will be stored and reused by default for any
Git repo on this computer. the `user.name` or `user.email` is the option that we're setting and the 
part in quotes at the end is the value we're assigning it.

> **Which email to use?**
>
> 1. If you're planning on eventually putting this repo on GitHub, use the email you have/will create your
> account with, so that GitHub can connect the commits to the right user.
> 2. Use an email you don't mind being publicly visible, in case you ever do put the repo online.
> 3. Use an email you'll have long-term access to. If you lose access to a university email after graduation,
> for instance, then using that means anyone who comes across the code later won't be able to reach you. 

**Note:** you'll only have to do this part *once per computer you use Git on*. If you create more repos on this
computer you *don't* need to repeat this step. But you can redo it if you want to change the email/name
associated with your commits.

## Making the commit

Okay, let's commit these new files! To do that, we just need the command `git commit`. This will create 
a new commit that record the fact that we added these two files to be tracked. A commit is basically a
snapshot of your repository. If we ever come back to this commit, we'll see these files exactly how they
are now, no matter what changes we make later.

Once you run `git commit`, it will open up a text editor inside the terminal. The most likely one for it
to use is `vi` or `vim`, which will look like:

```

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   daysofweek.txt
#       new file:   months.txt
#
~
~
~
~
```

Alternately, your computer may use `nano` instead, which will look like this:

```

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   daysofweek.txt
#       new file:   months.txt
#

                          [ Read 11 lines ]
^G Get Help    ^O Write Out   ^W Where Is    ^K Cut Text    ^J Justify
^X Exit        ^R Read File   ^\ Replace     ^U Uncut Text  ^T To Spell
```

This gives us a chance to enter a message describing the purpose of this commit. A good commit message
starts with a single line, < 80 characters long, that summarizes the commit, then goes into more detail
as necessary. (I'll describe a format I used early on in Lesson 3.) Note that, as it says, any line beginning
with "#" will not be included in the commit message, so none of the initial text gets included; it's just
there for your reference. In this case, there's not much to say, so I made my message a single line:
"Added daysofweek.txt and months.txt". To finalize the commit, we need to "save" the file (in vi/vim: press `ESC`
then type `:wq` and press `ENTER`; in nano press `CTRL-O` then `CTRL-X`). Done correctly you will get a message
similar to:

```
[master (root-commit) 09685d8] Added daysofweek.txt and months.txt
 2 files changed, 19 insertions(+)
 create mode 100644 daysofweek.txt
 create mode 100644 months.txt
```

The first line gives some information about the commit we just made:

* The branch we're on ("master")
* That this is the first commit in this repo on this branch ("root-commit")
* The abbreviated commit hash ("90dc0ec"), which is a unique identifier for this commit.
* The first line of our commit message

The rest tells us that two files were "changed" (added in this case) with 19 total lines added.

If we do one last `git status` we'll now see:

```
$ git status
On branch master
nothing to commit, working directory clean
```

This tells us that there are no untracked files and no changes to tracked files since the last commit. 

> **Changing the default editor**
>
> First time terminal users will probably find nano easier to use than vi or vim. If your computer is defaulting
> to the latter, and you want it to use the former, you can configure this with:
>
> ```
> $ git config --global core.editor nano
> ```
>
> assuming that nano is installed on your computer. Windows uses working in the Git terminal may be out of luck.

## Summary

In this lesson we covered how to initialize a repo and make the first commit. In the next lesson, we'll practice
creating more commits and learn about the difference between the HEAD, index, and working directory.

* [Next lesson: more on commits](3-further-commits.html)
* [Previous lesson: installing Git](1-install.html)