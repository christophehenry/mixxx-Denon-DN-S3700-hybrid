function DenonDNS3700() {}

/*
Planning
1. Add loop A/B/Reloop + hotcue led controls
2. Add live time indication - confirmed available, DONE 
3. Add live bpm indication - not confirmed available. 
4. Design effects buttons echo / flanger / filter
5. Add override for vinylcontrol via plattermode button?



TODO: Controls for hotcue leds instead of hard on/off --> mixxx 2.4

  TODO: Display bpm, key
  TODO: Start in a known platter state: stopped, moving, reverse
  TODO: Display loaded track (mixxx devs) 
  TODO: Better handling of wether the track is loaded, not loaded, or loading

*/

/*
################
###SET OBJECTS
################
*/



DenonDNS3700.DEBUG_LEVEL = 2;
DenonDNS3700.DVS = true;

DenonDNS3700.CMD_CODE = 0xB0;

DenonDNS3700.ButtonChange = {
    ButtonReleased: 0x00,
    ButtonPressed: 0x40
}

DenonDNS3700.RotaryChange = {
    Left: 0x7F,
    Right: 0x00
}

DenonDNS3700.LedMode = {
    On: 0x4A,
    Off: 0x4B,
    Blink: 0x4C
}

DenonDNS3700.VdfMode = {
    VDF_On: 0x4D,
    VDF_Off: 0x4E,
    VDF_Blink: 0x4F
}

DenonDNS3700.Led = {
    DiskEject: 0x01,
    Playlist: 0x02,
    PlatterModeGreen: 0x05,
    PlatterModeOrange: 0x06,
    Pitch: 0x07,
    KeyAdjust: 0x08,
    Tap: 0x09,
    EchoLoop: 0x0B,
    Flanger: 0x0D,
    Filter: 0x0F,
    AutoLoopSet: 0x2B,
    AutoLoopExit: 0x2C,
    One: 0x11,
    OneDimmer: 0x12,
    Two: 0x13,
    TwoDimmer: 0x14,
    Three: 0x15,
    ThreeDimmer: 0x16,
    NextTrack: 0x1D,
    Parameters: 0x1E,
    Effects: 0x2D,
    Flip: 0x23,
    A: 0x24,
    ADimmer: 0x3E,
    B: 0x40,
    BDimmer: 0x2A,
    Cue: 0x26,
    Play: 0x27,
    Brake: 0x28,
    Dump: 0x29,
    Reverse: 0x3A,
    ExitReloop: 0x42,
    LeftBezel: 0x43,
    RightBezel: 0x44,
    CdIn: 0x48
}

DenonDNS3700.Vdf = {
    T: 0x01,
    Remain: 0x02,
    Elapsed: 0x03,
    Cont: 0x04, 
    Single: 0x05,
    Bpm: 0x06,
    m: 0x07,
    s: 0x08,
    f: 0x09,
    PitchDotRight: 0x0A,
    PitchDotCenter: 0x0B,
    PitchDotLeft: 0x0C,
    Mp3: 0x10,
    Wav: 0x11,
    Kb: 0x13,
    KeyAdj: 0x14,
    Memo: 0x15,
    BracketLeft: 0x16,
    BracketRight: 0x18,
    A: 0x1A,
    B: 0x1C,
    Pitch: 0x46,
    Aac: 0x47,
    Aiff: 0x48,
    Wmf: 0x49,
    ScratchRingOutside: 0x1E,
    ScratchRingInside: 0x1F,
    TouchDot: 0x20,
    TrackPositionBlink: 0x21, //Only use 0x4F/ 0x4E
    ScratchPosition01: 0x22, //Top Right, only use 0x4F / 0x4E
    ScratchPosition02: 0x23, //only use 0x4F / 0x4E
    ScratchPosition03: 0x24, //only use 0x4F / 0x4E
    ScratchPosition04: 0x25, //only use 0x4F / 0x4E
    ScratchPosition05: 0x26, //only use 0x4F / 0x4E
    ScratchPosition06: 0x27, //only use 0x4F / 0x4E
    ScratchPosition07: 0x28, //only use 0x4F / 0x4E
    ScratchPosition08: 0x29, //only use 0x4F / 0x4E
    ScratchPosition09: 0x2A, //only use 0x4F / 0x4E
    ScratchPosition10: 0x2B, //only use 0x4F / 0x4E
    ScratchPosition11: 0x2C, //only use 0x4F / 0x4E
    ScratchPosition12: 0x2D, //only use 0x4F / 0x4E
    ScratchPosition13: 0x2E, //only use 0x4F / 0x4E
    ScratchPosition14: 0x2F, //only use 0x4F / 0x4E
    ScratchPosition15: 0x30, //only use 0x4F / 0x4E
    ScratchPosition16: 0x31, //BOTTOM, only use 0x4F / 0x4E
    ScratchPosition17: 0x32, //only use 0x4F / 0x4E
    ScratchPosition18: 0x33, //only use 0x4F / 0x4E
    ScratchPosition19: 0x34, //only use 0x4F / 0x4E
    ScratchPosition20: 0x35, //only use 0x4F / 0x4E
    ScratchPosition21: 0x36, //only use 0x4F / 0x4E
    ScratchPosition22: 0x37, //only use 0x4F / 0x4E
    ScratchPosition23: 0x38, //only use 0x4F / 0x4E
    ScratchPosition24: 0x39, //only use 0x4F / 0x4E
    ScratchPosition25: 0x3A, //only use 0x4F / 0x4E
    ScratchPosition26: 0x3B, //only use 0x4F / 0x4E
    ScratchPosition27: 0x3C, //only use 0x4F / 0x4E
    ScratchPosition28: 0x3D, //only use 0x4F / 0x4E
    ScratchPosition29: 0x3E, //only use 0x4F / 0x4E
    ScratchPosition30: 0x3F, //only use 0x4F / 0x4E
    ScratchPosition31: 0x40, //only use 0x4F / 0x4E
    ScratchPosition32: 0x41, //TOP, only use 0x4F / 0x4E
    




}



