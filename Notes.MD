## Diff 

### Selecting the right comparison

We want to always get full diff to head including untracked files. 
The right combination of the following factors:

* Diff.treeToWorkdirWithIndex 
* old_tree = HEAD commit
* All untracked changes flags including content

### Rendering

foreach hunk:

* print hunk.header()
* foreach hunk.lines:
    - with determinedColor(line):
        - print line


## Event flow

Calls to deterministically refresh related state on actions:

FS changes:

Without filtering (.git vs outside of .git) we have to assume everything is changed  :(

* getStatus, getLog, getStashes.


staging changes:

* workingTree -> getStatus

stash push/pop:

* workingTree -> getStatus
* stash -> getStashes

commit:

* workingTree -> getSttus
* history -> getLog() (local commits only)

remote fetch:

* history -> getRemoteLog()

remote rebase:

* history -> getLog()
* workingTree -> getStatus()

remote push:

* history -> getRemoteLog()

