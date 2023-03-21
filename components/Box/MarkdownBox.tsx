import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { CardBox } from "./CardBox";

type MarkdownBoxProps = {
  text: string;
};

export const MarkdownBox: React.FC<MarkdownBoxProps> = ({ text }) => {
  return (
    <CardBox>
      <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </CardBox>
  );
};