DenonDNS3700.PRESET_REQUEST = [
    0xF0, // start of system exlusive
    0x00, // id code: Denon DJ ID
    0x40, // ^
    0x03, // ^
    0x12, // communication format: one way
    
    0x04, // model number: DN-S3700
    0x00, // unit number: iterate this through 0x00 to 0x05
    0x7F, // midi channel: all
    0x50, // message type: polling
    0x21, // command: preset request
    
    0xF7  // end of system exclusive
];

DenonDNS3700.PRESET_UNIT_OFFSET = 6;
DenonDNS3700.NUMBER_OF_UNITS = 15;

// Just hard code the midi numbers for where to send characters rathen than try to figure
// out the bizarre allocation scheme by the manufacturer
DenonDNS3700.CHAR_MSBS = [
    [ 0x01, 0x02, 0x03, 0x04, 0x05, 0x07, 0x08, 0x09,
      0x0A, 0x0B, 0x0C, 0x0D, 0x58, 0x59, 0x5A, 0x5B ],
    [ 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15,
      0x16, 0x17, 0x18, 0x19, 0x6C, 0x6D, 0x6E, 0x6F ]
];

DenonDNS3700.CHAR_LSBS = [
    [ 0x21, 0x22, 0x23, 0x24, 0x25, 0x27, 0x28, 0x29,
      0x2A, 0x2B, 0x2C, 0x2D, 0x5C, 0x5D, 0x5E, 0x5F ],
    [ 0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35,
      0x36, 0x37, 0x38, 0x39, 0x70, 0x75, 0x76, 0x77 ]
];

DenonDNS3700.MAX_NUM_CHARS = 16;
DenonDNS3700.EMPTY_CHAR = " ".charCodeAt(0);
DenonDNS3700.SCROLL_REST = 4; // in scroll ticks

DenonDNS3700.TextDisplayState = {
    Empty: 0,
    Static: 1,
    Scroll: 2,
    Blink: 3
}

DenonDNS3700.PlaybackState = {
    Initializing: 0,
    Searching: 1,
    Paused: 2,
    Playing: 3,
    CueHeld: 4
}

DenonDNS3700.TrackState = {
    Initializing : 0,
    NotLoaded : 1,
    Loading : 2,
    Loaded : 3,
    Fading : 4, // TODO
    Failed : 5 // TODO
}

DenonDNS3700.TimeDisplayState = {
    Remaining: 0,
    Elapsed: 1
}

DenonDNS3700.AutoLoopState = {
    Off : 0,
    On  : 1
}



DenonDNS3700.ledCache = [];
DenonDNS3700.textDisplayState = [ null, null ];
DenonDNS3700.textDisplayCache = [ [], [] ];
DenonDNS3700.textDisplayTimer = [ {}, {} ];

DenonDNS3700.requestPresetDataTimer = [];
DenonDNS3700.initFlashTimer = [];

DenonDNS3700.CHANNEL_CONNECTIONS = [
    {control: "bpm",                handler: "mixxxBpmHandler"},
    {control: "eject",              handler: "mixxxEjectHandler"},
    {control: "beat_active",        handler: "mixxxBeatActiveHandler"},
    {control: "keylock",            handler: "mixxxKeylockHandler"},
    {control: "play_indicator",     handler: "mixxxPlay_indicator"    },
    {control: "cue_indicator",      handler: "mixxxCue_indicator"    },
    {control: "play",               handler: "mixxxPlayHandler"},
    {control: "time_remaining",     handler: "mixxxTimeRemainingHandler"},
    {control: "time_elapsed",       handler: "mixxxTimeElapsedHandler"},
    {control: "playposition",       handler: "mixxxPlayPositionHandler"},
];

DenonDNS3700.MASTER_CONNECTIONS = [
    {control: "maximize_library",   handler: "mixxxMaximize_libraryHandler"}
];

/*
  Current text display functions:

  DenonDNS3700.clearTextDisplay = function(row, duration)
  DenonDNS3700.setTextDisplay = function(row, col, text, duration)
  DenonDNS3700.blinkTextDisplay = function(row, col, text, tickInterval, duration)
  DenonDNS3700.scrollTextDisplay = function(row, text, prefix, tickInterval, duration)

  Text display functions for debugging:

  DenonDNS3700.debugFlash = function(str)
  DenonDNS3700.debugStateInfo = function(str)
  DenonDNS3700.userFlash = function(str)
  DenonDNS3700.userScroll = function(str, [prefix])
*/



/*
################
###GENERAL FUNCTIONS
################
*/

DenonDNS3700.startTimer = function(timer, delay, handler)
{
    DenonDNS3700.stopTimer(timer);
    timer.id = engine.beginTimer(delay, handler);
}

DenonDNS3700.stopTimer = function(timer) {
    if (timer.id > 0) {
        engine.stopTimer(timer.id);
        timer.id = 0;
    }
}

DenonDNS3700.makeChannelConnections = function(enable)
{
    for (var i = 0; i < DenonDNS3700.CHANNEL_CONNECTIONS.length; ++i) {
        var obj = DenonDNS3700.CHANNEL_CONNECTIONS[i];
        engine.connectControl(DenonDNS3700.channel,
                              obj.control, "DenonDNS3700." + obj.handler,
                              !enable);
    }
}

DenonDNS3700.makeMasterConnections = function(enable)
{
    for (var i = 0; i < DenonDNS3700.MASTER_CONNECTIONS.length; ++i) {
        var obj = DenonDNS3700.MASTER_CONNECTIONS[i];
        engine.connectControl("[Master]",
                              obj.control, "DenonDNS3700." + obj.handler,
                              !enable);
    }
}

