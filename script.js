const canvas = document.getElementById("canvas");
const newArt = document.getElementById("newArt");
const paletteBox1 = document.getElementById("palette-wrapper-1");
const paletteBox2 = document.getElementById("palette-wrapper-2");
const paletteBox3 = document.getElementById("palette-wrapper-3");
const colorPalettes = [
  // pinky:
  ["916953", "cf8e80", "fcb5b5", "fcddf2", "faf6f6"],
  // FG greenish:
  ["4b7f52", "7dd181", "96e8bc", "b6f9c9", "c9ffe2"],
  // BG darker:
  ["321325", "5f0f40", "9a031e", "1b4353", "0d2818"],
  // FG yellow/orange/red
  ["ffba08", "faa307", "f48c06", "e85d04", "dc2f02"],
  // BG homogeneous green/purple-ish
  ["006466", "065a60", "0b525b", "144552", "1b3a4b"],
  // FG? light blue
  ["d7e3fc", "ccdbfd", "c1d3fe", "b6ccfe", "abc4ff"],
  // BG? dark blue
  ["03045e", "191e6f", "2f3880", "455391", "5b6da2"],
];

let colorPalette1 = [];
let colorPalette2 = [];
let colorPalette3 = [];

// newArt.style.position = "absolute";
newArt.disabled = true;

