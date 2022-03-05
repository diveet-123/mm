function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('Mobilenet', modelLoaed)
}

function modelLoaed()
{
  console.log("Model Loaded")
}

function draw()
{
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult)
}

var previous_result='';

function gotResult(error, result)
{
  if(error)
  {
    console.log(error);
  }

  else
  {
    if(result[0].confidence > 0.5 && previous_result!=result[0].label)
    {
      console.log(result);
      previous_result=result[0].label;
      var synth=window.speechSynthesis
      speech_data='Object detected is -' + result[0].label
      var utterThis=new SpeechSynthesisUtterance (speech_data);
      synth.speak(utterThis);

      document.getElementById("span1").innerHTML=result[0].label;
      document.getElementById("span2").innerHTML=result[0].confidence.toFixed(3);
    } 
  }
}