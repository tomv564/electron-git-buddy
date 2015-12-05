## Next session ##

* Implement deterministic reloading of stashes state and clean up old stash events.


## IN PROGRESS ##

Optimistic UI - IN PROGRESS

* Staging - DONE
* Committing
* Stashing
* Rebasing

Visualise remote vs local commits. IN PROGRESS

* Local commits are refreshed when committing
* Initial loading is working
* State is refreshed after pushing

## BACKLOG ##

### Planned

As a user, commits are automatically retrieved from my tracking origin branch every minute.

* Implement one-minute trigger for remote tasks
* Reliably determine if origin exists and remote ref (if upstream set up)
* Execute fetch, show fetching status in UI. 

As a user I receive notifications of automatically retrieved commitsAuto-fetch (with display)

* "New commits are available from the {} remote, use fetch to retrieve them"

As a user I can open a diff in my git difftool from the staging view

* Add diff links to files
* Add diff action that logs 
* Hook up diff action to nodegit difftool

### To Plan

* Handle loading states.
* Handle empty states
* Notify merge issues on rebase with --autostash
* Internal diff views (unified, syntax highlighted, side-by-side)
* Detect merge conflicts -> External merge tool
* Handle merge issues on push "Error: Cannot push non-fastforwardable reference"
* Fix panel scrolling?
* Squash
* Discard all
* Handle error messages
* Keyboard navigation of staging view (arrow keys, space to toggle, tab to commit section)
* Style checkboxes
* Collapsible panels
* Packaging for Windows
* Packaging for OS-X

## DONE ##

* BUG: review reloading of commits on staging events
    - Would require shouldComponentUpdate (react-pure-render)
* BUG: staging ./app stages all ? - DONE
Consistent UI controls - DONE
Stash create - DONE
Stash pop - DONE
git push - DONE
git pull - DONE
Commit visible if no files staged - DONE
Commit text not cleared after commit - DONE
No commit unless text is entered. - DONE
How to deal with staged file with unstaged changes - DONE