import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const handleEditorChange = ({ text }: { text: string }) => {
    onChange(text);
  };

  return (
    <div>
      <MdEditor
        id={id}
        value={value}
        style={{ height: "400px" }}
        placeholder={placeholder}
        renderHTML={(text) => (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        )}
        className={
          "border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 w-full overflow-y-auto " +
          `${className}`
        }
        onChange={handleEditorChange}
        plugins={[
          "header",
          "font-bold",
          "font-italic",
          "font-underline",
          "font-strikethrough",
          "list-unordered",
          "list-ordered",
          "block-quote",
          "block-wrap",
          "link",
          "clear",
          "mode-toggle",
        ]}
      />
    </div>
  );
};

export default MarkdownEditor;
