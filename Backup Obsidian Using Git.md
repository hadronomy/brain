#git #obsidian #notes #docs 

> This will also backup your editor config

## Install `obsidian-git` Community Plugin

Open [Obsidian Git](obsidian://show-plugin?id=obsidian-git) and click `Install`

## Create github repo

Go to [Github](htttps://github.com), create a new repository and **copy the ssh link**

## Init a new git repo

```bash
cd your-vault-directory-path
```

```bash
git init
```

> You can also initialize a new repo using the `/`  commands
> `GitInit`

## Add remote

```bash
git remote add origin git@github.com:your-user/your-repo.git
```

## First commit

```bash
git add .
```

```bash
git commit -m "First commit"
```

## Push

```bash
git push -u origin master
```

## Configure `obsidian-git`

- Set `Vault backup interval (minutes)` to anything you like. This will define how often obsidian pushes changes to github. *Setting it to 0 will disable this functionality*
- Set `Auto pull interval (minutes)` to anything you like. This will define how often obsidian pulls changes from github. *Setting it to 0 will disable this functionality

![[Configure obsidian-git.png]]