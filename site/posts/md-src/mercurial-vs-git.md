# Git vs. Mercurial: Which DVCS to choose?

Git and Mercurial are two distributed version control systems (DVCSs). Both will give
you the tools to track changes to your code, and collaborate remotely with others
on development. In that regard, whichever one you choose will be fine. However, there's
definite differences between them that may influence which one you choose to learn.

In my view, there are three big-picture differences between the two:

1. Git offers more granular control at the cost of requiring a little more user input,
while Mercurial makes its default behavior what most users want ~80% of the time, at
the cost of some granularity of control.
2. Git provides the tools to rewrite history, if necessary, and assumes that if you're
using them, you know what you're doing. Mercurial enforces the sanctity of history by
default.
3. Git favors using branches for any separate work or idea. Mercurial tends to consider
branches more permanent.

There are also a number of smaller differences, that nevertheless will impact how you
work with them day-to-day:

1. Git generally tends to favor grouping similar actions into one subcommand, with its
behavior modified by additional arguments or flags. Mercurial tends to follow the idea
that each command does one thing.
2. Mercurial has a system in place for adding extensions, and which extensions are 
enabled can vary by repo. While Git can be extended with new subcommands, there's
not a system in place to manage them.

Finally, when deciding which one to choose, there's a few things to consider beyond
how the DVCSs themselves work:

1. Which one is used by the group you are or will be working with?
2. Which one is most commonly used in your field?
3. Available remotes: Git has GitHub and Bitbucket, Mercurial, since July 2020, has
   no ready-to-go solution (though you can host your own.)
4. Will you want to assign DOIs to your code? This is possible via GitHub + Zenodo, but
   there's no ready-to-go solution for Mercurial.

Let's take a look at each of these in more detail.

## Big picture differences
### Granularity of control

Commands in Mercurial often have a default behavior that does what you want most of the
time, but makes it more difficult to exercise fine control over exactly what you want
to do when the default isn't ideal. Git tends to favor the reverse. Let's look at two
examples: making commits and pushing to remotes.

**Making commits:** In Mercurial, when you commit changes, `hg commit` by default assumes 
you want to commit all changes to any tracked file. In Git, you either have to add an extra 
flag to get that behavior (`git commit -a`) or add changes to commit first with `git add` then 
make the commit. In most cases, you probably want to commit all changes, so Mercurial's default
is more convenient. But, when you do want to break up the pending changes into two or more
commits, Mercurial has no equivalent way to stage changes.

This is not to say Mercurial doesn't have any way to break up outstanding changes into multiple
commits; you can specify individual files to commit in the commit command, or use the `--interactive`
flag to choose specific hunks. However, this creates the commit immediately - you won't be
able to double check exactly what will be added before making the commit. With Git, you 
can stage the changes you want with `git add` first, check exactly what will be committed,
then commit.

**Pushing to remotes:** When you do `hg push`, Mercurial assumes you want to push all heads
to the remote named "default" in the repo's config file. There's no way to change this default.
Git requires you to specify the remote (and branch) the first time you push, unless the repo
was cloned from a remote. Moreover, each branch in a Git repo can be set up to push to a
different remote by default. Again, Git gives you more control, but at the cost of a more
complex initial setup: needing to execute `git push -u origin <branch>` the first time you
want to push a new branch can be confusing for new users.

In both cases, Git allows finer control, at the expense of extra commands or steps required
to execute something that Mercurial will do in one command.

### Rewriting history

Rewriting history is not something to be taken lightly when you're working in version control.
Done incorrectly, it can lead to very messy repos if the old history accidentally gets restored
when someone who didn't pull the rewrite pushes their local version to the remote. However,
there are certainly times when a little judicious rewriting actually makes the history cleaner.

Recently, I was working on a project where I wanted to refactor some existing code to make
writing a certain output file cleaner. This ended up changing the format of the output file,
and the change was to support a larger modfication I was just testing to see if it was worth
incorporating. I had made a few commits as I got the changes working, but realized after that
that I should have split the changes off into their own branch. That way I could do the larger
test without worrying about having to undo the changes if (a) I decided not to incorporate the
larger feature or (b) the change to the output file format broke something else.

Had I been working in Git, it would have been straightforward to mark the head with the output
file changes as a new branch, then reset "master" back to a commit prior to those changes. 
Since the project was under Mercurial, I couldn't entirely reset the "default" branch back to
before the output file changes, and I ended up having two heads for "default", slightly confusingly.

This exemplifies the difference in how Git and Mercurial approach rewriting history. Git assumes
that if you need to do so, you have a good reason, and provides commands like `reset`, `rebase`, 
and `filter-branch` to do so. You use these commands at your own risk. Mercurial, on the other
hand, doesn't provide any equivalent to these commands (without enabling some extensions). 
Essentially, it enforces best practice (which is to not rewrite history). 

Either approach has its merits. Git gives you the tools you need to do whatever you want, but
in doing so means that inexperienced users can potentially badly mess up a repo. Mercurial 
inherently protects you from that, but limits your options to clean up the repo's history.

### Branching philosophy

In Git, branches can be created and deleted as needed. The branch a particular commit is made
on is not recorded, and once deleted, the reference for a branch is fully gone. In Mercurial,
the branch a commit is made on is recorded and branches cannot be deleted, only closed. 
Consequently, any branches ever created always exist in a Mercurial repo. (One recommendation
is to use bookmarks in Mercurial for the sort of lightweight, transient branching model
Git favors, but I personally find this a bit clunky.)

As a result, when working in Git, it's common to create new branches for new feature development,
merging them into some master branch once completed. Mercurial favors branches as long term
entities that need to exist in parallel and be independent but able to be synchronized. 

## External factors

In addition to inherent differences between Git and Mercurial themselves, it's important to 
consider some external factors, both social and software, that may affect your choice of
which one to use.

### Which one is used by your immediate colleagues?

To put it simply, if you're working with a group that uses Git or Mercurial already, you'll need to
use the same VCS they do.


### Which one is most commonly used in your field?

If your current immediate group doesn't use version control, then consider which one (Git or 
Mercurial) is more widely used in your field. This can be hard to deduce sometimes, but look
for important models or other pieces of code in your field that are made available through
version control. Failing that, ask around at conferences. In my case, as an atmospheric chemist,
several important models (WRF-Chem, GEOS-Chem, and STILT) are tracked with Git and available
through GitHub, so its more beneficial for me to know Git, as I'm more likely to end up either
eventually working with a group that uses Git or needing to use it to access these models.

### Available remotes

Once it comes time to share your code repository, either just between different computers you
own, among others you work with, or as part of a publication, you'll need to start working with
a remote repository. The easiest way to do so is to use a website like GitHub or BitBucket. Since
July 2020, both of these only support Git. If you want to have a Mercurial remote, you'll likely
have to set one up yourself.

### Assigning a DOI to your code

This can be considered a feature of the available remotes, but as of July 2019, if you want
to assign a DOI to a release of your code, you'll need to work with GitHub, as BitBucket
doesn't yet support this. 

## Conclusions

Given that the major hosting websites (GitHub and BitBucket) now only support Git, unless you're
working in a group that already has lots of Mercurial repos, it's probably better to learn Git
rather than Mercurial. If you're looking for a place to start, I have an 
[introductory tutorial](git-tutorials/0-introduction.html) that you can check out.