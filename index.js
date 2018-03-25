const exec = require('child_process').exec;
const path = require('path');

class SoundAlert {
  constructor (sounds) {
    this.sounds = sounds;
  }

  apply (compiler) {
    compiler.plugin('done', stats => {
      const hasErrors = stats.hasErrors();
      const hasWarnings = stats.hasWarnings();

      const code = !hasErrors && !hasWarnings ? 'ok' : hasErrors ? 'error' : 'warning';
      this.playAlertSound(code);
    });
  }

  playAlertSound (alertCode) {
    let player = '';

    if (process.platform === 'win32') {
      player = path.resolve(__dirname, './dlcplayer/dlc') + ' -p'
    } else if (process.platform === 'darwin') {
      player = 'afplay'
    } else {
      player = 'mpg123 -q'
    }

    if (this.sounds[alertCode] !== undefined) {
      console.log(__dirname);
      const soundFile = `../../sounds/${this.sounds[alertCode]}`;
      exec(`${player} ${path.resolve(__dirname, soundFile)}`);
    }
  }
}

module.exports = SoundAlert;
