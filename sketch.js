let bodyPose;
let video;
let poses = [];
let connections;
let painting;



function preload() {
  // Carga bodyPose modelo
  // Flipped: true solo para efecto espejo
  //handPose = ml5.handPose({ flipped: true });
  bodyPose = ml5.bodyPose({flipped:true});
}

function mousePressed() {
  console.log(poses);
}

function keyPressed() {
  if (key === 'z') {
    painting.clear();
  }
  if (key === 's') {
    save(painting, 'mi_dibujo.png');
            }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();
    video = createCapture(VIDEO, {flipped:true});
    video.size(windowWidth, windowHeight);
    video.hide();
    bodyPose.detectStart(video, gotPoses);
    connections = bodyPose.getSkeleton();
    
  }

  
function gotPoses(results) {
  
  poses = results;
}



function draw() {
  image(video, 0, 0, width, height);

  if (poses.length > 0) {

    //nariz
    let pose = poses[0];
    let nose = pose.keypoints[0]; // la nariz
    if (nose.confidence > 0.5) {
      // Generar color aleatorio
      let r = random(255);
      let g = random(255);
      let b = random(255);

      painting.fill(r, g, b);
      painting.stroke(0);
      painting.strokeWeight(2);
      painting.textSize(30);
      painting.text("Esto no es una nariz", nose.x, nose.y);
      painting.noStroke();

    }
    
  }

  
  // cuadro izquierda arriba
  painting.fill(0, 0, 255, 0.5);
  //painting.rect(0, 0, width/2, height/2);
  
  // cuadro abajo derecha
  painting.fill(0, 255, 0, 0.5);
  //painting.rect(0, height/2, width/2, height/2);

  // cuadro abajo izquierda
  painting.fill(255, 255, 0, 0.5);
  // painting.rect(width/2, height/2, width/2, height/2);
  

  // Mostrar el video, si lo comentamos se hace una retroalimentación
  image(video, 0, 0, width, height);

    
       // aquí colocamos la capa para dibujar hecha con createGraphics
       image(painting, 0, 0); 
      }
      

function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();
      }
      
