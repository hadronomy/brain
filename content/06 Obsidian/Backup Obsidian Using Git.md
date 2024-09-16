---
id: Backup Obsidian Using Git
aliases: []
tags:
  - git
  - obsidian
  - notes
  - docs
  - config
---

> [!note]
> This will also backup your editor config

## Install `obsidian-git` Community Plugin

Open [Obsidian Git](obsidian://show-plugin?id=obsidian-git) and click `Install`.

## Create Github Repo

Go to [Github](htttps://github.com), create a new repository and **copy the ssh link**.

## Init a New Git Repo

```bash
cd your-vault-directory-path
```

```bash
git init
```

## Add Remote

```bash
git remote add origin git@github.com:your-user/your-repo.git
```

## First Commit

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

- Set `Vault backup interval (minutes)` to anything you like. This will define how often obsidian pushes changes to Github. _Setting it to 0 will disable this functionality_.
- Set `Auto pull interval (minutes)` to anything you like. This will define how often obsidian pulls changes from Github. _Setting it to 0 will disable this functionality_.

![[Configure obsidian-git.png]]