const generateArt = () => {
  newArt.disabled = true;
  newArt.style.color = "rgb(114, 114, 114)";

  // randomizing the color palettes
  for (let i = 0; i < colorPalettes.length; i++) {
    let z = Math.floor(Math.random() * colorPalettes.length);
    [colorPalettes[i], colorPalettes[z]] = [colorPalettes[z], colorPalettes[i]];
  }

  // skipping the palette assignment if the palette box is "locked"...
  // ...otherwise, assigning a random palette

  if (!paletteBox1.classList.contains("palette-locked")) {
    colorPalette1 = colorPalettes[0];
  }
  if (!paletteBox2.classList.contains("palette-locked")) {
    colorPalette2 = colorPalettes[1];
  }
  if (!paletteBox3.classList.contains("palette-locked")) {
    colorPalette3 = colorPalettes[2];
  }

  // displaying the palettes on screen

  // 1st palette
  paletteBox1.innerHTML = "";
  colorPalette1.map((color) => {
    let colorBox = document.createElement("div");
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.backgroundColor = `#${color}`;
    paletteBox1.appendChild(colorBox);
  });

  // 2nd palette
  paletteBox2.innerHTML = "";
  colorPalette2.forEach((color) => {
    let colorBox = document.createElement("div");
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.backgroundColor = `#${color}`;
    paletteBox2.appendChild(colorBox);
  });

  // 3nd palette
  paletteBox3.innerHTML = "";
  colorPalette3.forEach((color) => {
    let colorBox = document.createElement("div");
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.backgroundColor = `#${color}`;
    paletteBox3.appendChild(colorBox);
  });
  

  const coinFlip = () => {
    return Math.floor(Math.random() * 2) % 2 === 0 ? true : false;
  };

  //================== LOOP 1 ==================//

  // let's make some SVGs
  const loop1 = () => {
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", "100%");
    svg1.setAttribute("height", "100%");

    let y = 800;
    let yStart = y - (Math.floor(Math.random() * 60) + 70);
    let randomColor = Math.floor(Math.random() * 5);

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute("d", "M 0 0 V 800 H 1600 V 0 z");
    path1.setAttribute("style", `fill: #${colorPalette1[randomColor]}`);
    svg1.appendChild(path1);

    for (let q = 0; q <= 7; q++) {
      let path = `M 0 0 L 0 ${yStart} `;
      let newPath = "";

      let pathPoints = Math.floor(Math.random() * 10) + 10;
      let x = 0;
      let y1 = yStart;

      for (let z = 0; z <= pathPoints; z++) {
        let x1 = x + Math.floor(Math.random() * (750 / pathPoints) + (1600 / pathPoints - 375 / pathPoints));
        if (x1 > 1600) x1 = 1600;
        newPath = path.concat(`L ${x1} ${y1} `);
        x = x1;
        coinFlip() ? (y1 += Math.floor(Math.random() * 20) + 10) : (y1 -= Math.floor(Math.random() * 20) + 10);
        path = newPath;
      }

      yStart = yStart - (Math.floor(Math.random() * 60) + 70);

      newPath = path.concat(`V 0 z`);
      console.log(`"d", "${newPath}"`);

      randomColor = Math.floor(Math.random() * 5);
      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", `${newPath}`);
      path2.setAttribute("style", `fill: #${colorPalette1[randomColor]}`);
      svg1.appendChild(path2);
    }

    canvas.appendChild(svg1);

    loop2();
  };

    //================== LOOP 2 ==================//

    const loop2 = () => {
      // picking the 1st cluster point
      let clusterX = Math.floor(Math.random() * 100);
      let clusterY = Math.floor(Math.random() * 100);
  
      // setting the default position/dimensions for the first box in the loop
      let previousTopPosition = 50;
      let previousLeftPosition = 50;
      let previousHeight = 0;
      let previousWidth = 0;

      // creating 10 random boxes
      let boxCount = 0;
      // using a setInterval loop to display them one at a time
      let boxCreation = setInterval(() => {
        boxCount++;
        if (boxCount === 50) {
          clearInterval(boxCreation);
          loop3();
        }
  
        // creating a (semi) random coefficient based on how far along in the loop we are
        let loopCoef = (100 / (boxCount + 166)) * (Math.random() + 0.5);
        // console.log(loopCoef);
        let div = document.createElement("div");
        div.setAttribute("class", "bgBox");
        div.style.position = "absolute";
  
        // randomizing size and position (based on the previous box)
        let topPosition = coinFlip() ? previousTopPosition + previousHeight : previousTopPosition - previousHeight;
        div.style.top = `${topPosition}%`;
        let leftPosition = coinFlip() ? previousLeftPosition + previousWidth : previousLeftPosition - previousWidth;
        div.style.left = `${leftPosition}%`;
        divHeight = Math.sqrt(Math.abs(topPosition - clusterY)) * (7 + Math.floor(Math.random() * 4)) * loopCoef;
        div.style.height = `${divHeight}rem`;
        let divWidth = Math.sqrt(Math.abs(leftPosition - clusterX)) * (7 + Math.floor(Math.random() * 4)) * loopCoef;
        div.style.width = `${divWidth}rem`;
        div.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg`;
  
        // picking a color
        let color = colorPalette2[Math.floor(Math.random() * 4.99999)];
        div.style.backgroundColor = `#${color}`;
  
        // appending it to the canvas
        canvas.appendChild(div);

        // setting the "previous" positions to be used by the next box in the loop
        previousTopPosition = topPosition;
        previousLeftPosition = leftPosition;
        previousHeight = divHeight;
        previousWidth = divWidth;
      }, 10);
    };

  //================== LOOP 3 ==================//

  const loop3 = () => {
    // placing the 2nd cluster point
    clusterX = Math.floor(Math.random() * 100);
    clusterY = Math.floor(Math.random() * 100);

    // setting the default position/dimensions for the first box in the loop
    let previousTopPosition = 50;
    let previousLeftPosition = 50;
    let previousHeight = 0;
    let previousWidth = 0;

    // creating another 300 boxes
    boxCount = 0;
    let boxCreation2 = setInterval(() => {
      boxCount++;
      if (boxCount === 300) {
        // enabling the "New Art" button after the loop is finished and the artwork is done
        newArt.disabled = false;
        newArt.style.color = "white";
        clearInterval(boxCreation2);
      }
      let loopCoef = (33 / (150 + 33)) * (Math.random() + 0.5);
      let div = document.createElement("div");
      div.setAttribute("class", "bgBox");
      div.style.position = "absolute";

      // randomizing size and position (based on the previous box)
      let topPosition = coinFlip() ? previousTopPosition + previousHeight : previousTopPosition - previousHeight;
      div.style.top = `${topPosition}%`;
      let leftPosition = coinFlip() ? previousLeftPosition + previousWidth : previousLeftPosition - previousWidth;
      div.style.left = `${leftPosition}%`;
      divHeight = Math.sqrt(Math.abs(topPosition - clusterY)) * (7 + Math.floor(Math.random() * 4)) * loopCoef;
      div.style.height = `${divHeight}rem`;
      let divWidth = Math.sqrt(Math.abs(leftPosition - clusterX)) * (7 + Math.floor(Math.random() * 4)) * loopCoef;
      div.style.width = `${divWidth}rem`;
      div.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg`;

      // picking a color
      let color = colorPalette3[Math.floor(Math.random() * 4.99999)];
      div.style.backgroundColor = `#${color}`;

      // appending it to the canvas
      canvas.appendChild(div);

      // setting the "previous" positions to be used by the next box in the loop
      previousTopPosition = topPosition;
      previousLeftPosition = leftPosition;
      previousHeight = divHeight;
      previousWidth = divWidth;
    }, 10);
  };

  // call to initiate the first loop and start the whole process
  loop1();
};

const cleanUp = () => {
  // removing all the created div boxes from the canvas
  while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
  generateArt();
};

const lockPalette = (ev) => {
  console.log("TARGET:", ev.currentTarget.id);
  let target = document.getElementById(ev.currentTarget.id);
  target.classList.toggle("palette-locked");
};

generateArt();

newArt.addEventListener("click", cleanUp);
paletteBox1.addEventListener("click", lockPalette);
paletteBox2.addEventListener("click", lockPalette);
paletteBox3.addEventListener("click", lockPalette);