DenonDNS3700.presetDataChanged = function (channel, control, value)
{
    DenonDNS3700.shutdown();
 
    // re-init
    DenonDNS3700.init(DenonDNS3700.id, DenonDNS3700.debug);
}

DenonDNS3700.init = function (id, debug)
{
    DenonDNS3700.id = id;
    DenonDNS3700.debug = debug;
      
    // Does not work in hybrid mode :(
    // TODO: Is there a way to start up in a known platter state?
    DenonDNS3700.turntableOff();
    

    DenonDNS3700.turnOffAllLeds();
    DenonDNS3700.setTextDisplay(0, 0, "Requesting");
    DenonDNS3700.setTextDisplay(1, 0, "Preset Data...");

    DenonDNS3700.deck = -1;
    DenonDNS3700.channel = null;
    DenonDNS3700.cueHeld = false;
    DenonDNS3700.timeDisplayState = DenonDNS3700.TimeDisplayState.Remaining;
    DenonDNS3700.autoLoopState = DenonDNS3700.AutoLoopState.Off;
    DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Initializing;
    DenonDNS3700.trackState = DenonDNS3700.TrackState.Initializing;
    DenonDNS3700.updateTimeDisplay();
    DenonDNS3700.startTimer(DenonDNS3700.requestPresetDataTimer, 250,
                            "DenonDNS3700.requestPresetDataTimerHandler");
}

// used during initialization to obtain deck number from the preset data;
DenonDNS3700.inboundSysex = function (data, length)
{
    DenonDNS3700.deck = data[DenonDNS3700.PRESET_UNIT_OFFSET] + 1;
    DenonDNS3700.channel = "[Channel" + DenonDNS3700.deck + "]";   
}

DenonDNS3700.requestPresetDataTimerHandler = function()
{
    if (DenonDNS3700.deck < 0) { // keep trying. sometimes the device is not talkative
        for (var i = 0; i < DenonDNS3700.NUMBER_OF_UNITS; ++i) {
            DenonDNS3700.PRESET_REQUEST[DenonDNS3700.PRESET_UNIT_OFFSET] = i;
            midi.sendSysexMsg(DenonDNS3700.PRESET_REQUEST,
                              DenonDNS3700.PRESET_REQUEST.length);
        }
    } else {
        DenonDNS3700.stopTimer(DenonDNS3700.requestPresetDataTimer);
        var maxAllowedDecks = engine.getValue("[Master]","num_decks");
        if (DenonDNS3700.deck >= maxAllowedDecks) {
            DenonDNS3700.setTextDisplay(0, 0, "Deck Number Bad :(");
            DenonDNS3700.setTextDisplay(1, 0, "Hold MEMO > Select Unit No Set > " +
                                              "Select 1 through " + (maxAllowedDecks+1));
        } else {
            DenonDNS3700.initDisplayCounter = 8;
            DenonDNS3700.startTimer(DenonDNS3700.initFlashTimer, 500,
                                    "DenonDNS3700.initDisplayTimerHandler");
        }
    }
}

// timer handler for the initial startup flashiness
DenonDNS3700.initDisplayTimerHandler = function()
{
    if (DenonDNS3700.initDisplayCounter % 4 == 0) {
        
        DenonDNS3700.setTextDisplay(0, 0, "Hello, Mixxx");
        DenonDNS3700.setTextDisplay(1, 0, "Deck " + DenonDNS3700.deck + " Online :)");
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Tap,(DenonDNS3700.LedMode.On));
    } else if (DenonDNS3700.initDisplayCounter % 2 == 0) {
        DenonDNS3700.setTextDisplay(0, 0, "123456789012345678");
        DenonDNS3700.setTextDisplay(1, 0, "ABCDEFGHIJKLMNOPQR");
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Tap,(DenonDNS3700.LedMode.On));
    } else {
        DenonDNS3700.clearTextDisplay(0);
        DenonDNS3700.clearTextDisplay(1);
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Tap,(DenonDNS3700.LedMode.Off));
    }
    
    if (DenonDNS3700.initDisplayCounter == 0) {
        DenonDNS3700.finishInit();
    }
    --DenonDNS3700.initDisplayCounter;
}

// invoked from the timer handler when the flashy sequence is done
DenonDNS3700.finishInit = function (id)
{
    // no longer need the timer for initial flashing
    DenonDNS3700.stopTimer(DenonDNS3700.initFlashTimer);

    // force into vinyl control? this is convenient but questionable
    engine.setValue(DenonDNS3700.channel, "vinylcontrol_enabled", DenonDNS3700.DVS);

    // enable connections
    DenonDNS3700.makeChannelConnections(true);
    DenonDNS3700.makeMasterConnections(true);

    var bpmAvailable = DenonDNS3700.mixxxBpmIsAvailable();

    // try to determine the track state
    if (bpmAvailable) {
        DenonDNS3700.trackState = DenonDNS3700.TrackState.Loaded;
    } else {
        DenonDNS3700.trackState = DenonDNS3700.TrackState.NotLoaded;
    }
    
    DenonDNS3700.updatePlaybackState();
    // initial LED update based on the playback and track state
    DenonDNS3700.updatePlaybackDisplay();

    // update other things tied to the mixxx deck's state
    DenonDNS3700.mixxxKeylockHandler();
}

DenonDNS3700.updatePlaybackState = function()
{
    // enter one of the playback states
    if (DenonDNS3700.mixxxIsPlaying()) {
       
        DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Playing;        
    } else {
        if (DenonDNS3700.mixxxBpmIsAvailable()) {
          //  DenonDNS3700.debugFlash("Mixxx is paused");
            DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Paused;
        } else {
            DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Searching;
        }
    }
}

