# Gotchas in Julia

[Julia](https://julialang.org/) is a fun new language that definitely fills a gap in capabilities
between something like Python and something like Fortran, but it certainly has some "gotchas" that 
I run into a lot, and its error messages can be downright cryptic. Here I've put together a list
of the ones that got me the most when I was learning, and I'll update this if I find any more.

## Method errors

Because Julia uses [multiple dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch), which basically
means it determines which version of a function (which "method") to call at run time based on the types
of the inputs, a large subset of errors are reported as "method errors", meaning it can't find a 
method (i.e. version of a function) that accepts the right set of types. Here's some of the ways that
these errors got me.

**No method found for function with nested types in the signature**

Let's say you have a method like this:

```
function foo(x::AbstractArray{AbstractFloat})
...
end
```

but, when you call, e.g. `foo([1.0, 2.0, 3.0])` you get the infamous "No method found matching" error. The problem is that `foo` needs defined like this:

```
function foo(x::AbstractArray{<:AbstractFloat})
...
end
```

For whatever reason, Julia will automatically match the outermost type to any subtypes, but the has to be explicitly
told to match subtypes of inner types. So for a function `foo(x::AbstractArray)` would match when called with a concrete
array of floats, e.g. `Array{Float64}`, but `foo(x::AbstractArray{AbstractFloat})` would only match if called with some
type of array containing `AbstractFloat`s and not any subtype of `AbstractFloat`.

**No method found for math operations on arrays**

One that gets me *a lot* is when I'm trying to assign a value to a slice of an array.
If I try to do something like:

```
arr[:,1] = NaN;
```

I get the error `MethodError: no method matching setindex_shape_check`. This one is 
particularly confusing, but all I need to do to fix it is replace `=` with `.=`

```
arr[:,1] .= NaN;
```

This can lead to expressions which look like they have an awful lot of periods in them. 
For instance, I was once trying to get a logical index (`xx`) for elements in two arrays
of equal size that were *not* NaNs in either array, which looked like:

```
xx = .!isnan.(arr1) .& .!isnan.(arr2)
```

`!`, `isnan`, and `&` *all* only work on single elements, so I had to broadcast all of
them.

Another favorite is when I'm trying to replace a bunch of values in an array that all
meet some criteria, say all negative values should be replaced with NaNs. This looks
like:

```
data[data .< 0] .= NaN
```

and if you forget the dot in the `.=` operator, you'll get a method error about something
called `setindex_shape_check`. Well, now you know what that refers to.

**No method found with keyword arguments, even though all the other types are right**

If you have a function with keyword arguments, like

```
function reldiff(a, b; percent=false)
    delta = (b-a)/abs(denom)
    if percent
        delta *= 100
    end
    return delta
end
```

you'll get a method error if you misspell the keyword, so `reldiff(100., 101., pct=true)` 
will give a method error, even though all the types are fine. Fortunately, it will tell
you slightly further down in the error message "got unsupported keyword".

## Syntax errors

**Character vs. string literals**

Coming from Matlab or Python, you might be used to being able to define strings using
single or double quotes. (Yes there's a *slight* difference in Matlab between the two
types of quote, but `'hello'` and `"hello"` are both valid.)

In Julia, single quotes are for characters and double quotes are for strings. That means
that `'a'`, `"a"`, and `"apple"` are all valid but `'apple'` is not (can't have more than
one letter inside a set of single quotes.) In general, use double quotes in Julia unless
you know you need a *character* specifically, and not just a length-1 string.

**Array literals: commas vs. spaces**

This is one that's handy once you know about it, but diabolically confusing if you don't.
In Julia, when you define an array with square brackets, it matters whether you separate
the entries with spaces or commas. Commas give you a one dimensional array (a vector):

```
julia> ndims[1,2,3]
1

julia> size([1,2,3])
(3,)
```

Spaces give you a 1-by-*N* array, which actually has two dimensions:

```
julia> ndims([1 2 3])
2

julia> size([1 2 3])
(1, 3)
```

This means matrix multiplication works:

```
# Dot product, 1*1 + 2*2 + 3*3 = 14
julia> [1 2 3] * [1,2,3]
1-element Array{Int64,1}:
 14
```

But does mean that you can't freely choose spaces or commas depending on what
is easier to type or reads better.

## Bounds errors

** Bounds error with logical index **

If you get a `BoundsError` when trying to index an array with a logical array, check 
that the logical array is the right size. For example if `arr` is 5x3, then

```
xx = [true, false, false, false];
arr[xx,:];
```

will cause a `BoundsError` because `xx` is only four long, but `size(arr,1)` is 5.

## Dependency warnings 

**Package requires another, but it is not in its dependencies**

This is usually just a warning. It usually happens when you are working on a custom 
package and have inserted a new `using <package>` or `import <package>`  call somewhere,
but not also done `]add <package>` while that project is active. If the package you're
trying to import is available on your system, it'll be imported, but because it hasn't
been "officially" added to your project, the fact that it's needed is not recorded in the
`Project.toml` file. `add`ing that package with `]add <package>` from the Julia REPL is
usually enough to fix this.