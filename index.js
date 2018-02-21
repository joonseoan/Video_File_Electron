console.log ("Electron app, index.jf started.")

/**
 * Electron Architecture
 * 1. Electron App: contains all of logic and control for browser functions in a index.html.
 *      . It is made for free by the electron library (module????)
 *      . The most useful property of Electron is "app" property. (Find below the destructure)
 *      . Life Cycle
 *          1. Bootup and Electron starts
 *          2. app process is created.(It takes a time to create app process)
 *          3. app ready to start doing things (Once app creation is done)
 *          4. app closes down
 *
 *  2. Main Window
 *      . We made this by ourselves.
 * 
 * 
 *  3. Awsome Electron
 *      . As Electrom splitting up Electron App and Main Window,
 *        it minimizes for the programmer to work on different Control system (elctron app) 
 *        or Window for another platform. They are reusable.
 * 
 */


// nodejs module (please confirm )
// (1) app property of electron boots  up
const electron = require('electron');




// same thing as in ReactJS.
// ES6 Module
// import electron from 'electron'; // not supportive


/**
 * [destructuring]
 * var robotA = { name: "Bender" };
   var robotB = { name: "Flexo" };
  
    var { name: nameA } = robotA;
    var { name: nameB } = robotB;
 * 
 */

// app property : gives us the life cycle of the running app.
// "app" here represents the overall running underlined-process on our machine.
// 
//   in electron variable which contains the electron module
//   electron.app

// (2) The process of app property is created.
// const { app } = electron; // meaning "app" property of many properties 

// As app gets a value, the app is ready to process 
// Watching an single event, then ready to start process and finally shoot up or execute

// app = things we are listening to,
// ready: an event we are listening for, 
// call back function: function to run when event occurs
// 
/**
 *  Electron CLI
 *  
 *  Setup : please find "scripts" in JSON file, then
 *  delete  "test": "echo \"Error: no test specified\" && exit 1"
	insert "electron": "electron ."
 * 
 * 
 *  finally run "npm run electron"
 */

 /*
 // 
app.on('ready', () => {

    // It can be used to debug codes in terminal.
    console.log('App is now ready');


});
*/

/**
 * [Show contents on the browser window to the user]
 */

// using BrowserWindow object.
// "ipcMain" is to listen to the event from Main Window
//  (2) The process of app property is created.
// -- const { app, BrowserWindow, ipcMain } = electron;

// (3) ready to execute by listening to an event.
// -- app.on('ready', () => {

    // creating instance of BrowserWindow object.
    // {} => config option
   // -- const mainWindow = new BrowserWindow({});
    // mainWindow.loadURL('https://koreanz.tv');

    // In order to access and load the file, use "__dirname", a -g variable of nodejs
    // runtime the current electron application running on
    // Be careful about "__" => it is double underscores.
    // -- mainWindow.loadURL(`file://${ __dirname }/index.html`); 

// -- });

/**
 * [Application Logic] : Building Electron App part
 * 
 * Browser: at a limited moment, a file purposelly fed into it
 * For instance, only video file accepted for the certain application.
 * 
 * Electron : any arbitrary files at any time.
 * 
 */

 /**
  * [ffmepg]
  
   
   ffmpeg provides a way to read a video file
   It is a common module of nodejs

    fluent--ffmpeg and its "ffprobe" module to probe metadata of the mpeg files.
    We will use ffprobe!

    Setup

    npm install --save fluent-ffmpeg

    in terminal, enter "which brew" interminal to find "home brew"

    // Apple
    if it is not installed, go to url => "brew.sh" in browser.
    Then copy =-> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    and paste it in the terminal.

    // Window
    https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg
    
    // ffmpeg is a CLI (CLI : command line interface )
    // it is a kind of media to communication between computer programming and for instance, a specific multimedia data

    // CLI is working with Electron app which is a backend control with IPC?
  *
  */


  /**
   * IPC (Inter process communication ) is a media to communicate between Electron App (underground control) 
   * and Web App (Main Window)
   * 
   * ipc listener to listen the event from Main Window
   * : ipcMain.on 
   * 
   * to send the result to Main Window from Electron App
   * : mainWindow.WebContents.send 
   * 
   */

   // Just for the studying, place this here.
   // Later on, it should be at the top of the codings.
   // "fluent-ffmpeg" is just a nodejs version of ffmpeg.
// -- const ffmpeg = require('fluent-ffmpeg');

   

   // must be a same name from Main Window
   // When listen to the event name, do something by using callback
   // The second argument deals with which Main Window event sends 
   // the Main Window's data. "path" here is the object Main Window sent to Electron Window.
 // --  ipcMain.on('gotVideoFile', (event, path) => {

      //  console.log('***event :  ', event);
       // console.log('path in Electron :   ', path)

    // ffprobe is used to read data of video files.
    // Without error, it can read 'all' metadata of the video file.
        //-- ffmpeg.ffprobe(path, (err, metadata) => {

        //console.log(metadata);
        // console.log('video duration of metadata : ', metadata.format.duration);

        // -- mainWindow.webContents.send();

    // });
    

   // });


   /**
    * mainWindow is inside of call back function below.
    * It must be outside of the fuction to be used for IPC: mainWindow.webContents.send();  
    * 
    */
 
   // -------------------------------------------------------------------------------------

   const { app, BrowserWindow, ipcMain } = electron;

   let mainWindow; //*** delcare "mainWindow" here
   
   app.on('ready', () => {

   mainWindow = new BrowserWindow({});
   mainWindow.loadURL(`file://${ __dirname }/index.html`); 

});

 
   const ffmpeg = require('fluent-ffmpeg');

   ipcMain.on('gotVideoFile', (event, path) => {

        console.log('***event :  ', event);
        console.log('path in Electron :   ', path)

        ffmpeg.ffprobe(path, (err, metadata) => {

            // any process here and send its result back to mainWindow.
        mainWindow.webContents.send('gotVideoLength', metadata.format.duration);

    });
    
   });

