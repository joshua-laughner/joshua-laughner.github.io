# Part 1, Lesson 4: reviewing history

**Lesson goal:** learn how to view the history of the repo

**Git commands:**

* `git log` to view the commits going back from our current commit
* `git log --oneline` to view a more concise version of the log
* `git log --oneline --decorate` to include references like `HEAD` and `master`
* `git log -p` to view the commit messages *and* the actual changes in each commit
* `git diff` to see changes since the last commit
* `git diff <commit>` to see changes since a different commit
* `git diff <commit1> <commit2>` to see changes between any two commits

**Git concepts:**

* None

**Downloads:**

* [The repo from the end of lesson 3](./demo-files-l4.zip)

## Introduction 

In this lesson, we're going to see how to review the history of your Git repo at different
levels, all the way from simple summary messages from the commits to viewing every line of
code changed throughout the whole history.

## The log

The log is the record of all commits in your Git repo. We've already seen this in use. Typing
`git log` now shows the following:

```
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

This shows all four commit in our repo. The most recent is at the top, the oldest at the bottom.
If there are more lines than fit in your terminal window, Git will automatically present the
log in a *pager*, which is just a program that lets you scroll through large amounts of text.
You'll know if you're in the standard one (`less`) because a colon will show up in the bottom
left corner of your terminal. While in a pager, you can navigate with:

* Up/down arrows - move by one line at a time
* Page up/page down - move by a page (screen) at a time
* CTRL+U/CTRL+D - same as page up/page down
* q - quit the pager

### The information in the log

There are four pieces of information printed for each commit in the log:

1. The commit hash: e.g. `commit 4cc58beaa6c7c2fea045210a482bd28ed768a223`. The hash is the part
that (in this case) starts with `4cc58be`. This is a unique identifier for the commit that you
can use to refer to this commit. We'll use this with `git diff` later. Note that you usually only
need the first 7 or so characters of the hash to identify a commit.

2. The person who made the commit. This is the `Author` line. This is the `user.name` and `user.email`
values we configured back in Lesson 1-1.

3. The date and time the commit was made. This is always given in the local time of the computer that
made the commit, including the time zone (`-0700` here, which means 7 hours earlier than UTC, which is
US Pacific Daylight Savings Time for me).

4. The commit message. All our commit messages were one line, but if they were longer, the full message
would be printed.

### A shorter log

As histories get longer, it may be useful to compress this down so that you can scan more
commits more quickly. Use the `--oneline` option to `git log`, i.e. `git log --oneline`:

```
4cc58be Put Sunday at the end of the week
50be39a Changed all days and months to 3 letter abbreviations
09685d8 Abbreviate June and July in months.txt
e8e99aa Added daysofweek.txt and months.txt
```

You can see that this is much shorter. The most recent commit is still at the top, but now each commit
is on one line, with the short hash (first 7 characters of the full hash) printed first, followed by
the first line of the commit message. This is why that first line is so important!

This is often combined with the `--decorate` options: `git log --oneline --decorate` gives:

```
4cc58be (HEAD -> master) Put Sunday at the end of the week
50be39a Changed all days and months to 3 letter abbreviations
09685d8 Abbreviate June and July in months.txt
e8e99aa Added daysofweek.txt and months.txt
```

All it added was the `(HEAD -> master)` bit. This tells us that:

1. The `HEAD` (the parent commit of the working directory) is currently pointing to the `master` branch.
2. Both of these references point to commit `4cc58be`.

This isn't too useful yet, but if we start moving the `HEAD` around, either to go back to old commits
([Lesson 1-6](./6-going-back.md)) or start working with multiple branches ([Lesson 2-1](../part2/1-basic-branching.md))
it will be *very* helpful to keep track of which commit we're actually working on.

### A longer log

If you want to see *all* the gory details about how your code has changed, then `git log -p` is the command you're
looking for (the `-p` stands for `--patch`):

```
commit 09685d8b8ed5125ba9a0be61eb73a91c03cab82d
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:40 2019 -0700

    Abbreviate June and July in months.txt

diff --git a/months.txt b/months.txt
index 90061a3..be45450 100644
--- a/months.txt
+++ b/months.txt
@@ -3,8 +3,8 @@ Feb
 Mar
 Apr
 May