DenonDNS3700.turntableOn = function()
{
    midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x66, 0x7F);
}

DenonDNS3700.turntableOff = function()
{
    midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x66, 0x00);
}

DenonDNS3700.commonLedOp = function(ledValue, mode)
{
    if (DenonDNS3700.ledCache[ledValue] == mode) {
        //DenonDNS3700.debugFlash("already set");
        return;
    } else {
        DenonDNS3700.ledCache[ledValue] = mode;
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, mode, ledValue);
    }
}

DenonDNS3700.turnOffAllLeds = function()
{
    for (var key in DenonDNS3700.Led) {
        var led = DenonDNS3700.Led[key];
        DenonDNS3700.commonLedOp(led, DenonDNS3700.LedMode.Off);
    }
}



DenonDNS3700.putChar = function(row, col, ch)
{
    if (DenonDNS3700.textDisplayCache[row][col] == ch) {
        return;
    } else {
        DenonDNS3700.textDisplayCache[row][col] = ch;
        
        var idxMsb = DenonDNS3700.CHAR_MSBS[row][col];
        var idxLsb = DenonDNS3700.CHAR_LSBS[row][col];
    
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, idxMsb, (ch & 0xF0) >> 4);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, idxLsb, ch & 0x0F);
    }
}

DenonDNS3700.clearLine = function(row, colStart, colEnd)
{
    colStart = typeof colStart == 'undefined' ? 0 : colStart;
    colEnd = typeof colEnd == 'undefined' ? DenonDNS3700.MAX_NUM_CHARS-1 : colEnd;
    for (var i = colStart; i <= colEnd; ++i) {
        DenonDNS3700.putChar(row, i, DenonDNS3700.EMPTY_CHAR);
    }
}

DenonDNS3700.putString = function(row, col, str)
{
    for (var i = 0; i < str.length; ++i) {
        var x = col + i;
        if (x < DenonDNS3700.MAX_NUM_CHARS) {
            DenonDNS3700.putChar(row, x, str.charCodeAt(i));
        }
    }
}

DenonDNS3700.mixxxIsPlaying = function()
{
    return engine.getValue(DenonDNS3700.channel, "play");
}

DenonDNS3700.mixxxBpmIsAvailable = function()
{
    var value = engine.getValue(DenonDNS3700.channel, "bpm");
    return value != null && value != 0;
}

DenonDNS3700.isInitializing = function()
{
    return DenonDNS3700.playbackState == DenonDNS3700.PlaybackState.Initializing;
}

DenonDNS3700.updatePlaybackDisplay = function()
{
    switch(DenonDNS3700.playbackState) {
    case DenonDNS3700.PlaybackState.Initializing:
        return;
        break;
    case DenonDNS3700.PlaybackState.Playing:
        if (DenonDNS3700.trackState == DenonDNS3700.TrackState.Loaded) {
            var debugStateInfo = "Playing";
        } else {
            var debugStateInfo = "Platter ON/no track";
        }
        var effectsLed = DenonDNS3700.LedMode.On;
        break;
    case DenonDNS3700.PlaybackState.Paused:
        var debugStateInfo = "Paused";
        var effectsLed = DenonDNS3700.LedMode.On;
        break;
    case DenonDNS3700.PlaybackState.Searching:
        var debugStateInfo = "Searching";
        var effectsLed = DenonDNS3700.LedMode.On;
        break;
    default:
        var debugStateInfo = "Unknown State :(";
        var effectsLed = DenonDNS3700.LedMode.Blink;
        break;
    }

    switch (DenonDNS3700.trackState) {
    case DenonDNS3700.TrackState.Loaded:
        var parametersLed = DenonDNS3700.LedMode.On;
        var ejectLed = DenonDNS3700.LedMode.On;
        break;
    case DenonDNS3700.TrackState.Loading:
        var parametersLed = DenonDNS3700.LedMode.On;
        var ejectLed = DenonDNS3700.LedMode.Blink;
        break;
    default:
        var parametersLed = DenonDNS3700.LedMode.Blink;
        var ejectLed = DenonDNS3700.LedMode.Off;
        break;
    }
    switch (DenonDNS3700.timeDisplayState) {
    case DenonDNS3700.TimeDisplayState.Remaining:
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_On,DenonDNS3700.Vdf.Remain);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_Off,DenonDNS3700.Vdf.Elapsed);
        break;

    case DenonDNS3700.TimeDisplayState.Elapsed:
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_On,DenonDNS3700.Vdf.Elapsed);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_Off,DenonDNS3700.Vdf.Remain);
        break;




    }
    
       
    DenonDNS3700.debugStateInfo(debugStateInfo);
  
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.Effects,(effectsLed));
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.Parameters,(parametersLed));
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.DiskEject,(ejectLed));
    DenonDNS3700.updateHotCueDisplay();
}

DenonDNS3700.mixxxKeylockHandler = function()
{
    var keyOn = engine.getValue(DenonDNS3700.channel, "keylock");
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.KeyAdjust,(keyOn ? DenonDNS3700.LedMode.On : DenonDNS3700.LedMode.Off));
}

DenonDNS3700.mixxxMaximize_libraryHandler = function()
{
    var maxOn = engine.getValue("[Master]", "maximize_library");
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.Playlist,(maxOn ? DenonDNS3700.LedMode.On : DenonDNS3700.LedMode.Off));
}





DenonDNS3700.mixxxEjectHandler = function()
{
    if (DenonDNS3700.trackState == DenonDNS3700.TrackState.Loading) {
        return;
    } else if (DenonDNS3700.trackState != DenonDNS3700.TrackState.NotLoaded) {
        DenonDNS3700.trackState = DenonDNS3700.TrackState.NotLoaded;
        DenonDNS3700.setTextDisplay(0, 0, "No track loaded.");
        if (DenonDNS3700.playbackState == DenonDNS3700.PlaybackState.Paused) {
            DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Searching;
        }
        DenonDNS3700.updatePlaybackDisplay();
    }
}

