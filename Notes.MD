## Event flow ##

Calls to deterministically refresh related state on actions:

staging changes:

* workingTree -> getStatus

stash push/pop:

* workingTree -> getStatus
* stash -> getStashes

commit:

* workingTree -> getSttus
* history -> getLog()

remote fetch:

* history -> getRemoteLog()

remote rebase:

* history -> getLog()
* workingTree -> getStatus()

remote push:

* history -> getRemoteLog()