-June
-July
+Jun
+Jul
 Aug
 Sept
 Oct

commit e8e99aa950bdf3f357ebb1acf2137720928fe1ca
Author: Josh Laughner <me@dummy.com>
Date:   Mon Jul 8 23:02:32 2019 -0700

    Added daysofweek.txt and months.txt

diff --git a/daysofweek.txt b/daysofweek.txt
new file mode 100644
index 0000000..716a6ee
--- /dev/null
+++ b/daysofweek.txt
@@ -0,0 +1,7 @@
+Sunday
+Monday
+Tuesday
+Wednesday
+Thursday
+Friday
+Saturday
diff --git a/months.txt b/months.txt
new file mode 100644
index 0000000..90061a3
--- /dev/null
+++ b/months.txt
@@ -0,0 +1,12 @@
+Jan
+Feb
+Mar
+Apr
+May
+June
+July
+Aug
+Sept
+Oct
+Nov
+Dec
```

I'm just showing the first two commits here for brevity. Each commit starts just like in `git log`: there's the hash, the
author, the date, and the commit message. Then there is the "patch" information, which is a line-by-line description
of what changed in each file. There's a few header lines for each file. Looking at the first commit:

* `diff --git a/daysofweek.txt b/daysofweek.txt` indicates which file's diff is being shown.
* `new file mode 100644` does not show up for all files in all commits, this indicates that a new file was added in this
commit. There are other special cases, like a file being deleted, that show up here.
* `index 0000000..716a6ee` gives the internal objects that git is actually diffing and their permission mode. 
Generally, you don't need to worry about this.
* `--- a/dev/null` and
* `+++ b/daysofweek.txt` indicate again which file is being diffed. The `---` indicates the previous version and 
`+++` the new. These will usually be the same file (as in the second commit), unless it was added or deleted, then one will 
be `/dev/null` like here.
* `@@ -0,0 +1,7 @@` indicates where in the file the changes occur. The first pair of number refer to the old file, the second
pair (with the +) the new file. In each pair, the first number is the line number that the patch starts on and the second number
is how many lines from that file are shown. So the `+1,7` means that in the new file, the first line shown is line 1 and there
are 7 lines (including the first one) shown. 
* Finally there are the line-by-line changes. A line beginning with a `-` is a deletion and one with a `+` is an addition.
Note that an edit to a line or lines shows up as deletion/insertion pair, which you can see in the second commit.

## Direct diffs

`git log -p` is great for seeing how things have changed over time, but often you only care about the *overall* difference between
two commits. This is where `git diff` comes into play. Let's say we want to see how the repository has changed since the initial
commit. First, let's use `git log --oneline` to get the hash of the first commit:

```
4cc58be Put Sunday at the end of the week
50be39a Changed all days and months to 3 letter abbreviations
09685d8 Abbreviate June and July in months.txt
e8e99aa Added daysofweek.txt and months.txt
```

In mine, the first commit is `e8e99aa`. Yours will be different. We can use this hash to tell `git diff` what to compare to.
We'll use `git diff e8e99aa`. When we only provide one hash, it means "show me the overall difference between this hash and
my working directory" (i.e. the current state of the code). This gives us:

```
diff --git a/daysofweek.txt b/daysofweek.txt
index 716a6ee..d066a85 100644
--- a/daysofweek.txt
+++ b/daysofweek.txt
@@ -1,7 +1,7 @@
-Sunday
-Monday
-Tuesday
-Wednesday
-Thursday
-Friday
-Saturday
+Mon
+Tue
+Wed
+Thu
+Fri
+Sat
+Sun
diff --git a/months.txt b/months.txt
index 90061a3..cb6f38f 100644
--- a/months.txt
+++ b/months.txt
@@ -3,10 +3,10 @@ Feb
 Mar
 Apr
 May
-June
-July
+Jun
+Jul
 Aug
-Sept
+Sep
 Oct
 Nov
 Dec
