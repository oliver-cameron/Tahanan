var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "styling.css";
document.head.appendChild(link);

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

class Thumbnail extends HTMLElement {
  static get observedAttributes() {
    return [
      "imageSrc",
      "header",
      "subHeader",
      "banner",
      "primaryLink",
      "primaryThumbnail",
      "secondaryLink",
      "secondaryThumbnail",
      "thumbnailColor",
      "bodySize",
      "titleSize",
      "bannerSize",
      "horizontalhug",
      "verticalhug",
    ];
  }

  constructor() {
    super();
    this.defaultValues = {
      imageSrc: "default-image.jpg",
      header: "Default Header",
      subHeader: "Default SubHeader",
      banner: "&nbsp",
      primaryLink: "#",
      primaryThumbnail: "Primary",
      secondaryLink: "#",
      secondaryThumbnail: "Secondary",
      thumbnailColor: "#000000",
      bodySize: "20px",
      titleSize: "24px",
      bannerSize: "16px",
      horizontalhug: "center",
      verticalhug: "center",
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
    this.render();
  }

  render() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    const container = document.createElement("div");
    container.className = "thumbnail-container";

    const overlay = document.createElement("div");
    overlay.className = "thumbnail-overlay";
    overlay.style.display = "flex";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";

    // Map verticalHug values to justify-content values
    const verticalHug = this.getAttributeOrDefault("verticalhug");
    switch (verticalHug) {
      case "top":
        overlay.style.justifyContent = "flex-start";
        break;
      case "bottom":
        overlay.style.justifyContent = "flex-end";
        break;
      case "center":
      default:
        overlay.style.justifyContent = "center";
        break;
    }

    // Map horizontalHug values to align-items values
    const horizontalHug = this.getAttributeOrDefault("horizontalhug");
    switch (horizontalHug) {
      case "left":
        overlay.style.alignItems = "flex-start";
        break;
      case "right":
        overlay.style.alignItems = "flex-end";
        break;
      case "center":
      default:
        overlay.style.alignItems = "center";
        break;
    }

    const textContainer = document.createElement("div");
    textContainer.className = "thumbnail-text-container";
    textContainer.style.display = "flex";
    textContainer.style.flexDirection = "column";

    const img = document.createElement("img");
    img.className = "thumbnail-image";
    img.src = this.getAttributeOrDefault("imageSrc");

    const header = document.createElement("h3");
    header.textContent = this.getAttributeOrDefault("header");
    header.style.fontSize = this.getAttributeOrDefault("titleSize");

    const subHeader = document.createElement("p");
    subHeader.textContent = this.getAttributeOrDefault("subHeader");
    subHeader.style.fontSize = this.getAttributeOrDefault("bodySize");

    const banner = document.createElement("p");
    banner.textContent = this.getAttributeOrDefault("banner");
    banner.style.color = "var(--yellow)";
    banner.style.fontSize = this.getAttributeOrDefault("bannerSize");

    const linkContainer = document.createElement("div");
    linkContainer.className = "thumbnail-link-container";

    const primaryLink = document.createElement("a");
    primaryLink.className = "thumbnail-link";
    primaryLink.href = this.getAttributeOrDefault("primaryLink");
    primaryLink.innerHTML = `<p class="primaryThumbnail" style="--color:${this.getAttributeOrDefault("thumbnailColor")}; font-size:${this.getAttributeOrDefault("bodySize")}">${this.getAttributeOrDefault("primaryThumbnail")}<p>`;

    const secondaryLink = document.createElement("a");
    secondaryLink.className = "thumbnail-link";
    secondaryLink.href = this.getAttributeOrDefault("secondaryLink");
    secondaryLink.innerHTML = `<p class="secondaryThumbnail" style="--color:${this.getAttributeOrDefault("thumbnailColor")}; font-size:${this.getAttributeOrDefault("bodySize")}">${this.getAttributeOrDefault("secondaryThumbnail")}<p>`;

    linkContainer.appendChild(primaryLink);
    linkContainer.appendChild(secondaryLink);

    textContainer.appendChild(banner);
    textContainer.appendChild(header);
    textContainer.appendChild(subHeader);
    textContainer.appendChild(linkContainer);

    overlay.appendChild(textContainer);
    container.appendChild(img);
    container.appendChild(overlay);

    this.appendChild(container);
  }
}

// Register the custom elements
customElements.define("tahanan-topbar", Topbar);
customElements.define("tahanan-content-scroll", ContentScroll);
customElements.define("tahanan-footer", Footer);
customElements.define("tahanan-thumbnail", Thumbnail);

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
