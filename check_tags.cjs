
const fs = require('fs');
const content = fs.readFileSync('src/views/CatalogView.tsx', 'utf8');

function getLineNumber(index) {
  return content.substring(0, index).split('\n').length;
}

let stack = [];
let regex = /<(\/?[a-zA-Z0-9.]*)(\s+[^>]*?)?(\/?)>/g;
let match;

const ignoreTags = ['string', 'number', 'boolean', 'Product', 'SupplierPartner', 'CategoryId', 'GalleryItem', 'GalleryStatus', 'UserProfile', 'VideoTestimonial', 'CatalogViewProps', 'NavTab', 'QuoteItem', 'any'];

while ((match = regex.exec(content)) !== null) {
  let tag = match[1];
  let isClosing = tag.startsWith('/');
  let tagName = isClosing ? tag.substring(1) : tag;
  
  // Fragment support
  if (tagName === '') tagName = 'FRAGMENT';

  let isSelfClosing = match[3] === '/' || ['img', 'input', 'br', 'hr', 'link', 'meta', 'textarea'].includes(tagName.toLowerCase());

  if (ignoreTags.includes(tagName) || tagName.includes('[') || tagName.includes('<')) continue;
  if (isSelfClosing) continue;

  if (isClosing) {
    let openingTag = stack.pop();
    if (openingTag !== tagName) {
      console.log(`Mismatch at line ${getLineNumber(match.index)}: expected </${openingTag}>, found <${tag}>`);
    }
  } else {
    stack.push(tagName);
  }
}

console.log('Unclosed tags:', stack);
