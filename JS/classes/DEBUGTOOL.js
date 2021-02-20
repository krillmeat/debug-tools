/**
 * DEBUG TOOL
 * @class
 * @param {Boolean} onStart     If true, debug will display on load of the page
 * @param {String}  debugColor  Optional - Hex Code for the Color the Debug Logs | Defaults to Green (#27AE60)
 */
class DEBUGTOOL{
  constructor(onStart,debugColor){
    this.PARAM_OPTIONS = ["debug","debug-start","debug-visual","debug-grid"];

    this._debugColor = debugColor ? debugColor : "#27AE60";  // The Color used by the debug messaging in the console
    this.elem = this.buildDebugElement();                   // The HTML Element that contains the Debug Tools
    this.debugQueryParams = this.setupDebugQueryParams();   // Collects all Query Params into an Object

    // If the debug tools should start immediately, run at the very start
    if(onStart || this.debugQueryParams.debug) this.runOnStart();
  }

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  ::::::::::::::::::::  ELEMENT MANAGEMENT                                                     ::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

  /**
   * BUILD DEBUG ELEMENTS
   * ------------------------------------------------------------
   * Builds the HTML Elements that are used by the Debug Tools
   * ------------------------------------------------------------
   * @returns The HTML Element for the Debug Tools
   * ------------------------------------------------------------
   */
  buildDebugElement(){
    let debugElem = document.createElement("div");
        debugElem.id = "debug-tools";

    return debugElem;
  }

  /**
   * RUN ON START
   * ------------------------------------------------------------
   * All of the functionality that runs when the Debug Tools
   * are turned on
   * ------------------------------------------------------------
   */
  runOnStart(){
    this.debugLog("Enabling Debug Tools...");
  }

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  ::::::::::::::::::::  UTILITIES                                                              ::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

  /**
   * DEBUG LOG
   * ------------------------------------------------------------
   * Logs a Debug Message
   * ------------------------------------------------------------
   * @param {String} message  The message that needs to be logged
   * ------------------------------------------------------------
   */
  debugLog(message){
    console.log(`%c${message}`, `color:${this.debugColor}`)
  }

  /**
   * SETUP DEBUG QUERY PARAMS
   * ------------------------------------------------------------
   * Grabs the Query Parameters and sends them back as an Object
   * ------------------------------------------------------------
   * @param {String}  url Optional - The URL String (window.location.href)
   * @returns Object of Parameters
   */
  setupDebugQueryParams(url){
    let obj = this;
    let debugQueryParams = {};

    let urlString = url || window.location.href;
    let paramArray = urlString.substring(urlString.indexOf("?") +1).split("&");

    for(const param of paramArray){
      let paramSplit = param.split("=");
      if(obj.PARAM_OPTIONS.includes(paramSplit[0].toLowerCase())){
        let isBoolean = paramSplit[1] === 'true' || paramSplit[1] === 'false';
        debugQueryParams[paramSplit[0]] = isBoolean ? (paramSplit[1] === 'true') : paramSplit[1];
      }
    }

    return debugQueryParams;
  }

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  ::::::::::::::::::::  GETTERS                                                                ::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

  get debugColor(){ return this._debugColor }
}