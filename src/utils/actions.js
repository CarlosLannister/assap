import {
  getConfiguration
} from "@/utils/configuration";

export class Action {
  isActionDone = false;

  constructor() {
    this.actionName = getConfiguration().action;
    this.opsystem = process.platform;
    this.exec = require('child_process').exec;
    this.availableActions = ["lockscreen", "lowbrightness", "notification"]
  }

  getActionName() {
    return this.actionName;
  }

  getAvailableActions() {
    return this.availableActions;
  }

  executeAction() {

    this.actionName = getConfiguration().action;
    switch (this.actionName) {
      case "lockscreen":
        this.lockscreen();
        break;
      case "lowbrightness":
        this.lowbrightness();
        break;
      case "notification":
        this.notify();
        break;
      case "alarm":
        this.alarm();
        break;
    }
  }

  reverseAction() {
    switch (this.actionName) {
      case "lowbrightness":
        this.reverselowbrightness();
        break;
    }
  }

  lowbrightness() {
    const brightness = require('brightness')
    const windows = 'powershell (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,1)';
    const linux = 'xrandr --output $(xrandr -q | grep "connected" | head -n 1 | cut -d " " -f1) --brightness 0.1'
    const command = {
      'linux': linux,
      'win32': windows
    }

    if (this.opsystem == 'darwin') {
      brightness.set(0.1).then(() => {
        console.log('Changed brightness to 10%'); // eslint-disable-line no-console
      });
    } else {
      this.exec(command[this.opsystem],
        function(error) {
          if (error !== null) {
            console.log('exec error: ' + error); // eslint-disable-line no-console
          }
        });
    }
  }

  reverselowbrightness() {
    const brightness = require('brightness')
    const windows = 'powershell (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,100)';
    const linux = 'xrandr --output $(xrandr -q | grep "connected" | head -n 1 | cut -d " " -f1) --brightness 0.8'
    const command = {
      'linux': linux,
      'win32': windows
    }

    if (this.opsystem == 'darwin') {
      brightness.set(0.8).then(() => {
        console.log('Changed brightness to 80%'); // eslint-disable-line no-console
      });
    } else {
      this.exec(command[this.opsystem],
        function(error) {
          if (error !== null) {
            console.log('exec error: ' + error); // eslint-disable-line no-console
          }
        });
    }
  }

  lockscreen() {
    this.actionName = getConfiguration().action;
    if (!this.isActionDone) {
      const windows = 'rundll32.exe user32.dll,LockWorkStation';
      const linux = 'xdg-screensaver lock'
      const darwin = '/System/Library/CoreServices/Menu\\ Extras/user.menu/Contents/Resources/CGSession -suspend'
      const command = {
        linux,
        darwin,
        'win32': windows
      }
      this.exec(command[this.opsystem],
        function(error) {
          if (error !== null) {
            console.log('exec error: ' + error); // eslint-disable-line no-console
          }
        });
    }
    if (this.opsystem == "darwin") {
      this.isActionDone = true
    }
  }

  notify() {
    new Notification('¡Alerta!', {
      body: 'Podrían estar observandote.'
    })
  }

}
