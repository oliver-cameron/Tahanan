var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "styling.css";
var script1 = document.createElement("script");
script1.src = "thumbnail.js";
document.head.appendChild(script1);
document.head.appendChild(link);

// class TahananElement extends HTMLElement {
//   getAttributeOrDefault(attr) {
//     return this.getAttribute(attr) || this.defaultValues[attr];
//   }
//   attributeChangedCallback(name, oldValue, newValue) {
//     if (oldValue !== newValue) {
//       this.render();
//     }
//   }
//   connectedCallback() {
//     this.render();
//   }
//   createConstructor(){
//     observedAttributes = this.constructor.observedAttributes;
//     parameterString = "constructor(".concat(observedAttributes.join(", ")).concat("){");

//   }
// }
// Define the topbar element using the modern approach
class Topbar extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Clear existing content
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    // Create the inner container
    const container = document.createElement("div");
    container.className = "topbar-inner";

    // Create the logo image
    const img = document.createElement("img");
    img.src = "Tahanan-logo.svg";
    container.appendChild(img);

    // Create the title
    const title = document.createElement("h1");
    title.innerHTML = ("Tahanan / " + this.getAttribute("title"))
      .split("/")
      .join(
        "<span style='color:var(--blue); font-family: objektiv;font-weight: 300;'>/</span>",
      );
    container.appendChild(title);

    // Append the container to the topbar
    this.appendChild(container);
  }
}

class ContentScroll extends HTMLElement {
  static get observedAttributes() {
    return ["imgsrc", "scrollfactor", "title", "content", "imagePlacement"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Clear existing content
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    // Create the inner container
    const container = document.createElement("div");
    container.className = "contentScrollInner";

    // Create the image element
    const imgDiv = document.createElement("div");
    imgDiv.style.width = "100%";
    const img = document.createElement("img");
    img.src = this.getAttribute("imgsrc");
    img.style.objectFit = "fill";
    imgDiv.appendChild(img);

    // Create the content element
    const contentDiv = document.createElement("div");
    contentDiv.style.width = "100%";
    const title = document.createElement("h3");
    title.textContent = this.getAttribute("title");
    const content = document.createElement("p");
    content.textContent = this.getAttribute("content");
    contentDiv.appendChild(title);
    contentDiv.appendChild(content);

    // Create the separator element
    const separator = document.createElement("div");
    separator.className = "separator";

    // Append the image, separator, and content based on imagePlacement
    if (this.getAttribute("imagePlacement") === "left") {
      container.appendChild(imgDiv);
      container.appendChild(separator);
      container.appendChild(contentDiv);
    } else {
      container.appendChild(contentDiv);
      container.appendChild(separator);
      container.appendChild(imgDiv);
    }

    // Append the container to the content scroll
    this.appendChild(container);
  }
}

class Footer extends HTMLElement {}
class BigText extends HTMLElement {
  static get observedAttributes() {
    return ["text", "alignment"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    const container = document.createElement("div");
    container.className = "big-header-container";
    container.style.maxWidth = "75%";
    container.style.position = "relative";
    container.style.top = "0";
    container.style.bottom = "0";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.margin = "30px;";
    container.style.justifyContent = "flex-start";
    container.style.padding = "30px";
    container.style.boxSizing = "border-box";

    const alignment = this.getAttribute("alignment") || "left";
    if (alignment === "right") {
      container.style.right = "0";
    } else {
      container.style.left = "0";
    }

    const text = document.createElement("h1");
    text.textContent = this.getAttribute("text") || "Default Big Header";
    const updateFontSize = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
      text.style.fontSize = `${vw * vh * 0.0001}px`;
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    text.style.whiteSpace = "normal"; // Allow text to wrap
    container.appendChild(text);
    this.appendChild(container);
  }
}

// A carousel element that loops through a list of thumbnails
class Carousel extends HTMLElement {
  // there are no observed attributes, just innnerHTML with thubmnail tags
  connectedCallback() {
    this.render();
  }
  render() {
    let thumbnails = this.innerHTML;
    this.innerHTML = "";
    let carousel = document.createElement("div");
  }
}
// a grid element that displays thumbnails in a grid
class Grid extends HTMLElement {
  static get observedAttributes() {
    return ["columns", "rows", "gap", "width", "height", "contents"];
  }
  constructor() {
    super();
    this.defaultValues = {
      columns: 3,
      rows: 3,
      gap: "10px",
      width: "100%",
      height: "100%",
    };
  }
  getAttributeOrDefault(attr) {
    return this.getAttribute(attr) || this.defaultValues[attr];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  connectedCallback() {
    this.contents = this.innerHTML;
    this.render();
  }
  // scanForThumbnails(element) {
  //   console.log(element);
  //   let returner = [];
  //   while (element.firstChild) {
  //     console.log("hello");
  //     if (element.firstChild.tagName === "tahanan-thumbnail") {
  //       returner.push(element.firstChild);
  //     } else {
  //       returner = returner.concat(this.scanForThumbnails(element.firstChild));
  //     }
  //     element.removeChild(element.firstChild);
  //   }
  //   return returner;
  // }
  render() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    let thumbnails = this.getAttribute("contents");
    console.log(thumbnails);
    const container = document.createElement("div");
    container.className = "grid-container";
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${this.getAttributeOrDefault("columns")}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${this.getAttributeOrDefault("rows")}, 1fr)`;
    container.style.gap = this.getAttributeOrDefault("gap");
    container.style.width = this.getAttributeOrDefault("width");
    container.style.height = this.getAttributeOrDefault("height");

    for (let i = 0; i < thumbnails; i++) {
      const wrapper = document.createElement("div");
      wrapper.style.width = "100%";
      wrapper.style.height = "100%";
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "center";
      wrapper.appendChild(thumbnails[i]);
      container.appendChild(wrapper);
    }
    this.appendChild(container);
  }
}

// tahanan-loader
// class Loader extends HTMLElement{
//   connectedCallback(){
//     this.render();
//   }
//   // no attributes, so no need for attributeChangedCallback, or refreshing the render
//   render(){
//     let loader
//   }
// }

customElements.define("big-header", BigText);
// Register the custom elements
customElements.define("tahanan-topbar", Topbar);
customElements.define("tahanan-content-scroll", ContentScroll);
customElements.define("tahanan-footer", Footer);
customElements.define("tahanan-carousel", Carousel);
customElements.define("tahanan-grid", Grid);
function addAllElements() {
  // Elements are already in the DOM, no need to append them again
  document.querySelectorAll("tahanan-content-scroll").forEach((element) => {
    element.render();
  });
}

// Check if the document is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addAllElements);
} else {
  addAllElements();
}
