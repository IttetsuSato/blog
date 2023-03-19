import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { CardBox } from "./CardBox";

type BlogBoxProps = {
  text: string;
};

export const BlogBox: React.FC<BlogBoxProps> = ({ text }) => {
  return (
    <CardBox>
      <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </CardBox>
  );
};
