---
id: Expose wsl to the network
aliases: []
tags:
  - wsl
  - guide
  - network
  - windows
  - docs
---

JAJjasjsajasjjsaq

## Description

This allows to expose the `wsl` instance to the network, allowing it to get it's `ip` from the `dhcp server` of the `router`.

> [!note]
> Since `wsl2` version `2.0.5`
> it's easier to expose `wsl` to the network.
> see the [[#Updated Version|updated version]] for more information.

## How

1. Enable the `Hyper-V` feature on your windows machine.
2. Reboot.
3. Open `Hyper-V`.
4. Connect to local.
5. Click `Manage virtual switchs` button of the right panel.
6. Create a new virtual switch as `External`.
7. Create or edit the `.wslconfig` located at `C:\Users\{YOUR-USER}`
8. Ensure that it contains the following

```toml
[wsl2]
networkingMode = "bridged"
vmSwitch = "Bridge" # Here goes the name of the switch you previously created
```

9. Run `wsl --shutdown`.
10. Open a new `wsl` terminal.
11. Everything should work now 😄

## Updated Version

Since `wsl2` version `2.0.5` it's easier to expose `wsl` to the network.

Instead of creating a virtual switch, and setting the
networking mode to `bridged`.
The servers running in `wsl` can be exposed using the `mirrored` networking mode.

```toml
[wsl2]
netwrorkingMode = "mirrored"
```

The main difference is that the `mirrored` mode will expose the `wsl` instance to
the network as if it where the host machine. Instead of the `dhcp` server of the
router assigning an `ip` to the `wsl` instance, it will use the one already assigned
to the host windows machine.

## Resources

- Blog - https://randombytes.substack.com/p/bridged-networking-under-wsl
