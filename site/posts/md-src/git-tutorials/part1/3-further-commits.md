# Part 1, Lesson 3: making more commits

**Lesson goal:** make another few commits in the repo; learn about the HEAD, index, and working directory.

**Git commands:**

* `git status` to check which files have been modified or staged
* `git add` to stage changes for the next commit
* `git commit` to make each commit
* `git log` shows the history of commits made.

**Git concepts:**

* The *working directory* is the copy of the code that is present in the repo.
* The *HEAD* is the parent commit of the working directory. For now, think of it as the most recent commit -
but be prepared to need the proper definition in Part II.
* The *index* is the collection of files that are ready to go into the next commit
but haven't actually been committed yet.

**Downloads:**

* [The repo from the end of lesson 2](./demo-files-l3.zip)

## Introduction

In this lesson we're going to look at different ways to make new commits. All of them
follow the same pattern. First we *stage* the changes we want to add to the next commit,
that is, tell Git to get ready to commit them. Then we actually make the new commit.

## Three ways of making new commits

### Making commits with git add + git commit

Let's look at where we left off last time. (If you are just starting, download the repo from
the end of lesson 2 [here](./demo-files-l3.zip).) In the repo, type `git status`:

```
$ git status
On branch master
nothing to commit, working directory clean
```

We see that currently there's "nothing to commit" because we've made no changes since the last commit.
Let's fix that. In `months.txt`, every month is abbreviated except June and July. Modify `months.txt`
so that "June" is replaced with "Jun" and "July" with "Jul". It should look like this:

```
Jan
Feb
Mar
Apr
May
Jun
Jul
Aug
Sept
Oct
Nov
Dec
```

Now `git status` shows:

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)

    modified:   months.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

`months.txt` has been modified since the last commit. To make a new commit that saves these changes, we need
to stage the modified version of `months.txt` with `git add`:

```
$ git add months.txt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   months.txt
```

The status message has changed slightly, indicating the `months.txt` is ready to be committed. To make the commit,
use `git commit`. This will open a text editor like last time. Give a brief one-line description of the commit we're
about to make, like:

```
Abbreviate June and July in months.txt
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#       modified:   months.txt
#
```

Save the message and exit the text editor to get a message like:

```
[master e8e99aa] Abbreviate June and July in months.txt
 1 file changed, 2 insertions(+), 2 deletions(-)
```

telling us that we changed 2 lines in one file. (Git sees a change to a line as deleting the old line and inserting
a new one, so in this case "2 insertions, 2 deletions" corresponds to modifying two lines.)

At this point, let's look at the log to see the two commits we've made:

```
$ git log
commit 09685d8b8ed5125ba9a0be61eb73a91c03cab82d
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:40 2019 -0700

    Abbreviate June and July in months.txt

commit e8e99aa950bdf3f357ebb1acf2137720928fe1ca
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:32 2019 -0700

    Added daysofweek.txt and months.txt
```

For now, don't worry too much about the details of the log. We'll go through it in more detail in Lesson 4.

### Staging all changes with git add -u

For this next option, let's modify both files. In `months.txt`, change "Sept" to "Sep" so that all the month use
three letter abbreviations. In `daysofweek.txt`, change all the days to use three letter abbreviations:

**months.txt:**
```
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

**daysofweek.txt:**
```
Sun
Mon
Tue
Wed
Thu
Fri
Sat
```

Let's also create a third file, which we won't commit, but will use to demonstrate something. I did:

**hello.txt:**
```
Hello world!
```

`git status` now shows that we have two files with changes and one "untracked" file:

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)

    modified:   daysofweek.txt
    modified:   months.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    hello.txt
```

