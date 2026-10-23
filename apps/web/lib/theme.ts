// Runs before first paint so a saved dark theme never flashes light.
export const themeScript = `try{var t=localStorage.getItem("sharkly-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
