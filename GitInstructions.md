# Git Instructions, Mark Liu 31.7.21

Please refer to these directions for work on this project.
In order to facilitate better workflow, please follow the steps below:


## DIVING IN
---
If you have NOT cloned before:
  ```
  git clone git@github.com:codesmith27/yeti-crab.git
    assumes you are running SSH, HIGHLY recommend looking into setting this up
    ELSE
  git clone https://github.com/codesmith27/yeti-crab.git
  git branch -a
    you should see remotes/origin/dev
  git checkout dev
  npm ci
    this step is INSTEAD OF npm install. Only use npm install for specific packages you wish to add.
  ```

Please NEVER work on the main branch. This may cause very significant issues in the long run.

## GUTEN MORGEN OHNE SORGEN
---
Upon starting work for the day, please run the following:
  ```
  git checkout dev
  git pull origin dev
  ```

Please commit early and OFTEN. Basically, twice an hour or whenever anything framework is set into the file or completed.

## COMMITMENT CAN BE (IS) CRUCIAL
---
run the following:
  ```
  git status
  git add file1 file2 file3 file4 file_so_on
    ONLY commit the files YOU HAVE CHANGED. I have included .gitignore and package-lock.json into the repo as a way to sync dependencies within the team. Please do NOT add node_modules directory.
  git commit -m '[your message here]'
  ```

## OH HAPPY DAY
---
When you or your team has built something that works, commit as described above, then:
  ```
  git pull origin dev
  git push origin dev
  ```

## SHARE THE LOVE
---
Now, message the team for everyone to run the same commands. This will ensure the team is working as closely as possible on a matching codebase.

Please message the team for everyone to add, commit, pull, push if you:
  * install any sort of dependency/devdependency (git install)
  * change ANYTHING in webpack or package.json
  * reach any milestone, minor or major, in your code
  * reach any sort of viable functionality

If you are running npm install/npm i as a way to download all of the npm packages, 
As the scope of this project is relatively simple, we won't get into stashing or multiple branches for the time being.

~Mark Liu, 31.7.21


| App
  |Toolbar
  |StateHolder
    |ConversionBox
    |ChoiceBox