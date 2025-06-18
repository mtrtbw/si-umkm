import DOMPurify from 'dompurify';

interface SafeHTMLProps {
  html: string;
}

export default function SafeHTML({ html }: SafeHTMLProps) {
  const clean = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
