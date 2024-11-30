type rgbColor = {
  r: number;
  g: number;
  b: number;
};

const parseColor = (color: string | null) => {
  if (!color) return;
  let r, g, b;
  if (color.includes("rgb")) {
    let match,
      regex = /\d/g;
    while ((match = regex.exec(color)) !== null) {
      if (typeof r === "undefined") r = +match[0];
      else if (typeof g === "undefined") g = +match[0];
      else if (typeof b === "undefined") r = +match[0];
    }
  } else {
    const hex: string = color
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
      .substring(1);
    const rgbArray = hex.match(/.{2}/g)?.map((x) => parseInt(x, 16));
    if (rgbArray) {
      r = rgbArray[0];
      g = rgbArray[1];
      b = rgbArray[2];
    }
  }
  let colorObj = { r, g, b } as rgbColor;
  return colorObj;
};

function greyscale(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = green = blue = Math.round((red + green + blue) / 3);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function screen(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = 255 - Math.floor(((255 - color.r) * (255 - red)) / 255);
    green = 255 - Math.floor(((255 - color.g) * (255 - green)) / 255);
    blue = 255 - Math.floor(((255 - color.b) * (255 - blue)) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function lighten(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.max(red, color.r);
    green = Math.max(green, color.g);
    blue = Math.max(blue, color.b);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function darken(data: Uint8ClampedArray, color: rgbColor) {
  console.log("darken");
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.min(red, color.r);
    green = Math.min(green, color.g);
    blue = Math.min(blue, color.b);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function colorDodge(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function colorBurn(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function linearDodge(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function linearBurn(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function addition(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.min(red + color.r, 255);
    green = Math.min(green + color.g, 255);
    blue = Math.min(blue + color.g, 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function subtract(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.max(red - color.r, 0);
    green = Math.max(green - color.g, 0);
    blue = Math.max(blue - color.g, 0);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function multiply(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function divide(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor(color.r / red / 255);
    green = Math.floor(color.g / green / 255);
    blue = Math.floor(color.b / blue / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}
function hardLight(data: Uint8ClampedArray, color: rgbColor) {
  blendFunctions["multiply"](data, color);
  blendFunctions["screen"](data, color);

  return data;
}
function softLight(data: Uint8ClampedArray, color: rgbColor) {
  for (let i = 0, idur = data.length; i < idur; i += 4) {
    let red = data[i + 0],
      green = data[i + 1],
      blue = data[i + 2];

    red = Math.floor((color.r * red) / 255);
    green = Math.floor((color.g * green) / 255);
    blue = Math.floor((color.b * blue) / 255);

    data[i + 0] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  return data;
}

const blendFunctions: Record<string, Function> = {
  greyscale,
  screen,
  lighten,
  darken,
  colorDodge,
  colorBurn,
  linearDodge,
  linearBurn,
  addition,
  subtract,
  multiply,
  divide,
  hardLight,
  softLight
};

function paintSelf(Event: Event) {
  const image = Event.target as HTMLImageElement;
  if (image.dataset.painted) return;

  const { width, height } = image;

  const canvas = Object.assign(document.createElement("canvas"), { width, height });
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(image, 0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    const color = parseColor(image.getAttribute("color"));
    const blendmode = image.dataset.blendmode || "";
    const blendmodes = blendmode.split(" ");

    if (color && blendmodes.length) {
      blendmodes.map((mode) => {
        if (mode in blendFunctions) {
          data = blendFunctions[mode](data, color);
        }
      });

      imageData = new ImageData(data, width, height);

      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(imageData, 0, 0);

      image.src = canvas.toDataURL();
      image.dataset.painted = "true";
    }
  }

  canvas.remove();
}
const paintfunction = (image: HTMLImageElement) => {
  image.onload = paintSelf;
};

class Colorizer {
  constructor(target = null) {
    this.target = target || document.documentElement;
    this.observer = new MutationObserver(this.mutationCallback);
  }

  target: HTMLElement;
  observer: MutationObserver;

  mutationCallback(mutations: MutationRecord[]) {
    mutations
      .flatMap(({ target, addedNodes, type }) => {
        if (type === "attributes") return target;
        else return [...addedNodes];
      })
      .filter((image) => image.isConnected && image instanceof HTMLImageElement && image.hasAttribute("color"))
      .map((image) => paintfunction(image as HTMLImageElement));
  }

  start() {
    this.observer.observe(this.target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["color", "blendmode"]
    });
  }
  stop() {
    this.observer.disconnect();
  }
}

var colorizer = new Colorizer();

colorizer.start();
