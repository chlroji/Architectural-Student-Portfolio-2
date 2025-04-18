import { data } from "./data/data.js";
import { createThreeScene } from "./threeScene.js";

// Set name and bio
document.getElementById("name").textContent = data.name;
document.getElementById("bio").textContent = data.bio;

// Create contact links
const linksContainer = document.getElementById("links");
Object.keys(data.contact).forEach((key) => {
  const link = document.createElement("a");
  link.href = data.contact[key];
  link.target = "_blank";
  link.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  linksContainer.appendChild(link);
});

// Load model buttons and gallery
function populateModelButtons() {
  const modelPaths = [
    { 
      path: "3d_models/project1/model.obj", 
      label: "GAME ENGINES", 
      description: "The overall design of the gallery was to evoke a sense of ethereal holiness, using scale and gothic-futuristic elements like cybersigilism into the space. The original studio design was from a concept of religion and cult-like beliefs, so I wanted the space to reflect that tone.",
      images: ["cube_drawings/game1.png", "cube_drawings/game2.png", "cube_drawings/game3.png", "cube_drawings/game4.png"]
    },
    { 
      path: "3d_models/project2/model.obj", 
      label: "PLACEMAKING", 
      description: "We wanted to create a pavilion that reflects the two different identities and navigating them as an outsider. Upon first glance the pavilion is larger than life, flaunting an intricate and colorful facade. However, it is only when the observer comes in close and navigates through the pavilion’s corridors when they finally see the inner monument The secret garden and fountain represents the inner world we nurture and protect, a space of authenticity, emotion, and growth. The contrast between the protective “shell” and the organic, flourishing interior encourages obseervers to reflect on the identities we present to the world and our deeper selves, and their role as an outsider to be stewards in these vulnerable spaces.",
      images: ["cube_drawings/pavilion1.png", "cube_drawings/pavilion2.png", "cube_drawings/pavilion3.png", "cube_drawings/pavilion4.png"]
    },
    { 
      path: "3d_models/project3/model.obj", 
      label: "OBJECT DESIGN", 
      description: "This headpiece, based on the concept of identity as a form of protection in my Cadavre Exquis, is used as a way to set physical boundaries from others while simultaneously being used as a fashion statement. The “legs” of the headpiece reach out and away from the face, acting as a physical barrier to those who want to come in close and invade private space. This headpiece connects magnetically to my glasses, acting as a personal protector from people who cross physical boundaries.",
      images: ["cube_drawings/object1.png", "cube_drawings/object2.png", "cube_drawings/object3.png", "cube_drawings/object4.png"]
    },
    { 
      path: "3d_models/project3/model.obj", 
      label: "INTEROPERABILITY", 
      description: "During the project, I was working on designs for the parametric fashion studio and with the SurfaceMorph command on Grasshopper and the Rebuild command on Rhino, I was able to create fashion pieces that flowed along the person figure’s body. Using meshes to project my design on a surface would have been problematic, as instead of having a drape effect, the pattern I am projecting will have noticeable flat faces. To remedy that I would either have to increase the poly count of the mesh (which is dangerous for my laptop, considering how heavy Grasshopper already is), or convert the surface to NURBS or SubD.",
      images: ["cube_drawings/interop1.png", "cube_drawings/interop2.png", "cube_drawings/interop3.png", "cube_drawings/interop4.png"]
    },
    { 
      path: "3d_models/project3/model.obj", 
      label: "CADAVRE EXQUIS", 
      description: "THE FORTRESS I BUILD is an exploration into the self built for others and its separation from the true self. The identity built for others - interests, appearance, how to act - is carefully curated to fit with societal norms, to build relationships, without flaws or vulnerability. The self behind this fortress is never shown to the world; free from judging eyes. For everyone it is different how much they show their raw, authentic selves, or how much they leave them behind closed doors. This exquisite corpse was created with a RISO print style: an amalgamation of elements overlapping, surrounding and protecting the true self from the outside world. This exquisite corpse became a self-portrait that explores my true self - how much of my identity is influenced by current trends? What does it take to take down the fortress and be vulnerable to the world?",
      images: ["cube_drawings/corpse.png", "cube_drawings/corpse2.png", "cube_drawings/corpse3.png"]
    }
  ];

  const controls = document.getElementById("controls");

  modelPaths.forEach((model, index) => {
    const button = document.createElement("button");
    button.className = "project-btn";
    button.textContent = model.label;
    
    button.onclick = () => {
      loadModel(model.path); // Load 3D model
      updateGallery(model.images, model.description); // Update images & description
    };
    
    controls.appendChild(button);
  });
}

function updateGallery(images, description) {
  const container = document.querySelector("#drawings-container");
  const descriptionBox = document.querySelector("#description-box");

  container.style.opacity = "0";
  descriptionBox.style.opacity = "0";

  setTimeout(() => {
    container.innerHTML = ""; // Clear previous images

    images.forEach((src) => {
      const anchor = document.createElement("a");
      anchor.href = src;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = src;
      img.onload = () => img.classList.add("loaded");
      anchor.appendChild(img);
      container.appendChild(anchor);
    });

    descriptionBox.textContent = description;
    container.style.opacity = "1";
    descriptionBox.style.opacity = "1";
  }, 500);
}

function loadModel(modelPath) {
  const container = document.querySelector("#model-container");
  container.innerHTML = ""; // Clear previous model
  createThreeScene("#model-container", modelPath); // Ensure this matches your threeScene.js setup
}

// Initialize
populateModelButtons();