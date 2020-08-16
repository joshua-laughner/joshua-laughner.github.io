# What Julia can and can't replace about Fortran

The first time I tried to use Julia for a significant research project,
I found it somewhat frustrating. And it took me a long time to understand
why.  Since it has been touted as a replacement for Fortran and compiled
languages in general (at least for scientific applications), I assumed that
it would replicate *all* the important features of those languages. To me,
those are:

1. Fast execution
2. Strong type checking

And, while Julia does meet the first one, it doesn't do the second one completely.
It seems like it does though, and that's what was bothering me about it.

## What's the big deal about type checking?

In a language like C, when you define a function, you also define what types a function
accepts and returns. For example, something like:

```
float compute_potential_temperature(float t, float p){
    return t * pow(1000/p, 0.286);
}
```

will *only* accept floats for temperature and pressure. In contrast, in dynamically typed
languaged (like Python, Matlab, or - kind of - Julia), you wouldn't declare types. It's
perfectly valid to have

```
function compute_potential_temperature(t, p)
    return t * (1000/p)^0.286;
end
```

in Julia and allow `t` and `p` to be whatever type you wish. This is great when you're using
code to do analysis - you write one function that can theoretically take `t` and `p` in as
scalars, arrays, maybe even dataframes or other complex datatypes. As long as the language knows
how to do the operations required (here multiplication, division, and exponentiation), the
function will work.

The problem comes when your program gets bigger and bigger. For small programs, it's easy
(well, mostly) to keep track of what type every variable is and what types work for each
function. When the program gets very large, that becomes an impossible task, which leads to
at least one of the problems:

1. **You have to try to consider every possible type that could be passed into this function.**
   You may have written this function originally to handle scalar floats, but what happens if
   it gets two arrays? Two dataframes? A float and a dataframe? Strings? Trying to make something
   flexible enough to handle any reasonable type *but* error (rather than silently do something
   stupid) with unreasonable types is hard.
2. **There's some weird edge case that passes the wrong type into this function.** Maybe you're
   loading data from a file and this function is only called if potential temperature isn't
   written in the file. If there's a silly mistake in that call that, say passes a variable 
   name instead of value, you'll only get the error if you test it on a file that doesn't 
   include potential temperature.

Strong type checking solves both of these problems. First, a function can only get the types 
you declare, so you only have to worry about how those types interact. Second, a strongly typed
language can have all code paths checked when you compile it. So if you accidentally gave this
function a string when it expected a float, you'll get an error before you ever run the program.
For big programs, this kind of checking can be a life saver.

## Doesn't Julia do this?

Ah, here's where it gets sticky. You *can* declare input and output types in Julia. This function

```
function compute_potential_temperature(t::Float64, p::Float64)::Float64
    return t * (1000/p)^0.286;
end
```

must receive 64 bit floats and will return one as well. However there's a big difference: when 
this is checked. In C, if I wrote

```
float pt;
if !pt_in_file{
    pt = compute_potential_temperature("temperature", 1013.25);
}
```
 
the compiler would catch right away if there is no function named "compute_potential_temperature" 
that accepts one string and one float and returns one float.

In Julia, the compiler doesn't check that. It waits *until the function is called during execution*
and only then checks to see if it knows of a version of `compute_potential_temperature` that accepts
a string as the first argument. So if `pt_in_file` is never false during testing, you'll never know
this bug exists.

In short, Julia's typing system can solve problem #1 (having to consider every possible type) but *not*
problem #2 (wrong type in an edge case).

## Isn't that better than nothing?

It would be, *if* Julia was designed around the idea of optional typing - if the type declarations
were meant to support type safety. But they're not. They're there, as far as I can tell, to help optimize
compiling (by limiting what types the function needs to support) and to let you customize behavior
for different types. For instance, you could have:

```
function compute_potential_temperature(t::DataFrame, p::DataFrame)::DataFrame
    ...
end

function compute_potential_temperature(t::Number, p::Number)::Number
    return t * (1000/p)^0.286;
end
```

Now if you call `compute_potential_temperature` with two data frames, it'll use the first one, which
could have some extra logic to make sure the data frame indices are aligned. The second one will
be called if you pass any regular kind of number.

The trap I fell into was trying to use it to restrict the types of all my functions. That works okay
for simple types, but then when I got to compound types I ended up with monstricities like this:

```
function _setup_unit_aliases(extra_aliases::AbstractDict{<:AbstractString, <:AbstractArray{<:AbstractString,1}}, extra_alias_files::Nothing)
    ...
end
```

Half of that line is just the type for `extra_aliases`, and getting all of that right is a nightmare.
But, because I saw Julia as a replacement for C or Fortran, I kept trying to force it to behave like
that in all ways, including ways it was never intended to act. It took until I learned [Rust](https://en.wikipedia.org/wiki/Rust_(programming_language)), which *is* designed to do strict type checking, that I realized my expectations
for Julia were out of sync with its design, which is why I was so frustrated with it.

## So what you're saying is...?

Julia is a great language to use for a project which demands heavy computation, but is small enough
that losing strong, ahead-of-time type checking isn't a major drawback. Often this means that it's
something that really won't be distributed outside of one group. But if you're developing a community
project, one that will be used by people outside your group, having that extra type checking in Fortran
or C is still valuable. Julia isn't a catch-all replacement for Fortran or C; it's best for tackling 
those intermediate projects that are too hefty to do efficiently in Python or Matlab, but small enough
to benefit from flexibility more than be hurt by it.
