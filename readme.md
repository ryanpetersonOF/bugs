## Portal Window Demo

This demo showcases the rough functionality of rendering into a child window. The portal window is able to be updated with its own local state, passed state (props), redux provider state, attached events (onClick, etc), as well as adding or removing any children just as a normal react component would. It's best to think of the Portal component, which is the wrapper component and creator of the portal window, as a normal component. However, instead of rendering its children to the local DOM, it just ships it out to a remote DOM.

Since this works under the premise of a normal component, the portal windows can be opened and closed simply by adding or removing the portal components the react tree. Further logic could be added to hide or show or anything else, but is not part of this demo.

I have also included the renderComponentInWindow util which allows you to create a 'detached' portal window without having to render into the react tree. This is great for one off windows, where there maybe not be a lot data flowing, or you may want to control the fin window separately outside of mounting and unmounting. It should be noted that out of the box, props will be not be updated automaticaly in the detached window. Local state, redux, and prop actions (such as de/incrementing in this demo) will continue to work. If props do need to be updated, the util would simply need to be called again with the updated props and same target window. This does not cause a remount either.

This is the pattern we have used in the Notification Center and in Suite. In fact, every window you see in both of those projects is being rendered in the Portal Window fashion!

This demo does not have safe guards included for HMR or app reloads. However, this can all be solvable with the proper react hot reloading, not using randomly windows, and proper eventing.

### To Start
Install: `npm i`
Start Server: `npm run start`
Start OpenFin: `npm run openfin`