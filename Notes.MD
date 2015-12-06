## Diff rendering

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

