#git #obsidian #notes #docs 

## Install `obsidian-git` Community Plugin

Open [Obsidian Git](obsidian://show-plugin?id=obsidian-git) and click `Install`

## Create github repo

Go to [Github](htttps://github.com) and create a new repository and **copy the ssh link**

## Init a new git repo

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
