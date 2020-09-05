# Motivation for a reproducible system for Python Jupyter notebooks

Many scientific journals now expect authors to include code that they used in support
of a published article to include the code with the article, usually as an external
repository. Of course, getting people to follow that requirement is only half the
battle - putting the code online does little good if it's difficult or impossible
to get to run.

I switched to Python Jupyter Notebooks from Matlab in my postdoc, so when I started using
them, I had already had experience with packaging up Matlab code to publish alongside
articles. That influenced the requirements I set for myself when designing a system
to organize my notebooks. The requirements I came up with were:

1. Must be able to go back to previous days' work 
1. Must be able to isolate dependencies from project to project
2. Must be able to move the project from one system to another
3. Must be able to reuse code across notebooks easily
4. Must be able to reuse code *between projects* easily but allow each project control
   over what version of that code it uses.

In this post, I'm going to focus on *why* each of those is important. Another post wil
explain in detail how I do these, but I'll give the executive summary here:

* Create a Git repo for notebooks with notebooks in the top directory and subdirectories
  `data`, `img`, and `src`.
    * Create a notebook for each day or week spent on that project
    * `data` holds both data used across the whole project and data for individual days/weeks
    * `img` holds both external images used in notebooks and images created by the notebooks
    * `src` holds custom code to be reused
* Create a Conda environment for this project and install an IPython kernel in it so that Jupyter
  can run notebook code in that environment
* Create a python package to hold reused code (in `src`) and install it in the environment. Track
  this as part of the repo.
* Add other custom packages of yours as Git submodules under `src` and install them in the environment.

If you're familiar with Git, Conda, and Python packages, this might be enough for you. If not, don't
worry, I'll cover how to create this in detail in another post. But here I want to establish
why each of these requirements are important.

## Going back to previous days work

This is a cornerstone of any scientific endeavor - we always have to keep a record of how we did
an experiment so that we can go back and either reproduce it, or try to understand why the result
differed from a later experiment or another person's work. When we're working with code, we have 
the advantage that it's easy to save a copy (of the code at least - data might be another matter).
But it's also ephemeral if not taken care of. If we *don't* save a copy of the code we used, it
will be gone at some point - maybe as soon as you close the prompt, maybe in a few days if the
prompt stores history temporarily.

The nice thing about Jupyter notebooks is that, when you run code in a cell, that cell stays there
unless you deliberately delete it. Contrast this with something like the IPython interpreter or
Matlab command prompt, where you have to up-arrow your way back through your history, hoping that
you can find the command you ran three days ago.

This permanence of notebook cells is a good start, but it's important to keep your notebooks organized
so that you can find work from previous days with as little scrolling as you can manage. No way is
perfect, but I've found a way that's worked for me.

## Isolating dependencies

This is a big one, and actually a major reason I moved away from Matlab. Let's say you want to start
a new project (we'll call it "B") and you know that you'll need [Geopandas](https://geopandas.org/) 
to deal with loading and plotting some of the data. You go to install it, but it wants to upgrade
your Matplotlib installation. Do you:

* let it, and accept the risk that your code for your current project (call it "A") might break
  with the new Matplotlib,
* try to find a workaround to using Geopandas, or
* spend half a day trying to find a version of Geopandas compatible with your current Matplotlib
  (with no guarantee of success)

None of these are that appealing. However, the fourth option is to given projects A and B each their
own environment, which in turn lets each one have its own packages installed. Project A could use
Matplotlib version 2.0.0 and Project B could update to version 3.3.1 without any worry about
breaking Project A.

## Moving the project from one system to another

Given the way I framed this (being able to package up your code to go along with a journal article),
I think the motivation for this is pretty clear. To do that, someone else needs to be able to download
your code and get it to run with as little effort as possible. There's a secondary benefit, which is
if you need to move this code from your laptop to a workstation or supercomputing cluster, having
it ready to be moved will save you *a lot* of grief.

This requirement is interesting because it actually touches on a lot of elements, everything from
having the notebooks stored in a Git repo to avoiding absolute paths. So unlike the other requirements,
which are addressed by one part of the notebook repo design, this one requires more of an ongoing
commitment by you as you write your code.

## Reusing code across notebooks (within this project)

No matter how you choose to organize your notebooks, you'll likely run into the case where you want to
reuse code from one notebook in another. Now, you could certainly copy it, and in fact I will do that
sometimes. But once you find yourself copying the same code into *every* notebook, it would be much
more efficient if that code was somewhere that you could just `import` it like any other package.

Developing good habits for code reuse is something I take seriously. It's not just about efficiency,
it's about ensuring consistency. If you have a complicate file to load or tricky plot to make, you
want to be sure you do it the same way *every* time, rather than worrying that your analysis showed
a different result not because the actual data was different, but because you slipped up and did the
analysis differently.

## Reusing code across projects safely

Going further along the idea of code reuse, eventually you'll hopefully assemble some extra functions
that handle certain things you find yourself doing over and over, and you'll want to use those in more
than one project. I have [exactly that kind of repo](https://github.com/joshua-laughner/JLL-Py-Utils)
that has all the complicated things I figured out how to do once and wrote into a function so I didn't
have to figure it out again.

But once you start sharing code between projects you run into the dependency problem again. For example,
let's say you have a function [`reldiff`](https://github.com/joshua-laughner/JLL-Py-Utils/blob/master/jllutils/stats.py#L1522) 
that computes the relative difference between two numbers/arrays/whatevers and you use it liberally throughout
Project A. Later for Project B you realize you've always been multiplying the result by 100 to get percent
difference, so you want to change the function to do that automatically. If Projects A and B share the
same `reldiff` code, you can't change it without breaking Project A. If they have separate code files,
then this isn't a problem.

On the other hand, if you fix a tricky bug in `reldiff` during Project B, you probably want to have 
a straightforward way to bring those changes back into Project A. The balance is finding a way to keep
that code connected between the two projects, but give yourself control over when changes to it move
between projects.