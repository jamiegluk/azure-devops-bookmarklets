import { htmlEscape } from "escape-goat";
import { readFileSync, writeFileSync } from "fs";

import packageJson from "../package.json";

const textBTotalSize = readFileSync(".build/bookmarklet-total-size.js").toString();
const textBUserGUID = readFileSync(".build/bookmarklet-user-guid.js").toString();

const prefix = "javascript:";

const uriBTotalSize = prefix + encodeURIComponent(textBTotalSize);
const uriBUserGUID = prefix + encodeURIComponent(textBUserGUID);

let pageText = readFileSync("src/template.html").toString();

pageText = pageText.replace(/{{URI_B_TOTAL_SIZE}}/g, uriBTotalSize);
pageText = pageText.replace(/{{URI_B_USER_GUID}}/g, uriBUserGUID);

pageText = pageText.replace(/{{TITLE}}/g, htmlEscape(packageJson.title));
pageText = pageText.replace(/{{AUTHOR}}/g, htmlEscape(packageJson.author));
pageText = pageText.replace(/{{DESCRIPTION}}/g, htmlEscape(packageJson.description));
pageText = pageText.replace(/{{KEYWORDS}}/g, htmlEscape(packageJson.keywords.join(" ")));
pageText = pageText.replace(/{{VERSION}}/g, htmlEscape(packageJson.version));

writeFileSync(".build/index.html", pageText);
