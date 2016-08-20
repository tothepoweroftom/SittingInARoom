/*
 I AM SITTING IN A ROOM PROTOTYPE



*/
var mic, recorder, soundFile;
var soundFiles = [];
var maxCycles = 4;

var reverb;

var state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {
  createCanvas(400,400);
  background(200);
  fill(0);
  text('Enable mic and press the mouse to begin recording', 20, 20);

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
  
  //Setup an array of soundfiles to store processed samples
  for(var i=0; i<maxCycles; i++){
    soundFiles[i] = new p5.SoundFile();
  }
  
  //Setup reverb
  reverb = new p5.Reverb();
}

function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {

    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255,0,0);
    text('Recording now! Click to stop.', 20, 20);
    state++;
  }

  else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
  
  //Apply reverb 1
    reverb.process(soundFile, 1, 0.5);
    reverb.amp(4); // turn it up!
    background(0,255,0);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
        background(0,255,255);

    //record new file
    recorder.record(soundFiles[0]);
    
    state++;
  }
    else if (state === 3) {
    soundFile.stop();
    recorder.stop();
    text('State 3', 20, 20);
    reverb.process(soundFiles[0], 1, 0.5);
    reverb.amp(4);
        background(255,255,0);

    state++;
  }

  else if (state === 4) {
        background(0,255,0);

    soundFiles[0].play();
        recorder.record(soundFiles[1]);
    state++;
  }
  
  else if (state === 5) {
        background(0,25,0);

    soundFiles[0].stop();
    recorder.stop();
    text('State 5', 20, 20);
    reverb.process(soundFiles[1], 1, 0.5);
    reverb.amp(4);
        background(255,255,0);

    state++;
  }
    else if (state === 6) {
        background(100,255,0);

    soundFiles[1].play();
        recorder.record(soundFiles[2]);
    state++;
  }
    else if (state === 7) {
        background(0,25,255);

    soundFiles[1].stop();
    recorder.stop();
    text('State 7', 20, 20);
    reverb.process(soundFiles[2], 1, 0.2);
    reverb.amp(4);


    state++;
  }
      else if (state === 8) {
        background(100,255,100);

    soundFiles[2].play();
      //  recorder.record(soundFiles[2]);
    state++;
  }
}
