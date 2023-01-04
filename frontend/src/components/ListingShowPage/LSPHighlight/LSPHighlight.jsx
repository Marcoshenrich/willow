import "./LSPHighlight.css"

const LSPHighlight = ({icon, category, content}) => {

  return (
    <div className="LSP-Highlight">
      <div id="LSP-HLT-Icon-Div">{icon}</div>
      <div id="LSP-HLT-Category">{category}</div>
      <div id="LSP-HLT-Content">{content}</div>
    </div>
  )
}

export default LSPHighlight