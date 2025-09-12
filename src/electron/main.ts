import { app, BrowserWindow } from "electron";
import { isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (isDev()) {
    win.loadURL("http://localhost:5123");
  } else {
    win.loadFile(app.getAppPath() + "/dist-react/index.html");
  }

  pollResources();
};

app.whenReady().then(() => {
  createWindow();
});
