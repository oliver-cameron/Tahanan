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
      banner: "&nbsp;",
      primaryLink: "#",
      primaryThumbnail: "Primary",
      secondaryLink: "#",
      secondaryThumbnail: "Secondary",
      thumbnailColor: "--black",
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
    overlay.style.width = "100%";
    overlay.style.height = "100%";

    const verticalHug = this.getAttributeOrDefault("verticalhug");
    overlay.classList.add(`vertical-${verticalHug}`);
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

    const textContainer = document.createElement("div");
    textContainer.className = "thumbnail-text-container";
    textContainer.style.display = "flex";
    textContainer.style.flexDirection = "column";

    const horizontalHug = this.getAttributeOrDefault("horizontalhug");
textContainer.style.left = "50%";
textContainer.style.left = "50%";
    textContainer.style.left = "50%";
    switch (horizontalHug) {
      case "left":
        textContainer.style.transform = "translateX(-100%)";
        textContainer.style.alignItems = "flex-start";
        break;
      case "right":
        textContainer.style.transform = "translateX(0)";
        textContainer.style.alignItems = "flex-end";
        break;
      case "center":
        textContainer.style.transform = "translateX(-50%)";
        textContainer.style.alignItems = "center";
      default:
        break;
    }

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

    const primaryThumbnailText = this.getAttribute("primaryThumbnail");
    if (primaryThumbnailText) {
      const primaryThumbnail = document.createElement("a");
      primaryThumbnail.className = "thumbnail-link";
      primaryThumbnail.href = this.getAttributeOrDefault("primaryLink");
      // primaryThumbnail.style.display = "flex"; // Make it match flex properties
      // primaryThumbnail.style.alignItems = "center"; // Center alignment like secondary
      // primaryThumbnail.style.justifyContent = "center";
      // primaryThumbnail.style.height = "100%"; // Ensure it stretches based on content

      // Get font size and color
      const fontSize = this.getAttributeOrDefault("bodySize");
      const thumbnailColor = this.getAttributeOrDefault("thumbnailColor");

      // Create SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.display = "block"; // Prevent extra spacing
      svg.setAttribute("width", "100");
      svg.setAttribute("height", "50");
      svg.setAttribute("viewBox", "0 0 100 50");

      // Create defs and mask
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs",
      );
      const mask = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "mask",
      );
      mask.setAttribute("id", "cutout-mask");

      // Background for mask
      const maskBackground = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      maskBackground.setAttribute("width", "100%");
      maskBackground.setAttribute("height", "100%");
      maskBackground.setAttribute("fill", "white");

      // Text Mask (cutout effect)
      const textMask = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      textMask.setAttribute("x", "50%");
      textMask.setAttribute("y", "50%");
      textMask.setAttribute("dominant-baseline", "middle");
      textMask.setAttribute("text-anchor", "middle");
      textMask.setAttribute("font-size", fontSize);
      textMask.setAttribute("fill", "black"); // Black makes it transparent in the mask
      textMask.textContent = primaryThumbnailText;

      mask.appendChild(maskBackground);
      mask.appendChild(textMask);
      defs.appendChild(mask);
      svg.appendChild(defs);

      // Background rect (thumbnail color)
      const bgRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      bgRect.setAttribute("width", "100%");
      bgRect.setAttribute("height", "100%");
      bgRect.setAttribute("fill", thumbnailColor); // Use thumbnail color
      bgRect.setAttribute("mask", "url(#cutout-mask)");

      svg.appendChild(bgRect);
      const svgWrapper = document.createElement("div");
      svgWrapper.style.width = "100%";
      svgWrapper.style.height = "fit-content";
      svgWrapper.style.display = "block";
      svgWrapper.style.margin = "auto";
      svgWrapper.appendChild(svg);
      primaryThumbnail.appendChild(svgWrapper);
      linkContainer.appendChild(primaryThumbnail);

      // Function to update size dynamically
      function updateSvgSize() {
        requestAnimationFrame(() => {
          let textBounds = textMask.getBBox();

          let padBounds = {
            width: textBounds.width + 6,
            height: textBounds.height + 6,
          };

          svg.setAttribute("width", padBounds.width);
          svg.setAttribute("height", padBounds.height);
          svg.setAttribute(
            "viewBox",
            `0 0 ${padBounds.width} ${padBounds.height}`,
          );

          primaryThumbnail.style.height = `${padBounds.height}px`;
        });
      }

      // Ensure correct size after fonts load
      document.fonts.ready.then(updateSvgSize);
      window.addEventListener("resize", updateSvgSize);
    }

    const secondaryThumbnail = this.getAttribute("secondaryThumbnail");
    if (secondaryThumbnail) {
      const secondaryLink = document.createElement("a");
      secondaryLink.className = "thumbnail-link";
      secondaryLink.href = this.getAttributeOrDefault("secondaryLink");
      secondaryLink.innerHTML = `<p class="secondaryThumbnail" style="--color:${this.getAttributeOrDefault("thumbnailColor")}; font-size:${this.getAttributeOrDefault("bodySize")}">${secondaryThumbnail}</p>`;
      linkContainer.appendChild(secondaryLink);
    }

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
customElements.define("tahanan-thumbnail", Thumbnail);
