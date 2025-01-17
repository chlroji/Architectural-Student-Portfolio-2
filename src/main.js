import { data } from "./data/data.js";
import { createThreeScene } from "./threeScene.js";

document.getElementById("name").textContent = data.name;
document.getElementById("bio").textContent = data.bio;

const linksContainer = document.getElementById("links");
Object.keys(data.contact).forEach((key) => {
  const link = document.createElement("a");
  link.href = data.contact[key];
  link.target = "_blank";
  link.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  linksContainer.appendChild(link);
});

function populateModelButtons() {
  const modelPaths = [
    { path: "3d_models/project1/model.obj", label: "PHANTASMA" },
    { path: "3d_models/project2/model.obj", label: "ICE-BURG" },
    { path: "3d_models/project3/model.obj", label: "TOWARDS SUSTAINABLE URBAN FUTURES" },
  ];

  const controls = document.getElementById("controls");

  modelPaths.forEach((model, index) => {
    const button = document.createElement("button");
    button.className = "project-btn";
    button.textContent = model.label;
    button.onclick = () => changePictures(index);
    controls.appendChild(button);
  });
}

function changePictures(index) {
  const imageSets = [
    [
      "cube_drawings/phantasma1.png",
      "cube_drawings/phantasma2.png",
    ],
    [
      "cube_drawings/iceburg1.png",
      "cube_drawings/iceburg2.png",
    ],
    [
      "cube_drawings/airdrie1.png",
      "cube_drawings/airdrie2.png",
      "cube_drawings/airdrie3.png",
      "cube_drawings/airdrie4.png",
    ],
  ];

  const container = document.querySelector("#drawings-container");

  container.style.opacity = "0";

  setTimeout(() => {

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    imageSets[index].forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      
      img.onload = () => img.classList.add("loaded");

      container.appendChild(img);
    });

    container.style.opacity = "1";
  }, 500);
}

populateModelButtons();