DenonDNS3700.mixxxBpmHandler = function(value)
{
    if (DenonDNS3700.trackState == DenonDNS3700.Loading) {
        return;
    } else if (DenonDNS3700.mixxxBpmIsAvailable() || DenonDNS3700.mixxxIsPlaying()) {
        if (DenonDNS3700.trackState != DenonDNS3700.TrackState.Loaded) {
            DenonDNS3700.trackState = DenonDNS3700.TrackState.Loaded;
            DenonDNS3700.userFlash("Track Loaded");
            DenonDNS3700.setTextDisplay(0, 0, engine.getValue(DenonDNS3700.channel, "bpm").toString());
            //DenonDNS3700.userFlash(engine.getValue(DenonDNS3700.channel, "bpm").toString());
            DenonDNS3700.updatePlaybackDisplay();
        }
        DenonDNS3700.setTextDisplay(0, 13, Math.floor(engine.getValue(DenonDNS3700.channel, "bpm")).toString());
        //DenonDNS3700.updatePlaybackDisplay();
    }   
}

DenonDNS3700.mixxxBeatActiveHandler = function(value)
{   
    //limiting midi out while debugging. 
    if (DenonDNS3700.DEBUG_LEVEL != 2) {
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Tap,(value ? DenonDNS3700.LedMode.On
                              : DenonDNS3700.LedMode.Off));
        }
}

DenonDNS3700.mixxxTimeRemainingHandler = function(value)
{   
    if (DenonDNS3700.timeDisplayState == DenonDNS3700.TimeDisplayState.Remaining){
        var minutes = Math.floor(value / 60);
        var seconds = Math.floor(value % 60);
        var frame = Math.floor((value * 100) % 100)
    
        print(minutes);
        print(seconds);
        //print(value);
    
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x42, minutes);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x43, seconds);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x44, 00); //smallest update is second
     }
}

DenonDNS3700.mixxxTimeElapsedHandler = function(value)
{   
    if (DenonDNS3700.timeDisplayState == DenonDNS3700.TimeDisplayState.Elapsed){
        var minutes = Math.floor(value / 60);
        var seconds = Math.floor(value % 60);
        var frame = Math.floor((value * 100) % 100)
    
        print(minutes);
        print(seconds);
        //print(value);
    
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x42, minutes);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x43, seconds);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x44, 00); //smallest update is second
     }
}



DenonDNS3700.mixxxPlayPositionHandler = function(value)
{   
    var pos = Math.floor(value*100)
    midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x48, pos);
    print(pos)
}



DenonDNS3700.mixxxPlay_indicator = function(value)
{   
    //limiting midi out while debugging. 
    if (DenonDNS3700.DEBUG_LEVEL != 2) {
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Play,(value ? DenonDNS3700.LedMode.On
                              : DenonDNS3700.LedMode.Off));
        }
}


DenonDNS3700.mixxxCue_indicator = function(value)
{   
    //limiting midi out while debugging. 
    if (DenonDNS3700.DEBUG_LEVEL != 2) {
    DenonDNS3700.commonLedOp(DenonDNS3700.Led.Cue,(value ? DenonDNS3700.LedMode.On
                              : DenonDNS3700.LedMode.Off));
    }
}

//mixxxPlayHandler

DenonDNS3700.mixxxPlayHandler = function(value)
{    
 
}


DenonDNS3700.updateHotCueDisplay = function()
{
    var totalsamples = engine.getValue(DenonDNS3700.channel, "track_samples");
    var posh1 = Math.floor((engine.getValue(DenonDNS3700.channel, "hotcue_1_position")*100)/totalsamples);
    var posh2 = Math.floor((engine.getValue(DenonDNS3700.channel, "hotcue_2_position")*100)/totalsamples);
    var posh3 = Math.floor((engine.getValue(DenonDNS3700.channel, "hotcue_3_position")*100)/totalsamples);


    //cleaning display. 
    var i;
    for (i = 0; i < 100; i++){
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x3B, i);
    } ;
    

    //add dots to display
    if (posh1 > 0 ){
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x3A, posh1);    
    }
    if (posh2 > 0 ){
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x3A, posh2);
    }
    if (posh3 > 0){
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, 0x3A, posh3);

    }

}

DenonDNS3700.updateTimeDisplay = function()
{   
        //display m,s,f near the time digits. 
    
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_On, DenonDNS3700.Vdf.m);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_On, DenonDNS3700.Vdf.s);
        midi.sendShortMsg(DenonDNS3700.CMD_CODE, DenonDNS3700.VdfMode.VDF_On, DenonDNS3700.Vdf.f);
        
}


DenonDNS3700.setTextDisplayState = function(row, state)
{
    if (DenonDNS3700.textDisplayTimer[row] != null) {
        DenonDNS3700.stopTimer(DenonDNS3700.textDisplayTimer[row]);
    }
    DenonDNS3700.textDisplayState[row] = state;
    DenonDNS3700.applyTextDisplayState(row, state);
}

DenonDNS3700.pushTextDisplayState = function(row, state)
{
    if (DenonDNS3700.textDisplayTimer[row] != null) {
        DenonDNS3700.stopTimer(DenonDNS3700.textDisplayTimer[row]);
    }
    state.prevState = DenonDNS3700.textDisplayState[row];
    DenonDNS3700.textDisplayState[row] = state;
    DenonDNS3700.applyTextDisplayState(row, state);
}

