# Part 1, Lesson 5: removing files

**Lesson goal:** learn how to stop tracking and remove files from future commits.

**Git commands:**

* `git rm` to delete and stop tracking a file
* `git rm --cached` to *only* stop tracking a file
* `git add` to stage deletions done outside git

**Git concepts:**

* None

**Downloads:**

* [The repo from the end of lesson 4](./demo-files-l5.zip)

## Introduction

In Git, when we say we want to delete or remove a file, we can mean one of three things:

1. Stop tracking the file for future commits, but keep the file itself and keep it in previous commits
1. Actually remove the file and stop tracking, but keep it in previous commits
1. Purge the file from the entire repo, including past commits.

I'm not going to talk about the third case here, it's extremely rare that you need to do that and usually
only applied if you've accidentally tracked sensitive data (like medical history or classified documents)
or have a large data file tracked that's preventing you from uploading to a remote. If you do need it,
GitHub has [help on that](https://docs.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository#purging-a-file-from-your-repositorys-history).

Here we're going to go through the first two cases. **The most important thing to know is that as long
as you've committed a file at least once, it will remain in the repo.** Deleting a file just means it
won't show up in your working directory, not that it's gone from the repo entirely.

## Untracking a file

This is actually the less used case. If you want to be able to still access the file, but just don't want
it to be in future commits, you'd use `git rm --cached`. Let's see that in action. Suppose we want to stop
tracking `months.txt`. In our repo, we'd do:

```
$ git rm --cached months.txt
rm 'months.txt'
```

Now if you do `git status` you'll see:

```
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    months.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt
```

Notice that under "Changes to be committed" it lists `months.txt` as deleted. But, it also shows up in 
"Untracked files." If you list the files in this directory, you'll still see it:

```
$ ls
daysofweek.txt  months.txt
```

and you can still view its contents:

```
$ cat months.txt 
# English months
Jan
Feb
Mar
Apr
May
Jun
Jul
Aug
Sep
Oct
Nov
Dec
```

This change hasn't actually been committed yet, so the most recent commit still has `months.txt` in it. To commit
a deletion is just like any other change. Note that the deletion is already staged, so all we have to do is
commit it:

```
$ git commit -m 'Stopped tracking months.txt'
[master 13c6a9d] Stopped tracking months.txt
 1 file changed, 13 deletions(-)
 delete mode 100644 months.txt
```

Here I used the `-m` flag to `git commit` which recall allows me to give a one line message as the next value on
the command line. It needs to be in quotes because it contains spaces.

**Here's the crucial bit:** The file is still in this directory on *your* hard drive, but if you 
uploaded this repo to GitHub, and someone else cloned the repo, `months.txt` would *not* show up
for them, unless they checked out and old commit. To put this another way, from Git's point of view, the file
has been deleted, but it just hasn't been removed from your hard drive.


## Deleting and untracking a file

If you want to actually delete a file, we use almost the same command, just without the `--cached` flag. Let's delete 
`daysofweek.txt`:

```
$ git rm daysofweek.txt 
rm 'daysofweek.txt'

$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    daysofweek.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt

```

Unlike last time, if we list the files in our directory, `daysofweek.txt` will be completely gone:

```
$ ls
months.txt

$ cat daysofweek.txt
cat: daysofweek.txt: No such file or directory
```

However, we can get it back! This will take two steps. First we need to "unstage" the deletion, that is,
tell Git we don't want that change to go into the next commit. Then we can actually undo the deletion 
itself. The first command is `git restore --staged daysofweek.txt`:

```
$ git restore --staged daysofweek.txt
```

Now note that it's not actually back yet:

```
$ ls
months.txt


$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    daysofweek.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

`git status` tells us that it is deleted, but that deletion isn't staged. It also tells us how to
fix that: `git restore <file>`, so:

```
$ git restore daysofweek.txt
```

Now if we list our files and check our status:

```
$ ls
daysofweek.txt  months.txt

$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt

nothing added to commit but untracked files present (use "git add" to track)
```

## Deleting and untracking a file, again

You'll notice we used a git command to delete `daysofweek`: `git rm`. What if we deleted
it without using Git, either through our file brower or regular terminal commands? Well,
let's try. We can delete it with `rm` (just `rm`, not `git rm`):

```
$ rm daysofweek.txt
```

Now if we check the status:
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    daysofweek.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

note that the deletion is "not staged for commit". Git treats a deletion made without its
deletion command very much like any other edit to a file: a change that needs added and
then committed. To do that, we can use any of our `add` commands. I'll do this:

```
$ git add -u

$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	deleted:    daysofweek.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	months.txt
```

Now it's a staged change. Let's commit it:

```
$ git commit -m 'Deleted daysofweek.txt'
[master 6220de2] Deleted daysofweek.txt
 1 file changed, 8 deletions(-)
 delete mode 100644 daysofweek.txt
```

### Deleting untracked files

If we want to delete untracked files, we need to use our regular methods (file brower or regular `rm`).
If we try to `git rm months.txt`, which is still in our directory, but untracked, we get:

```
$ git rm months.txt 
fatal: pathspec 'months.txt' did not match any files
```

As far as Git is concerns, `months.txt` doesn't exist any more. If we want to delete it, we'd just do a 
regular `rm`:

```
$ rm months.txt

$ git status
On branch master
nothing to commit, working tree clean

$ ls

```

Now both files are gone. What if we wanted to get them back, could we use `git restore` like before?

```
$ git restore months.txt
error: pathspec 'months.txt' did not match any file(s) known to git

$ git restore --staged months.txt
error: pathspec 'months.txt' did not match any file(s) known to git
```

No and it doesn't matter if we add the `--staged` flag or not. Because these deletions have been committed,
we need to use other tools to retrieve those files if we want them back. Don't worry, that's what we'll cover
next!

* [Next lesson: undoing past commits](6-going-back.html)
* [Previous lesson: reviewing history](4-reviewing-history.html)