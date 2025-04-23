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

function setup() {
  // lienzo de pantalla
  createCanvas(windowWidth, windowHeight);

  // creamos una capa para gráficos con dimensión de pantalla
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();
    // Crea el video y lo esconde
    // Flipped true solo para tener efecto espejo
    video = createCapture(VIDEO, {flipped:true});
    video.size(windowWidth, windowHeight);
    video.hide();
    // Comienza a detectar poses en la webcam de video
    bodyPose.detectStart(video, gotPoses);
    // Toma la información de conexión del esqueleto
    connections = bodyPose.getSkeleton();
    
  }

  // función de llamado para cuando el modelo retgresa datos de pose
function gotPoses(results) {
  // Guarda el resultado del modelo en una variable global
  poses = results;
}



function draw() {
  image(video, 0, 0, width, height);

  if (poses.length > 0) {

    //nariz
    let pose = poses[0];
    let nose = pose.keypoints[0]; // índice 0 es la nariz
    if (nose.confidence > 0.5) {
      // Generar color aleatorio
      let r = random(255);
      let g = random(255);
      let b = random(255);

      painting.fill(r,g,b);
      painting.textSize(40);
      painting.text("BOMBADRILO COCODRILO", nose.x, nose.y);
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

function windowsResized(){
  resizedCanvas(windowWidth, windowHeight);
}
