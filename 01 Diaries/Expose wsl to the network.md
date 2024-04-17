## Description

This allows to expose the `wsl` instance to the network, allowing it to get it's `ip` from the `dhcp server` of the `router`.

## How 

1. Enable the `Hyper-V` feature on your windows machine.
2. Reboot.
3. Open `Hyper-V`.
4. Connect to local.
5. Click  `Manage virtual switchs` button of the right panel.
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

## Resources

- Blog - https://randombytes.substack.com/p/bridged-networking-under-wsl