DenonDNS3700.applyTextDisplayState = function(row, state)
{
    switch(state.textDisplayState) {
    case DenonDNS3700.TextDisplayState.Empty:
        DenonDNS3700.clearLine(row);
        break;
    case DenonDNS3700.TextDisplayState.Static:
    case DenonDNS3700.TextDisplayState.Blink:
        DenonDNS3700.clearLine(row);
        DenonDNS3700.putString(row, state.colStart, state.text);
        break;
    case DenonDNS3700.TextDisplayState.Scroll:
        DenonDNS3700.clearLine(row);
        DenonDNS3700.putString(row, 0, state.prefix);
        DenonDNS3700.putString(row, state.colStart, state.text);
    }

    if (state.tickInterval > 0 && state.numTicks > 0
     || state.textDisplayState == DenonDNS3700.TextDisplayState.Scroll) {
        DenonDNS3700.startTimer(DenonDNS3700.textDisplayTimer[row], state.tickInterval,
                                "DenonDNS3700.textDisplayTickHandler" + row);
    }
}

DenonDNS3700.textDisplayTickHandler0 = function()
{
    DenonDNS3700.processTextDisplayTick(0);
}

DenonDNS3700.textDisplayTickHandler1 = function()
{
    DenonDNS3700.processTextDisplayTick(1);
}

DenonDNS3700.processTextDisplayTick = function(row)
{
    var state = DenonDNS3700.textDisplayState[row];
    ++state.currTick;
    
    switch (state.textDisplayState) {
    case DenonDNS3700.TextDisplayState.Blink:       
        DenonDNS3700.clearLine(row);
        if (state.currTick % 2 == 0) {
           DenonDNS3700.putString(row, state.colStart, state.text);
        }
        break;
    case DenonDNS3700.TextDisplayState.Scroll:
        // rest first, then scroll
        var remainderTicks = state.currTick % state.periodTicks;
        var periodIdx = (state.currTick - remainderTicks) / state.periodTicks;
        var offset = remainderTicks - DenonDNS3700.SCROLL_REST;
        if (offset < 0) {
            offset = 0;
        }
        if (periodIdx % 2 == 0) { // scroll forward
            var i = 0;
            for (var col = state.colStart; col < DenonDNS3700.MAX_NUM_CHARS; ++col) {
                DenonDNS3700.putChar(row, col, state.text.charCodeAt(i + offset));
                i++;
            }
         } else { // scroll back
            var i = state.text.length - 1;
            for (var col = DenonDNS3700.MAX_NUM_CHARS-1; col >= state.colStart; --col) {
                DenonDNS3700.putChar(row, col, state.text.charCodeAt(i - offset));
                i--;
            }
        }
        break;
    }
    
    if (state.numTicks > 0 && state.currTick >= state.numTicks) {
        DenonDNS3700.stopTimer(DenonDNS3700.textDisplayTimer[row]);
        var prevState = state.prevState;
        delete DenonDNS3700.textDisplayState[row];
        DenonDNS3700.textDisplayState[row] = prevState;
        if (prevState != null) {
            DenonDNS3700.applyTextDisplayState(row, prevState);
        }
    }
}

DenonDNS3700.newEmptyDispState = function(duration)
{
    var obj = {
        textDisplayState : DenonDNS3700.TextDisplayState.Empty,
        tickInterval : duration,
        numTicks : 1,
        currTick : 0,
        prevState: null,
    }
    return obj;
}

DenonDNS3700.clearTextDisplay = function(row, duration)
{
    duration = (typeof duration == 'undefined') ? 0 : duration;
    var state = DenonDNS3700.newEmptyDispState(duration);
    DenonDNS3700.setTextDisplayState(row, state);
}

DenonDNS3700.newStaticDispState = function(col, text, duration)
{
    var obj = {
        textDisplayState : DenonDNS3700.TextDisplayState.Static,
        colStart : col,
        text : text,
        tickInterval : duration,
        numTicks : 1,
        currTick : 0,
        prevState: null,
    };
    return obj;
}

DenonDNS3700.setTextDisplay = function(row, col, text, duration)
{ 
    duration = (typeof duration == 'undefined' ? 0 : duration);
    var newState = DenonDNS3700.newStaticDispState(col, text, duration);

    if (DenonDNS3700.textDisplayState[row] != null
     && DenonDNS3700.textDisplayState[row].tickInterval > 0
     && DenonDNS3700.textDisplayState[row].numTicks > 0) {
        DenonDNS3700.textDisplayState[row].prevState = newState;
    } else {
        DenonDNS3700.setTextDisplayState(row, newState);
    }
}

DenonDNS3700.newBlinkDispState = function(col, text, tickInterval, duration)
{
    var obj = {
        textDisplayState : DenonDNS3700.TextDisplayState.Blink,
        colStart : col,
        text : text,
        tickInterval : tickInterval,
        numTicks : duration / tickInterval,
        currTick : 0,
        prevState: null,
    };
    return obj;
}

DenonDNS3700.blinkTextDisplay = function(row, col, text, tickInterval, duration)
{
    duration = (typeof duration == 'undefined' ? 0 : duration);
    var state = DenonDNS3700.newBlinkDispState(col, text, tickInterval, duration);
    if (DenonDNS3700.textDisplayState[row] != null
     && DenonDNS3700.textDisplayState[row].textDisplayState == state.textDisplayState) {
        state.prevState = DenonDNS3700.textDisplayState[row].prevState;
        DenonDNS3700.setTextDisplayState(row, state);
    } else {
        DenonDNS3700.pushTextDisplayState(row, state);
    }
}

DenonDNS3700.newScrollDispState = function(text, tickInterval, duration, prefix)
{   
    var obj = {
        textDisplayState : DenonDNS3700.TextDisplayState.Scroll,
        colStart : prefix.length,
        text : text,
        tickInterval : tickInterval,
        numTicks : duration / tickInterval,
        currTick : 0,
        prevState: null,
        prefix : prefix,
        periodTicks : DenonDNS3700.SCROLL_REST + text.length
                      - (DenonDNS3700.MAX_NUM_CHARS - prefix.length)
    };
    return obj;
}