```

The format is exactly the same as the diffs in `git log -p`. Now, however, notice that even though we're looking at changes
across four commits, each file is only shown once, and the changes are the combined changes. In `daysofweek.txt`, we see
both that we abbreviated the days and moved Sunday to the end, and in `months.txt` it shows the changes to June, July, and
September, even though they were made in different commits.

We can also diff any two arbitrary commits by specifying a second commit hash. So, if we wanted to see the difference between
the first and third commits, we'd do `git diff e8e99aa 50be39a`:

```
diff --git a/daysofweek.txt b/daysofweek.txt
index 716a6ee..adeebab 100644
--- a/daysofweek.txt
+++ b/daysofweek.txt
@@ -1,7 +1,7 @@
-Sunday
-Monday
-Tuesday
-Wednesday
-Thursday
-Friday
-Saturday
+Sun
+Mon
+Tue
+Wed
+Thu
+Fri
+Sat
diff --git a/months.txt b/months.txt
index 90061a3..cb6f38f 100644
--- a/months.txt
+++ b/months.txt
@@ -3,10 +3,10 @@ Feb
 Mar
 Apr
 May
-June
-July
+Jun
+Jul
 Aug
-Sept
+Sep
 Oct
 Nov
 Dec
```

Similar to the last diff, but here Sunday is still at the beginning of the week because we didn't include the fourth commit.

## Other ways to refer to commits

In place of hashes, you can also use references, like branch names or HEAD. For example, `git diff 09685d8 HEAD` and 
`git diff 09685d8 master` will both diff the last commit against the second one (which has the hash 09685d8).

There is also a shorthand for *n* commits before a given commit: `~n`. For example, `HEAD~1` means the commit before `HEAD`,
so `git diff HEAD~1 HEAD` diffs the immediately previous commit against its parent.

### Diffing the working directory against the index and the index against the HEAD

If you type just `git diff` right now, you won't see anything. That's because there's currently no uncommitted changes. Let's
edit both files to demo how this works. I just added a header to both:

**months.txt:**
```
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

**daysofweek.txt:**
```
# English days-of-week
Mon
Tue
Wed
Thu
Fri
Sat
Sun
```

Now run `git diff` without any commit hashes and you'll get this:

```
diff --git a/daysofweek.txt b/daysofweek.txt
index d066a85..d737d32 100644
--- a/daysofweek.txt
+++ b/daysofweek.txt
@@ -1,3 +1,4 @@
+# English days-of-week
 Mon
 Tue
 Wed
diff --git a/months.txt b/months.txt
index cb6f38f..048b8bf 100644
--- a/months.txt
+++ b/months.txt
@@ -1,3 +1,4 @@
+# English months
 Jan
 Feb
 Mar
```

This shows us exactly what we've changed since the last commit, which is extremely useful.

Okay, *actually* that's not diffed against the last commit, it's diffed against the *index*, which remember is the files
staged to be committed that haven't been committed yet. We can see this if we stage one file: do `git add months.txt` then
do `git diff` again. Now we get:

```
diff --git a/daysofweek.txt b/daysofweek.txt
index d066a85..d737d32 100644
--- a/daysofweek.txt
+++ b/daysofweek.txt
@@ -1,3 +1,4 @@
+# English days-of-week
 Mon
 Tue
 Wed
```

just the changes to `daysofweek.txt`! This doesn't come up too often, unless you end up staging files and not committing right
away ([which you might](./miscellany.md)), but it can be confusing when it does if you don't know about this.

In this case, if you really want to see the differences, both staged and unstaged, since the last commit, you'd use `git diff HEAD`.
Try it, and you'll see the changes to `daysofweek.txt` and `months.txt` again.

Alternatively, if you want to see the diff between the last commit and the *staged* changes, use `git diff --cached` (`git diff --staged`
is a synonym that does the same thing, but I find `--cached` easier to type, and I can autocomplete it after the `ca`):

```
diff --git a/months.txt b/months.txt
index cb6f38f..048b8bf 100644
--- a/months.txt
+++ b/months.txt
@@ -1,3 +1,4 @@
+# English months
 Jan
 Feb
 Mar
```

Now we see only the changes to `months.txt`. This is useful if you're trying to only commit a specific subset of changes made since the
last commit, and need to make sure what you're committing before you make the commit.

Go ahead and commit the changes to both `months.txt` and `daysofweek.txt`, we'll start from that point in Lesson 5.

* [Next lesson: removing files](5-removing-files.html)
* [Previous lesson: making commits](3-further-commits.html)


## References:

* Meaning of lines in diffs: https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/diffs
