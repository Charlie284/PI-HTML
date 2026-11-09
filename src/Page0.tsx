import { Link } from "react-router-dom";
import { asset, type TemplateProps } from "./shared";
export const css =
  "body {margin:0} .page {min-height:100vh;box-sizing:border-box;padding:8px} \n        .page {\n            background-color: #0c0c0c;\n            color: #00ff66;\n            font-family: monospace;\n            margin: 0;\n            padding: 20px;\n            white-space: pre-wrap;\n            word-wrap: break-word;\n        }\n        h1 {\n            color: #00ffaa;\n        }\n    ";
export const title = "Pi";
export default function Page0({ slots = {}, props = {} }: TemplateProps) {
  return (
    <>{slots["pi-content"] ?? <div id={"pi-content"}>{"Loading..."}</div>}</>
  );
}
