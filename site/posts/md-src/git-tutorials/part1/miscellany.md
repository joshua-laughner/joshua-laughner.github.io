# Part 1: Miscellany

## Why stage a file and not commit?

At this point, you probably stage files and then immediately commit them, if you're
not using `git commit -a` to skip that step entirely. You're probably wondering why
you'd ever want to stage a file and *not* commit it right away. Here's two reasons:

1. **You want to protect changes that aren't ready to commit yet.** This can happen if
there's two or more tricky changes to make that are connected. 

Let's say that you have 
a function that computes a linear fit to data, and you want to change it so that it
uses bootstrapping to compute the uncertainty in the fit. Right now, your bootstrapping
function requires you to specify exactly how many points from the original data to 
select for each test, and you want to be able to use a fraction instead: i.e. tell it
to use 50% of the points. This way it doesn't matter how many points are being fit, and
the fitting function doesn't have to calculate that.

So, you tweak the bootstrap function, get it to accept a fraction as an argument without
breaking any other behavior, and now you've got to edit the fitting function. If you
don't want to risk losing the fix to the bootstrap function, but don't want to make a
commit with *just* that change, you could *stage* that change, knowing that if you
mess up the linear fitting function badly, you could revert to the staged changes without
fear of losing the bootstrap changes.

Could you use two commits? Certainly, and some git users will argue that's exactly what
you should do.  But, if two changes are intimately intertwined, you might decide not
to split them into two commits, because then if the repo was ever reverted to the first
of those commits, you would be in a broken state, because only half of the change had
been made.

2. **You need to keep track of which files you've made a particular change to.**  This
happens if you need to do some major refactoring which can't be automated.

Let's say you have a `reldiff` function, which computes the relative difference between
two quantities, as a percent. This gets used all over your code, until one day you 
realize that you end up dividing the result by 100 to get back to a fraction more than
half the time. By the time you bite the bullet and decide to change it to return a fraction,
not a percent, there's hundreds of calls to it in dozens of files. 

In this case, as you go through, adding or removing divide-by-100s as appropriate, it would
be nice to keep track of which files you've finished. By staging them, you do just that. And,
once you're finally done, they're all ready to be committed.
