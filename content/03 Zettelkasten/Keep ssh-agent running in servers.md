---
id: keep-ssh-agent-running-in-servers
aliases:
  - Keep ssh-agent running in servers
tags:
  - git
  - config
title: Keep ssh-agent running in servers
---
Normally when sshing into a new server, it's common to run into the problematic
of having to run the ssh server and add the relevant ssh keys.

```sh
eval $(ssh-agent -c)
ssh-add ~/.ssh/id_rsa
```

Well, there's a better way and it's pretty easy if I may say so myself.

## Configuration

As the shell I normally use in servers, I'm going to explain the
configuration for the `fish` shell. But everything explained here
it's applicable to any other shell I have used, adapted to the
specific shell's quirks of course. 

Normally, everyone has an `if` block in their `~/.config/fish/config.fish`,
checking if the shell is running in an interactive session, that looks something
like this:

```fish
if status is-interactive
	# ...
end
```

In here you will have to execute  `keychain`, a tool that comes with almost
every package manager out there. Ensure that you have it installed, if not,
do it with the package manager you are stuck with.

```sh
sudo apt install keychain
```

As I previously said the configuration is pretty easy. Just add
the following inside the `if status is-interactive` block.

```fish
keychain --eval $SSH_KEYS_TO_AUTOLOAD | source
```

You should have something along these lines:

```fish
if status is-interactive
	# ...
	keychain --eval $SSH_KEYS_TO_AUTOLOAD | source
end
```

Now, to add keys to your ssh agent.

```sh
set -Ua SSH_KEYS_TO_AUTOLOAD ~/.ssh/my_private_key
```

Finally reload your shell, exiting and reentering, sourcing the config or
whichever way you like the most. If you did everything you should
see a message saying that `keychain` has started the `ssh-agent` or that
it's already running.