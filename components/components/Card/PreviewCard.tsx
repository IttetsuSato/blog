import { Card, CardBody } from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

type PreviewCardProps = {
  text: string;
};

export const PreviewCard: React.FC<PreviewCardProps> = ({ text }) => {
  return (
    <Card w="2xl" minH="2xl">
      <CardBody>
        <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </CardBody>
    </Card>
  );
};