DenonDNS3700.scrollTextDisplay = function(row, text, tickInterval, duration, prefix)
{
    prefix = (typeof prefix == 'undefined' ? "" : prefix);
    duration = (typeof duration == 'undefined' ? 0 : duration);
    var newState = DenonDNS3700.newScrollDispState(text, tickInterval,
                                                   duration, prefix);
    if (DenonDNS3700.textDisplayState[row] != null
     && DenonDNS3700.textDisplayState[row].tickInterval > 0
     && DenonDNS3700.textDisplayState[row].numTicks > 0) {
        DenonDNS3700.textDisplayState[row].prevState = newState;
    } else {
        DenonDNS3700.setTextDisplayState(row, newState);
    }
}

DenonDNS3700.debugFlash = function(str)
{
    if (DenonDNS3700.DEBUG_LEVEL >= 2) {
        DenonDNS3700.blinkTextDisplay(1, 0, "<" + str + ">", 200, 800);
    }
}

DenonDNS3700.userFlash = function(str)
{
    DenonDNS3700.blinkTextDisplay(1, 0, "[" + str + "]", 200, 800);
}

DenonDNS3700.debugStateInfo = function(str)
{
    if (DenonDNS3700.DEBUG_LEVEL >= 1) {
        DenonDNS3700.setTextDisplay(1, 0, "mode: " + str);
    }
}

DenonDNS3700.userScroll = function(str, prefix)
{
    DenonDNS3700.scrollTextDisplay(0, str, 300, 0, prefix);
}

DenonDNS3700.shutdown = function ()
{
    // display farewells, turn off the LEDs
    DenonDNS3700.setTextDisplay(0, 0, "Goodbye...");
    DenonDNS3700.clearTextDisplay(1);
    DenonDNS3700.turnOffAllLeds();
    
    // stop all timers
    DenonDNS3700.stopTimer(DenonDNS3700.initFlashTimer);
    DenonDNS3700.stopTimer(DenonDNS3700.requestPresetDataTimer);
    
    DenonDNS3700.stopTimer(DenonDNS3700.textDisplayTimer[0]);
    DenonDNS3700.stopTimer(DenonDNS3700.textDisplayTimer[1]);

    // remove existing connections
    if (DenonDNS3700.deck != -1) {
        DenonDNS3700.makeChannelConnections(false);
        DenonDNS3700.makeMasterConnections(false);
    }
}



/*
##################################
### INPUT
##################################
*/


DenonDNS3700.parametersRotaryChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
    
    if (value == DenonDNS3700.RotaryChange.Left) {
        DenonDNS3700.debugFlash("Params Left");
        engine.setValue("[Library]", "MoveUp", 1);
    } else {
        DenonDNS3700.debugFlash("Params Right");
        engine.setValue("[Library]", "MoveDown", 1);
    }
}

DenonDNS3700.parametersButtonPressed = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;   

    DenonDNS3700.debugFlash("Params Pressed");
    if (DenonDNS3700.playbackState == DenonDNS3700.PlaybackState.Playing
     && DenonDNS3700.trackState == DenonDNS3700.TrackState.Loaded) {
        DenonDNS3700.userFlash("Play Lock");
    } else {
        if (DenonDNS3700.playbackState != DenonDNS3700.PlaybackState.Playing) {
            DenonDNS3700.playbackState = DenonDNS3700.PlaybackState.Searching;
        }       
        DenonDNS3700.trackState = DenonDNS3700.TrackState.Loading;
        engine.setValue(DenonDNS3700.channel, "eject", 1);
        engine.setValue(DenonDNS3700.channel, "LoadSelectedTrack", 1);
        DenonDNS3700.setTextDisplay(0, 0, "Loading track...");
        DenonDNS3700.updatePlaybackDisplay();
    }
}

DenonDNS3700.playButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;   
    
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Play Pressed");
        engine.setValue(DenonDNS3700.channel, "play",!(engine.getValue(DenonDNS3700.channel, "play")));
                
    }   
    else {
        DenonDNS3700.debugFlash("Play Released");
        
    }
    DenonDNS3700.updatePlaybackState();
    DenonDNS3700.updatePlaybackDisplay();

}

DenonDNS3700.cueButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Cue Pressed");
        

        if (engine.getValue(DenonDNS3700.channel, "vinylcontrol_enabled")) {
            if (DenonDNS3700.playbackState == DenonDNS3700.PlaybackState.Playing){
                

                engine.setValue(DenonDNS3700.channel, "cue_gotoandstop",1);
            }
            else {
                engine.setValue(DenonDNS3700.channel, "cue_default",1);
                
            }

        }
        else {
            engine.setValue(DenonDNS3700.channel, "cue_default",1);
        }

         
    } else {
        // cue button released
        DenonDNS3700.debugFlash("Cue Released");
        engine.setValue(DenonDNS3700.channel, "cue_gotoandstop",1);  
        engine.setValue(DenonDNS3700.channel, "play",0);    

    }
    DenonDNS3700.updatePlaybackState();
    DenonDNS3700.updatePlaybackDisplay();
}


