"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextStyle from "@tiptap/extension-text-style";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Table as TableIcon,
  Heading1,
  Heading2,
} from "lucide-react";
import {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

export interface TiptapRef {
  reset: () => void;
}

const Tiptap = forwardRef<TiptapRef, TiptapProps>(
  ({ content, onChange }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [tableRows, setTableRows] = useState("3");
    const [tableCols, setTableCols] = useState("3");

    const editor = useEditor({
      extensions: [
        StarterKit,
        TextStyle,
        Heading.configure({
          levels: [1, 2],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell.configure({
          HTMLAttributes: {
            class: "border border-border p-2",
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class:
              "border border-border p-2 bg-primary text-primary-foreground",
          },
        }),
      ],
      content,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "min-h-[150px] prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none [&_p]:leading-normal",
        },
      },
    });

    const reset = useCallback(() => {
      editor?.commands.setContent("");
    }, [editor]);

    useImperativeHandle(
      ref,
      () => ({
        reset,
      }),
      [reset]
    );

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!editor || !isMounted) {
      return null;
    }

    return (
      <div className="border rounded-lg p-4">
        <div className="border-b pb-4 mb-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-secondary" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-secondary" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-secondary" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-secondary" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({
                    rows: parseInt(tableRows),
                    cols: parseInt(tableCols),
                    withHeaderRow: true,
                  })
                  .run()
              }
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={tableRows}
                onChange={(e) => setTableRows(e.target.value)}
                className="w-16 h-8"
                min="1"
                placeholder="Rows"
              />
              <span>×</span>
              <Input
                type="number"
                value={tableCols}
                onChange={(e) => setTableCols(e.target.value)}
                className="w-16 h-8"
                min="1"
                placeholder="Cols"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-secondary" : ""
            }
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-secondary" : ""
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
        <EditorContent editor={editor} />
      </div>
    );
  }
);

Tiptap.displayName = "Tiptap";

export default Tiptap;
