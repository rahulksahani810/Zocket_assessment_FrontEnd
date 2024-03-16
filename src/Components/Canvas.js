class Canvas {
  constructor(canvasRef, templateData, backgroundColor, selectedImage) {
    this.canvasRef = canvasRef;
    this.templateData = templateData;
    this.backgroundColor = backgroundColor;
    this.selectedImage = selectedImage;
  }

  renderCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Background color
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Design pattern
    const designPattern = new Image();
    designPattern.src = this.templateData.urls.design_pattern;
    designPattern.onload = () => {
      ctx.drawImage(designPattern, 0, 0, canvas.width, canvas.height);

      // Mask
      const mask = new Image();
      mask.src = this.templateData.urls.mask;
      mask.onload = () => {
        ctx.drawImage(mask, this.templateData.image_mask.x, this.templateData.image_mask.y, this.templateData.image_mask.width, this.templateData.image_mask.height);

        // Mask stroke
        const maskStroke = new Image();
        maskStroke.src = this.templateData.urls.stroke;
        maskStroke.onload = () => {
          ctx.drawImage(maskStroke, this.templateData.image_mask.x, this.templateData.image_mask.y, this.templateData.image_mask.width, this.templateData.image_mask.height);

          if (this.selectedImage) {
            ctx.drawImage(this.selectedImage, this.templateData.image_mask.x, this.templateData.image_mask.y, this.templateData.image_mask.width, this.templateData.image_mask.height);

            // Caption
            ctx.font = `${this.templateData.caption.font_size}px Arial`;
            ctx.fillStyle = this.templateData.caption.text_color;
            ctx.textAlign = this.templateData.caption.alignment;
            const captionLines = this.wrapText(ctx, this.templateData.caption.text, this.templateData.caption.max_characters_per_line);
            captionLines.forEach((line, index) => {
              ctx.fillText(line, this.templateData.caption.position.x, this.templateData.caption.position.y + (index * this.templateData.caption.font_size));
            });

            // Button
            const ctaWidth = 200;
            const ctaHeight = 60;
            const ctaRadius = 10; 
            ctx.fillStyle = this.templateData.cta.background_color || '#4287f5';
            ctx.strokeStyle = this.templateData.cta.text_color || '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            this.drawRoundedRect(ctx, this.templateData.cta.position.x, this.templateData.cta.position.y, ctaWidth, ctaHeight, ctaRadius);
            ctx.font = `${this.templateData.cta.font_size || 30}px Arial`;
            ctx.fillStyle = this.templateData.cta.text_color || '#FFFFFF';
            ctx.textAlign = 'center';

            const ctaText = this.wrapCTAText(ctx, this.templateData.cta.text, this.templateData.cta.max_characters_per_line);
            ctaText.forEach((line, index) => {
              ctx.fillText(line, this.templateData.cta.position.x + ctaWidth / 2, this.templateData.cta.position.y + ctaHeight / 3 + 10 + (index * this.templateData.cta.font_size));
            });
          } else {
            ctx.font = `${this.templateData.caption.font_size}px Arial`;
            ctx.fillStyle = this.templateData.caption.text_color;
            ctx.textAlign = this.templateData.caption.alignment;
            const defaultCaptionLines = this.wrapText(ctx, this.templateData.caption.text, this.templateData.caption.max_characters_per_line);
            defaultCaptionLines.forEach((line, index) => {
              ctx.fillText(line, this.templateData.caption.position.x, this.templateData.caption.position.y + (index * this.templateData.caption.font_size));
            });

            const ctaWidth = 200;
            const ctaHeight = 60;
            const ctaRadius = 10; 
            ctx.fillStyle = this.templateData.cta.background_color || '#4287f5';
            ctx.strokeStyle = this.templateData.cta.text_color || '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            this.drawRoundedRect(ctx, this.templateData.cta.position.x, this.templateData.cta.position.y, ctaWidth, ctaHeight, ctaRadius);
            ctx.font = `${this.templateData.cta.font_size || 30}px Arial`;
            ctx.fillStyle = this.templateData.cta.text_color || '#FFFFFF';
            ctx.textAlign = 'center';

            const ctaText = this.wrapCTAText(ctx, this.templateData.cta.text, this.templateData.cta.max_characters_per_line);
            ctaText.forEach((line, index) => {
              ctx.fillText(line, this.templateData.cta.position.x + ctaWidth / 2, this.templateData.cta.position.y + ctaHeight / 3 + 10 + (index * this.templateData.cta.font_size));
            });
          }
        };
      };
    };
  }

  wrapText(ctx, text, maxCharactersPerLine) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(`${currentLine} ${word}`).width;
      if (width < maxCharactersPerLine * ctx.measureText('A').width) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  wrapCTAText(ctx, text, maxCharactersPerLine) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(`${currentLine} ${word}`).width * 2;
      if (width < maxCharactersPerLine * ctx.measureText('A').width) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

export default Canvas;
