Please refer to these directions for work on this project.
In order to facilitate better workflow, please follow the steps below:

If you have NOT cloned before:
  git clone git@github.com:codesmith27/yeti-crab.git (assumes you are running SSH)
    OR
  git clone https://github.com/codesmith27/yeti-crab.git
  git branch -a (you should see remotes/origin/dev)
  git checkout dev
  git ci (this step is INSTEAD OF git install. Only use git install for specific packages you wish to add.)

Please NEVER work on the main branch. This may cause very significant issues in the long run.

Upon starting work for the day, please run the following:
  git checkout dev
  git pull origin dev

Please commit early and OFTEN. Basically, whenever the foundation for something new is set into the file or any functionality is completed.

When you have a feature working, run the following:
  git status
  git add file1 file2 file3 file4 etc.
    ONLY commit the files YOU HAVE CHANGED. I have included .gitignore and package-lock.json into the repo as a way to sync dependencies within the team. Please do NOT EVER add node_modules directory.
  git commit -m '[your message here]'
  git push origin dev

When you or your team has 
~Mark Liu, 31.7.21


| App
  |Toolbar
  |StateHolder
    |ConversionBox
    |ChoiceBox