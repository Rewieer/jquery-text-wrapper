/**
 * Allow the user to use shortcuts
 * @constructor
 */
function ShortcutHandler() {
  const keyCurrentlyPressed = [];
  // Special code-to-name mapping
  const keyMap = {"17":"CTRL"};
  const listeners = [];

  /**
   * Return true if the key is pressed
   * @param name
   * @returns {boolean}
   */
  function isKeyPressed(name) {
    return keyCurrentlyPressed.indexOf(name) >= 0;
  }

  /**
   * Return the key name for ASCII code
   * @param code
   * @returns {*}
   */
  function getKeyNameForCode(code) {
    if(keyMap[code]) return keyMap[code];
    return String.fromCharCode(code);
  }

  /**
   * Check that a listener is currently waiting for the current call
   */
  function check() {
    listeners.forEach(function(listener) {
      const currentCombination = keyCurrentlyPressed.join("+");
      if(currentCombination === listener.combination) {
        listener.callback();
      }
    });
  }

  /**
   * Handle pressing down
   * @param event
   * @returns
   */
  this.handleKeyDown = function handleKeyDown(event) {
    const keyName = getKeyNameForCode(event.which);

    // If the CTRL key is not pressed already we don't need to go further.
    if(isKeyPressed("CTRL") === false && event.which !== 17) return;

    if(keyCurrentlyPressed.indexOf(keyName) < 0) {
      event.preventDefault();
      keyCurrentlyPressed.push(keyName);
      check();
      return false;
    }
  };

  /**
   * Handle pressing up
   * @param event
   */
  this.handleKeyUp = function handleKeyUp(event) {
    const keyName = getKeyNameForCode(event.which);
    if(keyCurrentlyPressed.indexOf(keyName) >= 0) {
      keyCurrentlyPressed.splice(keyCurrentlyPressed.indexOf(keyName), 1);
      check();
    }
  };

  /**
   * Hook to call a function when a combination of keys is pressed
   * @param combination
   * @param callback
   */
  this.onPress = function onPress(combination, callback) {
    listeners.push({
      combination: combination,
      callback: callback
    });
  }
}

module.exports = ShortcutHandler;