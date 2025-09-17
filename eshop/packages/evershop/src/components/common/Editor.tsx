import React from 'react';
import { getColumnClasses } from './form/editor/GetColumnClasses.js';
import { getRowClasses } from './form/editor/GetRowClasses.js';
import { Row } from './form/Editor.js';

const Paragraph: React.FC<{ data: { text: string } }> = ({ data }) => {
  return <p dangerouslySetInnerHTML={{ __html: data.text }} />;
};

const Header: React.FC<{ data: { level: number; text: string } }> = ({
  data
}) => {
  const tagName = `h${data.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return React.createElement(tagName, null, data.text);
};

const List: React.FC<{ data: { items: string[] } }> = ({ data }) => {
  return (
    <ul>
      {data.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const Quote: React.FC<{ data: { text: string; caption?: string } }> = ({
  data
}) => {
  return (
    <blockquote>
      <p>&quot;{data.text}&quot;</p>
      {data.caption && <cite>- {data.caption}</cite>}
    </blockquote>
  );
};

const Image: React.FC<{
  data: {
    file: { url: string };
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
    url?: string;
  };
}> = ({ data }) => {
  const { file, caption, withBorder, withBackground, stretched, url } = data;

  const imageStyles = {
    border: withBorder ? '1px solid #ccc' : 'none',
    backgroundColor: withBackground ? '#f9f9f9' : 'transparent',
    width: stretched ? '100%' : 'auto',
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto'
  };

  const imageElement = (
    <img src={file.url} alt={caption || 'Image'} style={imageStyles} />
  );

  return (
    <div>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {caption && (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>{caption}</p>
      )}
    </div>
  );
};

const RawHtml: React.FC<{ data: { html: string } }> = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data.html }} />;
};

const RenderEditorJS: React.FC<{
  blocks: Array<{ type: string; data: any }>;
}> = ({ blocks }) => {
  return (
    <div className="prose prose-base max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <Paragraph key={index} data={block.data} />;
          case 'header':
            return <Header key={index} data={block.data} />;
          case 'list':
            return <List key={index} data={block.data} />;
          case 'image':
            return <Image key={index} data={block.data} />;
          case 'quote':
            return <Quote key={index} data={block.data} />;
          case 'raw':
            return <RawHtml key={index} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

interface EditorProps {
  rows: Row[];
}

export function Editor({ rows }: EditorProps) {
  return (
    <div className="editor__html">
      {rows.map((row, index) => {
        const rowClasses = getRowClasses(row.size);
        return (
          <div
            className={`row__container mt-7 grid md:${rowClasses} grid-cols-1 gap-5`}
            key={index}
          >
            {row.columns.map((column, index) => {
              const columnClasses = getColumnClasses(column.size);
              return (
                <div
                  className={`column__container md:${columnClasses} col-span-1`}
                  key={index}
                >
                  {column.data?.blocks && (
                    <RenderEditorJS blocks={column.data?.blocks} />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
