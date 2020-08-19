# An introduction to Git

## What is Git, and why do I need it?

Git is what's called a *distributed version control system* or DVCS. A version control system
is a piece of software that allows you to track how a collection of files changes over time.
Though it can work with any file type, it is optimized to work with plain text files, like code, 
Latex markup, .csv files. 

At one time or another you've probably come across the following situation: you have your 
code/Latex paper/csv data and you need to make a big change to it, but you want to be able to
go back to the old version if you need to. So you make a copy of the file or folder, change the 
original, and keep the copy around "just in case." Then a few days/weeks/months later you make 
another copy, then another, and another, and pretty soon you have a half dozen copies of the same
file/folder and it's getting difficult to remember exactly what the differences between them are
(not to mention your file system's getting rather messy).

Enter Git. This is exactly the problem Git is meant to solve. Git is built around the idea of
"commits" which are conceptually similar to those copies of the project folder you made in the
above example, but with some key advantages:

1. Git keeps the copies tucked away in a hidden folder so your file tree stays clean
2. Git is smart and only makes copies of the files that changed, which can save hard drive space
in large project.
3. Git automatically dates each commit, gives you the opportunity to record a message that goes
along with it, and keeps track of the order the commits go in.
4. Git is built to allow you to examine the differences (in plain text files) between any two
commits.


## What Git is not

Git is not the same as a backup utility. The key difference is that a backup utility is often
configured to backup files at a set frequency, be it once per hour, day, or week. Git will only
create a snapshot of your data when you tell it to.

Second, Git != GitHub. You can use Git without ever creating a GitHub account. Git is a tool that
works on your local computer, GitHub is a website that allows you to share your Git repositories
between different computers or with different people, and it is just one of several ways to 
accomplish that goal. If you are concerned about keeping your code private, don't worry, you
never have to upload it to GitHub if you don't want to.


## Prequisites

This tutorial focuses on using Git via the command line. Therefore, it will be helpful if you
know the basics of moving around directories and listing files in the command line. 


## Lesson format and outline

I will introduce the major features of Git in several parts. The core Git features will be
divided into three parts:

* Part I will focus on using Git to track the linear history of a project with no branches.
* Part II will introduce the concept of branches, which allow you to have multiple parallel
histories advances simultaneously.
* Part III will talk about how to use remotes to synchronize work across two or more machines.

Understanding even just the first part will be enough to start using Git in your research. 
Becoming proficient with all three parts will cover the vast majority of your day-to-day use
of Git. I also have written up a series of smaller posts covering more specific subjects:

* Cleaning up history: rebase, reset, and the reflog
* Git Flow for scientists: a system for managing long-duration projects
* GitHub concepts: forks and pull requests

### Part I: tracking a linear history
* Lesson 1: Installing Git
* [Lesson 2: Creating a repo and making the first commit](part1/2-setup-and-first-commit.html)
* [Lesson 3: Making additional commits, and understanding the HEAD, index, and working directory](part1/3-further-commits.html)
* [Lesson 4: Reviewing history with log and diff](part1/4-reviewing-history.html)
* [Lesson 5: Deleting a file vs. stopping tracking](part1/5-removing-files.html)
* [Lesson 6: Revisiting history: going back to old commits and deleting uncommitted changes](part1/6-going-back.html)
* Lesson 7: Ignoring irrelevant files with .gitignore

### Part II: using branches to manage parallel histories
* Lesson 1: Basic branching and merging
* Lesson 2: Recursive merges
* Lesson 3: Resolving conflicts
* Lesson 4: Switching branches with working directory changes
* Lesson 5: Tags

### Part III: sharing a repo with remotes
* Lesson 1a: creating a remote yourself
* Lesson 1b: creating a remote on GitHub
* Lesson 2: pushing changes to and pulling changes from remotes
* Lesson 3: dealing with push conflicts
* Lesson 4: synchronizing multiple branches with a remote