> **Untracked files:**
>
> As far as Git is concerned, untracked files barely exist. If someone "clones" your repository
> (we'll discuss in Part III, but basically this is using Git to make a new copy of a repo), they
> won't get any of the untracked files.

For this example, let's say we want to commit the changes to `months.txt` and `daysofweek.txt` but *not*
start tracking the new file, `hello.txt`. We could stage only the files we want with `git add months.txt daysofweek.txt`,
but if we had dozen of files this would get tedious. We *can't* use `git add *.txt` or `git add .` now, 
because that would add `hello.txt` too.

Instead, we can use `git add -u`:

```
$ git add -u
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   daysofweek.txt
    modified:   months.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    hello.txt
```

Notice that `daysofweek.txt` and `months.txt` were staged, but not `hello.txt`. The `-u` flag tells
`git add` to add changes to any already tracked files. Go ahead and commit with `git commit`, and
try your hand at making your own commit message.

### Commits in one step with git commit -a

One more way to make commits: you can skip `git add` by doing `git commit -a`. This is the equivalent
of `git add -u` immediately followed by `git commit` - the `-a` flag stands for "all" meaning "go ahead
and commit all pending changes." To test it out, let's modify `daysofweek.txt` to put Sunday at the end:

**daysofweek.txt:**
```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   daysofweek.txt
    modified:   months.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)

    modified:   daysofweek.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    hello.txt

$ git commit -a
[master 4cc58be] Put Sunday at the end of the week
 2 files changed, 8 insertions(+), 8 deletions(-)
```

Now if we look at the log we see:
```
$ git log
commit 4cc58beaa6c7c2fea045210a482bd28ed768a223
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:22:43 2019 -0700

    Put Sunday at the end of the week

commit 50be39ace1af0c9b332dabdc5877bfde092984ed
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:22:24 2019 -0700

    Changed all days and months to 3 letter abbreviations

commit 09685d8b8ed5125ba9a0be61eb73a91c03cab82d
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:40 2019 -0700

    Abbreviate June and July in months.txt

commit e8e99aa950bdf3f357ebb1acf2137720928fe1ca
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:32 2019 -0700

    Added daysofweek.txt and months.txt
```

### Pass the commit message on the command line

One flag to `git commit` that I rarely use outside of tutorials is `-m`. This lets you
pass the commit message as the next value on the command line. For example, I could have
made the above commit in one line with `git commit -a -m 'Put Sunday at the end of the week'`.
Note that the message will just be the one line, and it needs to be in quotes.

I usually don't use this in practice - it precludes writing more detailed messages. But
for tutorials it's useful because everything can be done on the command line, so the 
commands are clearer. 

## Extra thoughts

If you want to go on to Lesson 3 and start learning about diffs and more about the log,
feel free. The rest of this will be more about good practice, so come back once you're
feeling comfortable with the basics and want to refine your usage. 

### add + commit vs. commit -a

I generally never use `git commit -a`. I prefer `git add -u` then `git commit`. I generally
consider it good practice to verify what you're about to commit before making the commit, so
I like staging my changes, reviewing them with `git status` (and `git diff --cached`, see Lesson 4),
then committing. I prefer the additional control.

### What makes a good commit message

So far our commit messages have been very short, because we've haven't been making very many changes.
That's fine for this demo repo, but in practice your commit messages are an important part of 
making a maintainable repo. The messages are the highest level information available when you're
trying to understand how the repo evolved over time, so it pays to make them informative.

The first widely expected rule to formatting your commit messages:

* **The first line should be a short summary of the changes introduced by the commit, ideally < 50
characters, definitely <= 72**

The first line is crucial because it gets used by itself often to describe your commit. `git log --oneline`
for instance prints just that first line for each commit. 

The second formatting rule is:

* **Wrap the main body of the message to 72 characters.**

When you print `git log`, is doesn't do any text wrapping. Keeping lines short
helps them fit on standard size terminal windows.

The third generally accepted rule is:

* **Describe what was done and why, not how**

It's not worth the time to rehash exactly what changed in the files themselves, because we can go
back and see that with commands like `git diff` and `git log -p`. It's more useful to explain the big pictue
of *what* change was made and *why* that change was necessary. Let's look at one of my 
[actual commits from a project in my Ph.D.](https://github.com/CohenBerkeleyLab/AutoWRFChem-Base/commit/9c1e34f08e4763d6fda082d23a3d85939147c9a4):

```
Number of user-friendliness improvements

* namelist.input.template: added the scale_nei_emiss and scale_closest_year options
  to the chem namelist. These are implemented in commits a263d29 through 52cf5d6 of
  the WRF-Chem-R2SMH repo (https://github.com/CohenBerkeleyLab/WRF-Chem-R2SMH)
* PREPINPUT/precheck now checks that mozbcFile has been set i.e. is not a zero-length
  string; if it is, then the error message for "Cannot find data/$mozbcFile" is very
  confusing as it looks like its saying that it cannot find the data link.
* PREPINPUT/prepnei_convert: convert_emiss error messages now correctly give the
  convert_emiss exit code rather than the real.exe exit code.
* Many files: modified or added messages before `exit 1` calls to explicitly indicate
  that the program is aborting.
```

Some background: this is a commit from a wrapper I built around the WRF-Chem model, which
simulates atmospheric chemistry, to simplify preparing the inputs needed by the model. Let's
break down the good and bad in this message (and I promise to only be a *little* biased).

* *"Number of user-friendliness improvements"* - conveys the overall purpose of this commit,
which is to make the program more user-friendly.

* *"namelist.input.template: ..."* - this bullet could be better. If you look at the
actual changes for the `namelist.input.template` file, you'll see that it really is
just adding those two options with their default values. In this case the change is so
small that the line between "what" and "how" blurs - but, saying *why* those options
were added would have been more helpful.

* *"PREPINPUT/precheck..."* - this bullet point does a good job on focusing on what/why.
The change to this file was to check that the variable `mozbcFile` actually got a value.
Why? If not, then when the program checked to see that it pointed to an actual file, it
would not, but the error message would be confusing because the problem isn't that the
file doesn't exist, it's that the path to the file was never set.

* *"PREPINPUT/prepnei_convert..."* - says *what* but not *why*, though in this case the
*why* is implied - the wrong exit code was being given, which (if you know about exit
codes in bash) means that the user would get the wrong information about why the program
failed.

* *"Many files:...* - this tells us *what* (added messages before programs exit) and
*why* (to make it clear the program is exiting). This is particularly helpful because in
the commit itself you'll see this sort of change in a bunch of files, so it helps to
understand that all those changes are working towards one goal.

### A recommended format for commit messages

I find when you're starting out it's good to have a more structured recommendation for
how to format your commit messages. So here's what I recommend you use as you start out:

```
Summary line, < 50 char if possible, definitely <= 72 

[optional] Additional paragraph(s) expanding on what the commit does
and why it was necessary. These should deal with the commit as a whole.

NEW FILES:
* Itemize any new files here, for example:
* daysofweek.txt - a list of days of week added to enforce standard US
  weekday order.
* Still focus on why the new files were added and what purpose they serve
  rather than how they work.
* If no new files added, skip this section.

MODIFIED FILES:
* Itemize any modified files here, for example:
* months.txt: changed so that all months use standard 3-letter 
  abbreviations.
* Again, focus on what (high-level) changes were made to each file and
  why they were necessary.
* Skip this section if no files modified, though that will be rare.

RENAMED FILES:
* Enumerate any renames, e.g.:
* daysofweek.txt -> days_of_week.txt
* If there was a reason for the rename, mention it
* Skip this section if no files renamed

DELETED FILES:
* Enumerate deleted files
* Skip if no files were deleted
```

Early on, I think having a "form" like this to fill out helps structure your ideas and
makes sure you cover everything important. As you get more experience writing (and
reading) commit messages, you will probably find yourself relaxing this strict format.

Some other people's thoughts on formatting commit messages:

* [How to write a Git commit - Chris Beams](https://chris.beams.io/posts/git-commit/)
* [Git commit messages - OpenStack](https://wiki.openstack.org/wiki/GitCommitMessages#Information_in_commit_messages)

### When to commit?

First the practical advice.
When you're first starting out, I recommend that you force yourself to make commits when:

1. The end of the work day is coming up. Make a new commit that records all the changes
you made that day, with a nice message describing why you made those changes.
2. You're about to make a change that might break currently working code.

As you get more experience working with Git, you'll find yourself looking back through
the history with moments of "Argh, why didn't I break this up better?" Embrace those
moments as learning opportunities.

Now, the Platonic ideal is that you would make a commit for each conceptual change. 
Put another way, each commit should have a purpose:

* Fixing a bug in calculating the daily mean temperature when there's NaNs in the
record.
* Speeding up execution of a particular part of the code.
* Adding a function to read in a new sort of data

This requires a little bit of foreplanning, but really just requires you to be conscious
about your goals when you start modifying your code. Assuming you start from a state
where there's no pending changes (the "working directory is clean"), ask yourself: "What
am I trying to accomplish with this change?" That will probably be the first line of your
commit message once it's done. 

As you work on the code, ask yourself about every 15-30 minutes "What goal am I working 
towards now?" If it has changed since you started, imagine your were explaining the 
changes you made to someone else who uses the code. Are both your original and current
goal close enough that you would explain them together? If so, keep working. If not, 
finish the first goal, make sure it works, then commit those changes.

* [Next lesson: reviewing your commit history](4-reviewing-history.html)
* [Previous lesson: setup and first commit](2-setup-and-first-commit.html)