DenonDNS3700.keylockButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Keylock Pressed");
        //DenonDNS3700.debugFlash(engine.getValue(DenonDNS3700.channel, "keylock").toString());
        
        if (engine.getValue(DenonDNS3700.channel, "keylock") === 0 ) {
            engine.setValue(DenonDNS3700.channel, "keylock",1);
            DenonDNS3700.debugFlash("Keylock Enabled");
        }
        else {
            engine.setValue(DenonDNS3700.channel, "keylock",0); 
            DenonDNS3700.debugFlash("Keylock Disabled");
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.autoLoopSetButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("AutoLoopSet Pressed");    
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            DenonDNS3700.commonLedOp(DenonDNS3700.Led.AutoLoopSet,(DenonDNS3700.LedMode.On));
            DenonDNS3700.autoLoopState = DenonDNS3700.AutoLoopState.On;
        }
        else {
            DenonDNS3700.commonLedOp(DenonDNS3700.Led.AutoLoopSet,(DenonDNS3700.LedMode.Off));
            DenonDNS3700.autoLoopState = DenonDNS3700.AutoLoopState.Off;
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.timeButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Time Pressed");    
        
        if (DenonDNS3700.timeDisplayState == DenonDNS3700.TimeDisplayState.Remaining) {
            DenonDNS3700.timeDisplayState = DenonDNS3700.TimeDisplayState.Elapsed;
        }
        else {
            DenonDNS3700.timeDisplayState = DenonDNS3700.TimeDisplayState.Remaining;
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.oneButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("One Pressed");
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.One,(DenonDNS3700.LedMode.On));   
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_1_activate",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_1_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "beatloop_activate",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.twoButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Two Pressed");  
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Two,(DenonDNS3700.LedMode.On));   
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_2_activate",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_2_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "beatloop_activate",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.threeButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Three Pressed"); 
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Three,(DenonDNS3700.LedMode.On));    
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_3_activate",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_3_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "beatloop_activate",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.clr1ButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("CLR1 Pressed"); 
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.One,(DenonDNS3700.LedMode.Off));   
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_1_clear",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_1_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "reloop_toggle",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.clr2ButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("CLR2 Pressed");
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.Two,(DenonDNS3700.LedMode.Off));    
        
        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_2_clear",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_2_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "reloop_toggle",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.clr3ButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("CLR3 Pressed");
        //DenonDNS3700.commonLedOp(DenonDNS3700.Led.Three,(DenonDNS3700.LedMode.Off));    
        DenonDNS3700.commonLedOp(DenonDNS3700.Led.ThreeDimmer,(DenonDNS3700.LedMode.On));   


        if (DenonDNS3700.autoLoopState == DenonDNS3700.AutoLoopState.Off) {
            
            engine.setValue(DenonDNS3700.channel, "hotcue_3_clear",1);
            
        }
        else {
            //engine.setValue(DenonDNS3700.channel, "hotcue_3_activate",1);
            //This feature is unsupported and will be added in mixxx 2.4
            engine.setValue(DenonDNS3700.channel, "reloop_toggle",1); 
        } 

             
    } 
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.fastSearchPlusButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("FS+ Pressed");    
        
        
            
            engine.setValue(DenonDNS3700.channel, "fwd",1);
            
        }
        else {
            DenonDNS3700.debugFlash("FS- Released");  
            engine.setValue(DenonDNS3700.channel, "fwd",0); 
        } 

             
    
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.fastSearchMinusButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("FS- Pressed");    
        
        
            
            engine.setValue(DenonDNS3700.channel, "back",1);
            
        }
        else {
            DenonDNS3700.debugFlash("FS- Released");   
            engine.setValue(DenonDNS3700.channel, "back",0); 
        } 

             
    
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.playlistButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Playlist Pressed");    
        
        engine.setValue('[Master]', 'maximize_library', ! (engine.getValue('[Master]', 'maximize_library')));1
           
            
        } 

             
    
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.ejectButtonPressed = function(channel, control, value) {
    if (DenonDNS3700.isInitializing()) return;
    
    if (DenonDNS3700.playbackState == DenonDNS3700.PlaybackState.Playing
     && DenonDNS3700.trackState == DenonDNS3700.TrackState.Loaded) {
        DenonDNS3700.userFlash("Play Lock");
    } else {
        engine.setValue(DenonDNS3700.channel, "eject", 1);
    }
}

DenonDNS3700.backButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Back Pressed");    
        
        engine.setValue('[Library]', 'MoveFocusForward', 1);
           
            
        } 

             
    
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.pitchBendPlusButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Pitch + Pressed"); 
        //Vinyl control does not allow for pitch bend. Therefor turn vinylcontrol off untill released
        engine.setValue(DenonDNS3700.channel, "vinylcontrol_enabled", false);  
        engine.setValue(DenonDNS3700.channel, "rate_temp_up",1);
           
            
        } 

    else {
        engine.setValue(DenonDNS3700.channel, "rate_temp_up",0);
        //Vinyl control does not allow for pitch bend. Therefor turn vinylcontrol off untill released
        engine.setValue(DenonDNS3700.channel, "vinylcontrol_enabled", DenonDNS3700.DVS);  

    }

             
    
    DenonDNS3700.updatePlaybackDisplay();
}

DenonDNS3700.pitchBendMinusButtonChanged = function(channel, control, value)
{
    if (DenonDNS3700.isInitializing()) return;
   
    if (value == DenonDNS3700.ButtonChange.ButtonPressed) {
        DenonDNS3700.debugFlash("Pitch - Pressed"); 
        //Vinyl control does not allow for pitch bend. Therefor turn vinylcontrol off untill released
        engine.setValue(DenonDNS3700.channel, "vinylcontrol_enabled", false);  
        engine.setValue(DenonDNS3700.channel, "rate_temp_down",1);
           
            
        } 

    else {
        engine.setValue(DenonDNS3700.channel, "rate_temp_down",0);
        //Vinyl control does not allow for pitch bend. Therefor turn vinylcontrol off untill released
        engine.setValue(DenonDNS3700.channel, "vinylcontrol_enabled", DenonDNS3700.DVS);  

    }

             
    
    DenonDNS3700.updatePlaybackDisplay();
}
