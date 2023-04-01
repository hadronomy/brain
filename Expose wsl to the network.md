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
8. Ensure that it constains the followi

## Resources

- Blog - https://randombytes.substack.com/p/bridged-networking-under-wsl

